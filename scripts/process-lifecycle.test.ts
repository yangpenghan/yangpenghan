import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { createInterface } from 'node:readline';
import { setTimeout as delay } from 'node:timers/promises';
import { describe, expect, it } from 'vitest';
import { terminateOwnedProcess } from './process-lifecycle.mjs';

function processExists(pid: number): boolean {
	try {
		process.kill(pid, 0);
		return true;
	} catch {
		return false;
	}
}

async function spawnProcessTree(): Promise<{
	process: ReturnType<typeof spawn>;
	parentPid: number;
	descendantPid: number;
}> {
	const descendant = `process.on('SIGTERM', () => process.exit(0)); setInterval(() => {}, 1000);`;
	const parent = `
		const { spawn } = require('node:child_process');
		const child = spawn(process.execPath, ['-e', ${JSON.stringify(descendant)}], { stdio: 'ignore' });
		console.log(JSON.stringify({ parentPid: process.pid, descendantPid: child.pid }));
		process.on('SIGTERM', () => process.exit(0));
		setInterval(() => {}, 1000);
	`;
	const child = spawn(process.execPath, ['-e', parent], {
		detached: process.platform !== 'win32',
		stdio: ['ignore', 'pipe', 'inherit'],
	});
	if (!child.stdout) throw new Error('Expected process stdout');
	const [line] = await once(createInterface({ input: child.stdout }), 'line');
	const pids = JSON.parse(String(line)) as { parentPid: number; descendantPid: number };
	return { process: child, ...pids };
}

describe('owned process lifecycle', () => {
	it.skipIf(process.platform === 'win32')(
		'terminates an active audit process and its descendants',
		async () => {
			const tree = await spawnProcessTree();
			try {
				await terminateOwnedProcess(tree.process);
				await delay(50);
				expect(processExists(tree.parentPid)).toBe(false);
				expect(processExists(tree.descendantPid)).toBe(false);
			} finally {
				try {
					process.kill(-tree.parentPid, 'SIGKILL');
				} catch {
					// The process group is already gone.
				}
			}
		},
	);

	it('returns promptly when the owned child exited before cleanup started', async () => {
		const child = spawn(process.execPath, ['-e', 'process.exit(0)']);
		await once(child, 'exit');
		const result = await Promise.race([
			terminateOwnedProcess(child).then(() => 'stopped'),
			delay(200).then(() => 'timed-out'),
		]);
		expect(result).toBe('stopped');
	});
});
