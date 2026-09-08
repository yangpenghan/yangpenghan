import { setTimeout as delay } from 'node:timers/promises';

const terminationByChild = new WeakMap();

function leaderHasExited(child) {
	return child.exitCode !== null || child.signalCode !== null;
}

export function waitForOwnedProcess(child) {
	if (leaderHasExited(child)) return Promise.resolve();
	return new Promise((resolve, reject) => {
		child.once('exit', resolve);
		child.once('error', reject);
	});
}

function processGroupExists(processGroupId) {
	try {
		process.kill(-processGroupId, 0);
		return true;
	} catch (error) {
		if (error && typeof error === 'object' && 'code' in error) {
			if (error.code === 'ESRCH') return false;
			if (error.code === 'EPERM') return true;
		}
		throw error;
	}
}

function signalOwnedProcess(child, processGroupId, signal) {
	try {
		if (process.platform === 'win32') {
			if (!leaderHasExited(child)) child.kill(signal);
		} else if (processGroupExists(processGroupId)) {
			process.kill(-processGroupId, signal);
		}
	} catch (error) {
		if (error && typeof error === 'object' && 'code' in error && error.code === 'ESRCH') return;
		throw error;
	}
}

async function waitForProcessGroupExit(processGroupId, timeoutMs) {
	const deadline = Date.now() + timeoutMs;
	while (processGroupExists(processGroupId)) {
		if (Date.now() >= deadline) return false;
		await delay(25);
	}
	return true;
}

async function terminate(child, graceMs) {
	const leaderExit = waitForOwnedProcess(child);
	if (process.platform === 'win32' || !child.pid) {
		if (leaderHasExited(child)) return leaderExit;
		child.kill('SIGTERM');
		const stopped = await Promise.race([leaderExit.then(() => true), delay(graceMs).then(() => false)]);
		if (stopped) return;
		child.kill('SIGKILL');
		const killed = await Promise.race([leaderExit.then(() => true), delay(graceMs).then(() => false)]);
		if (!killed) throw new Error(`Owned process ${child.pid ?? 'unknown'} did not exit after SIGKILL`);
		return;
	}

	const processGroupId = child.pid;
	if (!processGroupExists(processGroupId)) return leaderExit;

	signalOwnedProcess(child, processGroupId, 'SIGTERM');
	if (!(await waitForProcessGroupExit(processGroupId, graceMs))) {
		signalOwnedProcess(child, processGroupId, 'SIGKILL');
		if (!(await waitForProcessGroupExit(processGroupId, graceMs))) {
			throw new Error(`Owned process group ${processGroupId} did not exit after SIGKILL`);
		}
	}
	await leaderExit;
}

export function terminateOwnedProcess(child, { graceMs = 5000 } = {}) {
	if (!child) return Promise.resolve();
	const existing = terminationByChild.get(child);
	if (existing) return existing;
	const termination = terminate(child, graceMs);
	terminationByChild.set(child, termination);
	return termination;
}
