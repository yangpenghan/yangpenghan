import { initializeEvidence } from './charts';
import { initializeMeasurements } from './measurement';
import { previousStage, readStage, type Stage, stages } from './model';
import { initializePresentation } from './presentation';
import { initializeSound } from './sound';

document.querySelectorAll<HTMLElement>('[data-sound]').forEach(initializeSound);
const story = document.querySelector<HTMLElement>('[data-story]');
if (story) initializeStory(story);

function initializeStory(root: HTMLElement) {
	initializeMeasurements(root);
	const zh = root.dataset.locale === 'zh';
	root.querySelectorAll<HTMLElement>('[data-evidence]').forEach(initializeEvidence);
	root.querySelectorAll<HTMLButtonElement>('[data-help]').forEach((button) => {
		button.addEventListener('click', () => {
			const panel = button.parentElement?.querySelector('.term-links');
			const open = panel?.classList.toggle('is-open') ?? false;
			button.setAttribute('aria-expanded', String(open));
		});
	});
	const scenes = [...root.querySelectorAll<HTMLElement>('[data-scene]')];
	const languageLink = document.querySelector<HTMLAnchorElement>('[data-language]');
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
	let current: Stage = readStage(location.hash);
	let playback: ReturnType<typeof setTimeout> | undefined;

	const stopPlayback = () => {
		clearTimeout(playback);
		root.classList.remove('playing');
		root.querySelector('[data-play]')?.setAttribute('aria-pressed', 'false');
	};
	const render = (focus: boolean) => {
		stopPlayback();
		current = readStage(location.hash);
		for (const scene of scenes) scene.hidden = scene.dataset.scene !== current;
		const back = root.querySelector<HTMLAnchorElement>('[data-back]');
		if (back) {
			back.href = `#${previousStage(current)}`;
			back.hidden = current === 'intro';
		}
		const label = root.querySelector('[data-position-label]');
		if (label)
			label.textContent = `${String(stages.indexOf(current) + 1).padStart(2, '0')} / ${String(stages.length).padStart(2, '0')}`;
		if (languageLink) languageLink.hash = current;
		if (focus) {
			document.getElementById(`${current}-title`)?.focus({ preventScroll: true });
			window.scrollTo({ top: 0, behavior: 'instant' });
		}
	};
	const go = (stage: Stage) => {
		if (stage === current) return;
		history.pushState(null, '', `#${stage}`);
		render(true);
	};
	root.addEventListener('click', (event) => {
		if (!(event.target instanceof Element)) return;
		const anchor = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
		if (!anchor || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
		const hash = anchor.getAttribute('href') ?? '';
		if (!stages.some((stage) => `#${stage}` === hash)) return;
		event.preventDefault();
		go(readStage(hash));
	});
	const syncHistory = () => {
		if (!location.hash || stages.some((stage) => `#${stage}` === location.hash)) render(true);
	};
	window.addEventListener('popstate', syncHistory);
	window.addEventListener('hashchange', syncHistory);
	document
		.querySelector<HTMLAnchorElement>('.skip-link[href="#story-main"]')
		?.addEventListener('click', (event) => {
			event.preventDefault();
			root.focus({ preventScroll: true });
			root.scrollIntoView({ behavior: 'instant' });
		});
	reducedMotion.addEventListener('change', stopPlayback);
	document.addEventListener('visibilitychange', () => {
		if (document.hidden) stopPlayback();
	});
	root.addEventListener(
		'toggle',
		(event) => {
			if (event.target instanceof HTMLDetailsElement && event.target.open) stopPlayback();
		},
		true,
	);
	const expand = root.querySelector<HTMLButtonElement>('[data-expand]');
	expand?.addEventListener('click', () => {
		const expanded = root.classList.toggle('time-expanded');
		expand.setAttribute('aria-pressed', String(expanded));
	});
	const play = root.querySelector<HTMLButtonElement>('[data-play]');
	play?.addEventListener('click', () => {
		if (root.classList.contains('playing')) {
			stopPlayback();
			return;
		}
		root.classList.add('playing');
		play.setAttribute('aria-pressed', 'true');
		playback = setTimeout(stopPlayback, 2800);
	});
	const presentation = initializePresentation(root);
	const taskPositions = setupLetterTask(root, zh);
	setupInterests(root);
	// Local tab state survives method-page visits. Storage is optional.
	const key = `will-explore-${zh ? 'zh' : 'en'}-v3`;
	let activeTerm: string | undefined;
	try {
		const saved: unknown = JSON.parse(sessionStorage.getItem(key) ?? 'null');
		if (
			saved &&
			typeof saved === 'object' &&
			'choice' in saved &&
			(saved.choice === 'self-report' ||
				saved.choice === 'sleep-duration' ||
				saved.choice === 'whole-process')
		) {
			root.querySelector<HTMLButtonElement>(`[data-choice="${saved.choice}"]`)?.click();
		}
		if (saved && typeof saved === 'object') {
			if ('fold' in saved && typeof saved.fold === 'number' && Number.isFinite(saved.fold))
				presentation.restoreFold(Math.max(0, Math.min(100, saved.fold)));
			if ('reportOpen' in saved && saved.reportOpen === true) presentation.restoreReport();
		}

		if (saved && typeof saved === 'object' && 'positions' in saved && Array.isArray(saved.positions)) {
			for (const position of saved.positions) {
				if (typeof position === 'number' && Number.isInteger(position) && position >= 0 && position < 24) {
					root.querySelector<HTMLButtonElement>(`[data-position="${position}"]`)?.click();
				}
			}
		}
		if (saved && typeof saved === 'object' && 'interest' in saved && typeof saved.interest === 'string') {
			const button = [...root.querySelectorAll<HTMLButtonElement>('[data-interest]')].find(
				(item) => item.dataset.interest === saved.interest,
			);
			button?.click();
		}
		if (saved && typeof saved === 'object' && 'scene' in saved && saved.scene === current) {
			presentation.revealAll(current);
			if ('term' in saved && typeof saved.term === 'string') {
				const anchor = [...root.querySelectorAll<HTMLAnchorElement>(`#${current} [data-method-link]`)].find(
					(item) => item.pathname === saved.term,
				);
				const details = anchor?.closest('details');
				if (details) {
					details.open = true;
					details.closest('.term-links')?.classList.add('is-open');
					details.closest('section')?.querySelector('[data-help]')?.setAttribute('aria-expanded', 'true');
					activeTerm = anchor?.pathname;
					presentation.revealAll(current);
				}
			}
			if ('scroll' in saved && typeof saved.scroll === 'number' && Number.isFinite(saved.scroll)) {
				const scroll = Math.max(0, saved.scroll);
				requestAnimationFrame(() => window.scrollTo({ top: scroll, behavior: 'instant' }));
			}
		}
		if (saved && typeof saved === 'object' && 'expanded' in saved && saved.expanded === true) {
			root.classList.add('time-expanded');
			expand?.setAttribute('aria-pressed', 'true');
		}
	} catch {
		/* The story works without browser storage. */
	}
	const save = (term?: string) => {
		if (term) activeTerm = term;
		try {
			sessionStorage.setItem(
				key,
				JSON.stringify({
					fold: Number(root.querySelector<HTMLInputElement>('[data-fold]')?.value ?? 0),
					reportOpen: root.querySelector('[data-open-evidence]')?.getAttribute('aria-expanded') === 'true',
					choice: root.querySelector<HTMLElement>('[data-choice][aria-pressed="true"]')?.dataset.choice,
					expanded: root.classList.contains('time-expanded'),
					positions: taskPositions.map((position) => position - 1),
					interest: root.querySelector<HTMLElement>('[data-interest][aria-pressed="true"]')?.dataset.interest,
					scene: current,
					scroll: window.scrollY,
					term:
						activeTerm ??
						root.querySelector<HTMLAnchorElement>(`#${current} details[open] [data-method-link]`)?.pathname,
				}),
			);
		} catch {
			/* The story remains usable without storage. */
		}
	};
	root.querySelectorAll<HTMLAnchorElement>('[data-method-link]').forEach((anchor) => {
		anchor.addEventListener('click', () => save(anchor.pathname));
	});
	window.addEventListener('pagehide', () => save());
	root.classList.add('story-ready');
	render(false);
}

function setupLetterTask(root: HTMLElement, zh: boolean) {
	const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-letter]')];
	const result = root.querySelector('[data-result]');
	const count = root.querySelector('[data-count]');
	const positions: number[] = [];
	const update = () => {
		const found = buttons.filter(
			(button) => button.dataset.letter === 'A' && button.getAttribute('aria-pressed') === 'true',
		).length;
		if (count) count.textContent = `${found} / 5`;
		if (result)
			result.textContent = positions.length
				? `${zh ? '点击位置' : 'Click positions'} ${positions.join(' → ')}${found === 5 ? (zh ? '。已找到全部 5 个 A。' : '. All 5 As found.') : ''}`
				: zh
					? '点选字母，留下你的操作记录。'
					: 'Select a letter to leave a record of your action.';
	};
	buttons.forEach((button) => {
		button.addEventListener('click', () => {
			if (button.getAttribute('aria-pressed') === 'true') return;
			button.setAttribute('aria-pressed', 'true');
			positions.push(Number(button.dataset.position) + 1);
			update();
		});
	});
	root.querySelector('[data-reset]')?.addEventListener('click', () => {
		positions.length = 0;
		for (const button of buttons) button.setAttribute('aria-pressed', 'false');
		update();
	});
	return positions;
}
function setupInterests(root: HTMLElement) {
	const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-interest]')];
	const panels = [...root.querySelectorAll<HTMLElement>('[data-recommendations]')];
	const select = (id: string) => {
		for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.interest === id));
		for (const panel of panels) panel.hidden = panel.dataset.recommendations !== id;
	};
	for (const button of buttons)
		button.addEventListener('click', () => select(button.dataset.interest ?? 'research'));
	select('research');
}
