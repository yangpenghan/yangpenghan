/** Click-driven principle illustrations. No camera or physiological data is collected. */
export function initializeMeasurements(root: HTMLElement) {
	for (const panel of root.querySelectorAll<HTMLElement>('[data-measurement]')) {
		const buttons = panel.querySelectorAll<HTMLButtonElement>('[data-measure-step]');
		const render = (step: string) => {
			panel.dataset.step = step;
			for (const button of buttons)
				button.setAttribute('aria-pressed', String(button.dataset.measureStep === step));
			for (const copy of panel.querySelectorAll<HTMLElement>('[data-measure-copy]'))
				copy.hidden = copy.dataset.measureCopy !== step;
		};
		for (const button of buttons)
			button.addEventListener('click', () => render(button.dataset.measureStep ?? '1'));
		render('1');
	}
}
