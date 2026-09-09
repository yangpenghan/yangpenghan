/** Locally synthesized ambient score; no media downloads or external service. */
export function initializeSound(root: HTMLElement) {
	const toggle = root.querySelector<HTMLButtonElement>('[data-sound-toggle]');
	const volume = root.querySelector<HTMLInputElement>('[data-sound-volume]');
	const status = root.querySelector<HTMLElement>('[data-sound-status]');
	if (!toggle || !volume) return;
	root.classList.add('sound-ready');
	const zh = root.dataset.locale === 'zh';
	let context: AudioContext | undefined;
	let master: GainNode | undefined;
	let timer: ReturnType<typeof setInterval> | undefined;
	let enabled = false;
	let requested = false;
	let automatic = true;
	let generation = 0;
	let phrase = 0;
	const voices = new Set<OscillatorNode>();
	const chords = [
		[130.81, 164.81, 196, 293.66],
		[110, 164.81, 220, 261.63],
		[87.31, 130.81, 174.61, 261.63],
		[98, 146.83, 196, 293.66],
	];
	const update = () => {
		toggle.setAttribute('aria-pressed', String(enabled));
		toggle.textContent = enabled
			? zh
				? '背景音乐 · 播放中'
				: 'Music · Playing'
			: zh
				? '播放背景音乐'
				: 'Play music';
	};
	const play = () => {
		if (!context || !master) return;
		const chord = chords[phrase++ % chords.length];
		const start = context.currentTime;
		chord.forEach((frequency, i) => {
			if (!context || !master) return;
			const oscillator = context.createOscillator();
			const envelope = context.createGain();
			oscillator.type = 'sine';
			oscillator.frequency.value = frequency;
			oscillator.detune.value = i % 2 ? 3 : -3;
			envelope.gain.setValueAtTime(0, start);
			envelope.gain.linearRampToValueAtTime(0.09, start + 0.4 + i * 0.08);
			envelope.gain.linearRampToValueAtTime(0, start + 10);
			oscillator.connect(envelope).connect(master);
			voices.add(oscillator);
			oscillator.start(start);
			oscillator.stop(start + 10.1);
			oscillator.onended = () => {
				voices.delete(oscillator);
				oscillator.disconnect();
				envelope.disconnect();
			};
		});
		// A higher, gently plucked melody remains audible on small phone speakers.
		[0, 2, 1, 3, 2, 1, 0, 2].forEach((degree, i) => {
			if (!context || !master) return;
			const oscillator = context.createOscillator();
			const envelope = context.createGain();
			const at = start + i;
			oscillator.type = 'sine';
			oscillator.frequency.value = chord[degree] * 4;
			envelope.gain.setValueAtTime(0, at);
			envelope.gain.linearRampToValueAtTime(0.1, at + 0.025);
			envelope.gain.exponentialRampToValueAtTime(0.001, at + 1.8);
			envelope.gain.linearRampToValueAtTime(0, at + 2);
			oscillator.connect(envelope).connect(master);
			voices.add(oscillator);
			oscillator.start(at);
			oscillator.stop(at + 2.1);
			oscillator.onended = () => {
				voices.delete(oscillator);
				oscillator.disconnect();
				envelope.disconnect();
			};
		});
	};
	const stopTimer = () => {
		clearInterval(timer);
		timer = undefined;
		for (const voice of voices) voice.stop();
		voices.clear();
	};
	const startTimer = () => {
		if (!timer) {
			play();
			timer = setInterval(play, 8000);
		}
	};
	const removeActivation = () => {
		document.removeEventListener('click', activate);
	};
	async function setPlayback(wanted: boolean, explicit = false) {
		requested = wanted;
		const operation = ++generation;
		try {
			if (!context && wanted) {
				context = new AudioContext();
				master = context.createGain();
				master.gain.value = Number(volume?.value ?? 45) / 100;
				master.connect(context.destination);
			}
			if (!context) return;
			if (!wanted) {
				enabled = false;
				stopTimer();
				update();
				await context.suspend();
			} else {
				// An autoplay resume may remain pending. A user gesture must be able
				// to issue a fresh resume without being blocked by that promise.
				await context.resume();
				if (operation !== generation) return;
				enabled = context.state === 'running';
				if (enabled && !document.hidden) {
					startTimer();
					removeActivation();
				} else if (document.hidden) await context.suspend();
			}
			if (operation === generation && status) status.textContent = '';
		} catch {
			if (operation !== generation) return;
			enabled = false;
			requested = false;
			stopTimer();
			if (explicit && status)
				status.textContent = zh ? '当前浏览器无法播放音乐。' : 'Audio is unavailable in this browser.';
		} finally {
			if (operation === generation) update();
		}
	}
	function activate(event: Event) {
		if (!automatic || enabled || document.hidden) return;
		if (event instanceof MouseEvent && (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey))
			return;
		if (!(event.target instanceof Element) || !event.target.closest('[data-start-story]')) return;
		void setPlayback(true);
	}
	document.addEventListener('click', activate);

	toggle.addEventListener('click', () => {
		automatic = false;
		removeActivation();
		// A blocked autoplay attempt is still presented as off: clicking plays it.
		void setPlayback(enabled ? false : !requested || context?.state !== 'running', true);
	});
	volume.addEventListener('input', () => {
		if (context && master) master.gain.setTargetAtTime(Number(volume.value) / 100, context.currentTime, 0.12);
	});
	document.addEventListener('visibilitychange', () => {
		if (!context || !enabled) return;
		if (document.hidden) {
			stopTimer();
			void context.suspend().catch(() => {});
		} else {
			void context
				.resume()
				.then(() => {
					if (enabled && !document.hidden) startTimer();
					else void context?.suspend().catch(() => {});
				})
				.catch(() => {
					enabled = false;
					update();
				});
		}
	});
	window.addEventListener('pageshow', () => {
		if (automatic && !enabled) document.addEventListener('click', activate);
	});
	window.addEventListener('pagehide', () => {
		generation++;
		requested = false;
		removeActivation();
		stopTimer();
		enabled = false;
		update();
		void context?.suspend().catch(() => {});
	});
	update();
}
