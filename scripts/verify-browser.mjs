import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const siteUrl = new URL(process.env.SITE_URL ?? 'http://127.0.0.1:4321/yangpenghan/');
const auditScripts = ['scripts/browser-audit.mjs', 'scripts/optimization-audit.mjs'];
let preview;
let stopping = false;

async function siteIsReady() {
	try {
		const response = await fetch(siteUrl, { signal: AbortSignal.timeout(1500) });
		return response.ok;
	} catch {
		return false;
	}
}

function stopPreview(signal = 'SIGTERM') {
	if (!preview || preview.exitCode !== null || preview.signalCode !== null) return;
	if (process.platform === 'win32') preview.kill(signal);
	else process.kill(-preview.pid, signal);
}

async function cleanupPreview() {
	if (!preview || stopping || preview.exitCode !== null || preview.signalCode !== null) return;
	stopping = true;
	stopPreview();
	const stopped = await Promise.race([
		new Promise((resolve) => preview?.once('exit', resolve)),
		delay(5000).then(() => false),
	]);
	if (stopped === false) {
		stopPreview('SIGKILL');
		await new Promise((resolve) => preview?.once('exit', resolve));
	}
}

async function waitForPreview() {
	const deadline = Date.now() + 30_000;
	while (Date.now() < deadline) {
		if (await siteIsReady()) return;
		if (preview && (preview.exitCode !== null || preview.signalCode !== null)) {
			throw new Error('The static preview server exited before becoming ready.');
		}
		await delay(250);
	}
	throw new Error(`Timed out waiting for the static preview at ${siteUrl.href}`);
}

async function runAudit(script) {
	const child = spawn(process.execPath, [script], {
		cwd: process.cwd(),
		env: { ...process.env, SITE_URL: siteUrl.href },
		stdio: 'inherit',
	});
	const code = await new Promise((resolve, reject) => {
		child.once('error', reject);
		child.once('exit', (exitCode, signal) => {
			if (signal) reject(new Error(`${script} terminated by ${signal}`));
			else resolve(exitCode ?? 1);
		});
	});
	if (code !== 0) throw new Error(`${script} failed with exit code ${code}`);
}

for (const [signal, code] of [
	['SIGINT', 130],
	['SIGTERM', 143],
]) {
	process.once(signal, async () => {
		await cleanupPreview();
		process.exit(code);
	});
}

try {
	if (!(await siteIsReady())) {
		if (!['127.0.0.1', 'localhost', '::1'].includes(siteUrl.hostname)) {
			throw new Error(`SITE_URL is unavailable and cannot be started locally: ${siteUrl.href}`);
		}
		preview = spawn(
			process.execPath,
			[
				'node_modules/astro/bin/astro.mjs',
				'preview',
				'--host',
				siteUrl.hostname,
				'--port',
				siteUrl.port || '4321',
			],
			{
				cwd: process.cwd(),
				detached: process.platform !== 'win32',
				env: process.env,
				stdio: ['ignore', 'inherit', 'inherit'],
			},
		);
		await waitForPreview();
	}
	for (const script of auditScripts) await runAudit(script);
} finally {
	await cleanupPreview();
}
