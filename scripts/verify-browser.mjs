import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { setTimeout as delay } from 'node:timers/promises';
import { terminateOwnedProcess, waitForOwnedProcess } from './process-lifecycle.mjs';

const explicitSiteUrl = process.env.SITE_URL;
const siteUrl = explicitSiteUrl ? new URL(explicitSiteUrl) : await availableLocalSiteUrl();
const auditScripts = ['scripts/browser-audit.mjs', 'scripts/optimization-audit.mjs'];
let preview;
let activeAudit;
let cleanupPromise;
let receivedSignal;

async function availableLocalSiteUrl() {
	const port = await new Promise((resolve, reject) => {
		const server = createServer();
		server.unref();
		server.once('error', reject);
		server.listen(0, '127.0.0.1', () => {
			const address = server.address();
			if (!address || typeof address === 'string') {
				server.close();
				reject(new Error('Could not allocate a local preview port'));
				return;
			}
			server.close((error) => {
				if (error) reject(error);
				else resolve(address.port);
			});
		});
	});
	return new URL(`http://127.0.0.1:${port}/yangpenghan/`);
}

async function siteIsReady() {
	try {
		const response = await fetch(siteUrl, { signal: AbortSignal.timeout(1500) });
		return response.ok;
	} catch {
		return false;
	}
}

function cleanupOwnedProcesses() {
	cleanupPromise ??= (async () => {
		await terminateOwnedProcess(activeAudit);
		await terminateOwnedProcess(preview);
	})();
	return cleanupPromise;
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
		detached: process.platform !== 'win32',
		env: { ...process.env, SITE_URL: siteUrl.href },
		stdio: 'inherit',
	});
	activeAudit = child;
	try {
		await waitForOwnedProcess(child);
		if (child.signalCode) throw new Error(`${script} terminated by ${child.signalCode}`);
		if (child.exitCode !== 0) throw new Error(`${script} failed with exit code ${child.exitCode ?? 1}`);
	} finally {
		await terminateOwnedProcess(child);
		if (activeAudit === child && (child.exitCode !== null || child.signalCode !== null))
			activeAudit = undefined;
	}
}

for (const [signal, code] of [
	['SIGINT', 130],
	['SIGTERM', 143],
]) {
	process.once(signal, () => {
		receivedSignal = code;
		void cleanupOwnedProcesses().then(
			() => process.exit(code),
			(error) => {
				console.error(error);
				process.exit(1);
			},
		);
	});
}

let failure;
try {
	const reuseExplicitSite = explicitSiteUrl && (await siteIsReady());
	if (!reuseExplicitSite) {
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
} catch (error) {
	failure = error;
} finally {
	await cleanupOwnedProcesses();
}

if (receivedSignal !== undefined) process.exit(receivedSignal);
if (failure) throw failure;
