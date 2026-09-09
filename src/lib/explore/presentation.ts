/** Each scene has its own narrative action; no generic slide disclosure. */
export function initializePresentation(root: HTMLElement) {
	const zh = root.dataset.locale === 'zh';
	const question = root.querySelector<HTMLElement>('#question');
	const unfold = root.querySelector<HTMLElement>('[data-question-unfold]');
	const range = root.querySelector<HTMLInputElement>('[data-fold]');
	const frames = [...root.querySelectorAll<HTMLAnchorElement>('.fold-frame')];
	const enter = root.querySelector<HTMLElement>('[data-fold-enter]');
	const report = root.querySelector<HTMLElement>('.cinema-report');
	const opener = root.querySelector<HTMLButtonElement>('[data-open-evidence]');
	function fold(value: number) {
		root.style.setProperty('--fold', String(value / 100));
		frames.forEach((frame, i) => {
			frame.inert = value < (i + 1) * 30;
			const fact = root.querySelector<HTMLElement>(`[data-fold-fact="${i}"]`);
			if (fact) fact.hidden = frame.inert;
		});
		if (enter) {
			enter.hidden = value < 90;
			enter.inert = value < 90;
		}
		if (range) range.setAttribute('aria-valuetext', zh ? `展开 ${value}%` : `${value}% unfolded`);
	}
	function openObservation(id: string, focus = true) {
		const scene = root.querySelector<HTMLElement>(`#${id}`);
		const panel = scene?.querySelector<HTMLElement>('[data-observation]');
		if (!panel) return;
		panel.hidden = false;
		panel.inert = false;
		scene?.classList.add('observation-open');
		const trigger = scene?.querySelector('[data-observe]');
		trigger?.setAttribute('aria-expanded', 'true');
		if (focus) panel.querySelector<HTMLElement>('h3')?.focus({ preventScroll: true });
	}
	root.querySelectorAll<HTMLElement>('[data-observation]').forEach((panel) => {
		panel.hidden = true;
		panel.inert = true;
		panel.querySelector('h3')?.setAttribute('tabindex', '-1');
	});
	if (unfold) {
		unfold.hidden = true;
		unfold.inert = true;
	}
	if (report) {
		report.hidden = true;
		report.inert = true;
	}
	root.querySelectorAll<HTMLButtonElement>('[data-choice]').forEach((button) => {
		button.addEventListener('click', () => {
			root.querySelectorAll('[data-choice]').forEach((item) => {
				item.setAttribute('aria-pressed', String(item === button));
			});
			question?.classList.add('verdict-chosen');
			if (unfold) {
				unfold.hidden = false;
				unfold.inert = false;
			}
			const feedback = root.querySelector('[data-feedback]');
			const responses = {
				'self-report': [
					'感受告诉我们，人有没有觉得改善。但改善发生在睡前、入睡过程，还是醒后？',
					'Self-reports tell us whether people felt better. But was the change before sleep, during sleep onset or after waking?',
				],
				'sleep-duration': [
					'时长告诉我们，睡眠持续了多久。同样的时长，入睡过程和醒后状态也可能不同。',
					'Duration tells us how long sleep lasted. The same duration can still involve different sleep-onset processes and waking states.',
				],
				'whole-process': [
					'你把注意力放在了变化发生的过程。接下来需要把过程拆成能观察的问题。',
					'You are looking at the process of change. Next, we need to turn that process into observable questions.',
				],
			};
			const choice = button.dataset.choice as keyof typeof responses;
			if (feedback) feedback.textContent = responses[choice]?.[zh ? 0 : 1] ?? '';
			// Keep the visitor at the response; the filmstrip follows below.
		});
	});
	range?.addEventListener('input', () => fold(Number(range.value)));
	root.querySelector('[data-fold-all]')?.addEventListener('click', () => {
		if (range) range.value = '100';
		fold(100);
	});
	root.querySelectorAll<HTMLButtonElement>('[data-observe]').forEach((button) => {
		button.addEventListener('click', () => openObservation(button.dataset.observe ?? 'before'));
	});
	opener?.addEventListener('click', (event) => {
		if (!report) return;
		report.hidden = false;
		report.inert = false;
		root.querySelector('#delivery')?.classList.add('report-open');
		opener.setAttribute('aria-expanded', 'true');
		report.querySelector('[data-evidence]')?.dispatchEvent(new Event('evidence-reveal'));
		if (!event.isTrusted) return;
		report.querySelector<HTMLButtonElement>('[data-evidence-phase]')?.focus({ preventScroll: true });
		report.scrollIntoView({
			behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
			block: 'start',
		});
	});
	fold(0);
	root.classList.add('cinema-ready');
	return {
		restoreFold(value: number) {
			if (range) range.value = String(value);
			fold(value);
		},
		restoreReport() {
			opener?.click();
		},
		revealAll(sceneId: string) {
			openObservation(sceneId, false);
		},
	};
}
