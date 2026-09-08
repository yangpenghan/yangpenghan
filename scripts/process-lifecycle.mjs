import { setTimeout as delay } from 'node:timers/promises';

function hasExited(child) {
	return child.exitCode !== null || child.signalCode !== null;
}

export function waitForOwnedProcess(child) {
	if (hasExited(child)) return Promise.resolve();
	return new Promise((resolve, reject) => {
		child.once('exit', resolve);
		child.once('error', reject);
	});
}

function signalOwnedProcessGroup(child, signal) {
	if (hasExited(child) || !child.pid) return;
	try {
		if (process.platform === 'win32') child.kill(signal);
		else process.kill(-child.pid, signal);
	} catch (error) {
		if (error && typeof error === 'object' && 'code' in error && error.code === 'ESRCH') return;
		throw error;
	}
}

export async function terminateOwnedProcess(child, { graceMs = 5000 } = {}) {
	if (!child) return;
	const exitPromise = waitForOwnedProcess(child);
	if (hasExited(child)) return exitPromise;

	signalOwnedProcessGroup(child, 'SIGTERM');
	const stopped = await Promise.race([exitPromise.then(() => true), delay(graceMs).then(() => false)]);
	if (stopped) return;

	signalOwnedProcessGroup(child, 'SIGKILL');
	const killed = await Promise.race([exitPromise.then(() => true), delay(graceMs).then(() => false)]);
	if (!killed) throw new Error(`Owned process ${child.pid ?? 'unknown'} did not exit after SIGKILL`);
}
