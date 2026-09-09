import { type Language, translate } from './model';
import { type ReportDataset, reportDatasets } from './report-data';

const ns = 'http://www.w3.org/2000/svg';
function node(name: string, attributes: Record<string, string | number>, text?: string): SVGElement {
	const element = document.createElementNS(ns, name);
	for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, String(value));
	if (text !== undefined) element.textContent = text;
	return element;
}
export function chartPoints(
	values: readonly number[],
	width: number,
	height: number,
	maximum: number,
): [number, number][] {
	return values.map((value, i) => [
		52 + (i / Math.max(1, values.length - 1)) * (width - 78),
		height - 30 - (value / maximum) * (height - 60),
	]);
}
function categoryLabel(value: string, locale: Language): string {
	const labels: Record<string, readonly [string, string]> = {
		Total: ['全部', 'Total'],
		Target: ['目标', 'Target'],
		'Non-target': ['非目标', 'Non-target'],
		'Target clicks': ['目标点击', 'Target clicks'],
	};
	return labels[value] ? translate(labels[value], locale) : value.replaceAll('-', '–');
}
export function initializeEvidence(root: HTMLElement) {
	const locale: Language = root.dataset.locale === 'en' ? 'en' : 'zh';
	const svg = root.querySelector<SVGSVGElement>('[data-report-svg]');
	const selector = root.querySelector<HTMLElement>('[data-point-selector]');
	if (!svg || !selector) return;
	let dataset: ReportDataset = reportDatasets[0];
	let selected = 0;
	let readoutKey = '';
	let drawnWidth = 0;
	const number = (value: number) => value.toFixed(dataset.precision);
	const describe = () => {
		const readout = root.querySelector('[data-chart-readout]');
		const key = `${dataset.id}:${selected}`;
		if (readout && readoutKey !== key) {
			readoutKey = key;
			const label = `${categoryLabel(dataset.categories[selected], locale)}${dataset.kind === 'line' ? (locale === 'zh' ? ' 分钟' : ' min') : ''}`;
			readout.replaceChildren();
			for (const [text, className] of [
				[label, 'readout-period'],
				[`${locale === 'zh' ? '样品' : 'Sample'} ${number(dataset.series[0][selected])}`, 'readout-sample'],
				[`${locale === 'zh' ? '对照' : 'Control'} ${number(dataset.series[1][selected])}`, 'readout-control'],
			]) {
				const span = document.createElement('span');
				span.textContent = text;
				span.className = className;
				readout.append(span);
			}
		}
		selector.querySelectorAll<HTMLButtonElement>('button').forEach((button, i) => {
			button.setAttribute('aria-pressed', String(i === selected));
		});
	};
	const draw = () => {
		const width = Math.max(270, Math.round(root.getBoundingClientRect().width));
		drawnWidth = width;
		const height = width < 500 ? 230 : 285;
		svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
		svg.replaceChildren();
		svg.append(node('title', {}, translate(dataset.title, locale)));
		const bottom = height - 30,
			top = 30;
		for (let i = 0; i <= 4; i++) {
			const y = bottom - (i / 4) * (bottom - top);
			svg.append(node('line', { x1: 52, x2: width - 26, y1: y, y2: y, class: 'plot-grid' }));
			svg.append(
				node(
					'text',
					{ x: 40, y: y + 4, 'text-anchor': 'end', class: 'plot-tick' },
					String(Number(((i * dataset.maximum) / 4).toFixed(2))),
				),
			);
		}
		if (dataset.kind === 'line') {
			for (const [seriesIndex, values] of dataset.series.entries()) {
				const points = chartPoints(values, width, height, dataset.maximum);
				svg.append(
					node('polyline', {
						points: points.map((point) => point.join(',')).join(' '),
						class: `plot-line series-${seriesIndex}`,
					}),
				);
				for (const [i, [x, y]] of points.entries()) {
					svg.append(
						node(
							seriesIndex === 0 ? 'circle' : 'rect',
							seriesIndex === 0
								? { cx: x, cy: y, r: i === selected ? 5 : 3, class: `plot-point series-${seriesIndex}` }
								: { x: x - 3, y: y - 3, width: 6, height: 6, class: `plot-point series-${seriesIndex}` },
						),
					);
					if (seriesIndex === 0)
						svg.append(
							node(
								'text',
								{ x, y: height - 7, 'text-anchor': 'middle', class: 'plot-tick' },
								String((i + 1) * 5),
							),
						);
				}
			}
			const x = chartPoints(dataset.series[0], width, height, dataset.maximum)[selected][0];
			svg.append(node('line', { x1: x, x2: x, y1: top, y2: bottom, class: 'plot-cursor' }));
		} else {
			const slot = (width - 78) / dataset.categories.length;
			const barWidth = Math.min(58, slot * 0.27);
			dataset.categories.forEach((label, i) => {
				const center = 52 + slot * (i + 0.5);
				dataset.series.forEach((values, seriesIndex) => {
					const h = (values[i] / dataset.maximum) * (bottom - top);
					const x = center + (seriesIndex === 0 ? -barWidth - 3 : 3);
					svg.append(
						node('rect', {
							x,
							y: bottom - h,
							width: barWidth,
							height: h,
							class: `plot-bar series-${seriesIndex}`,
						}),
					);
					svg.append(
						node(
							'text',
							{ x: x + barWidth / 2, y: bottom - h - 9, 'text-anchor': 'middle', class: 'bar-value' },
							number(values[i]),
						),
					);
				});
				svg.append(
					node(
						'text',
						{ x: center, y: height - 7, 'text-anchor': 'middle', class: 'plot-tick' },
						categoryLabel(label, locale),
					),
				);
			});
		}
		describe();
	};
	const animate = () => {
		if (!root.getBoundingClientRect().width || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
			return;
		for (const line of svg.querySelectorAll<SVGPolylineElement>('.plot-line')) {
			const length = line.getTotalLength();
			// Clip the completed line so dashed control styling stays intact.
			line.animate([{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)' }], {
				duration: Math.min(1400, length * 2),
				easing: 'ease-in-out',
			});
		}
		for (const bar of svg.querySelectorAll<SVGRectElement>('.plot-bar')) {
			bar.style.transformBox = 'fill-box';
			bar.style.transformOrigin = 'center bottom';
			bar.animate([{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], {
				duration: 1100,
				easing: 'cubic-bezier(.22,1,.36,1)',
			});
		}
	};
	const render = () => {
		root.querySelectorAll<HTMLElement>('[data-reading]').forEach((panel) => {
			panel.hidden = panel.dataset.reading !== dataset.id;
		});
		root.querySelectorAll<HTMLButtonElement>('[data-evidence-phase]').forEach((button) => {
			button.setAttribute('aria-pressed', String(button.dataset.evidencePhase === dataset.phase));
		});
		root.querySelectorAll<HTMLButtonElement>('[data-dataset]').forEach((button) => {
			button.hidden = button.dataset.phase !== dataset.phase;
			button.setAttribute('aria-pressed', String(button.dataset.dataset === dataset.id));
		});
		root.querySelectorAll<HTMLElement>('[data-source-table]').forEach((table) => {
			table.hidden = table.dataset.sourceTable !== dataset.id;
		});
		const title = root.querySelector('[data-chart-title]');
		if (title) title.textContent = translate(dataset.title, locale);
		const unit = root.querySelector('[data-chart-unit]');
		if (unit)
			unit.textContent = `${translate(dataset.unit, locale)}${dataset.kind === 'line' ? (locale === 'zh' ? ' · 横轴：区间终点（分钟）' : ' · x: interval end (min)') : ''}`;
		const context = root.querySelector('[data-chart-context]');
		const contexts = {
			before: [
				'饮用后观看纪录片的 30 分钟；每 5 分钟一个区间。',
				'30 minutes watching a documentary after intake; five-minute intervals.',
			],
			during: [
				'关灯后的 30 分钟；每 5 分钟一个区间。',
				'30 minutes after lights off; five-minute intervals.',
			],
			after: [
				'实验室小睡后的 20 秒视觉搜索任务；数值为报告汇总值。',
				'20-second visual search after a laboratory nap; report summary values.',
			],
		} as const;
		if (context) context.textContent = translate(contexts[dataset.phase], locale);
		const source = root.querySelector('[data-chart-source]');
		if (source)
			source.textContent =
				locale === 'zh' ? `2023 年报告 · 第 ${dataset.slide} 页` : `2023 report · slide ${dataset.slide}`;
		selector.replaceChildren();
		dataset.categories.forEach((label, i) => {
			const button = document.createElement('button');
			button.type = 'button';
			button.textContent = categoryLabel(label, locale);
			button.addEventListener('click', () => {
				selected = i;
				draw();
			});
			selector.append(button);
		});
		draw();
		animate();
	};
	root.querySelectorAll<HTMLButtonElement>('[data-evidence-phase]').forEach((button) => {
		button.addEventListener('click', () => {
			dataset =
				reportDatasets.find((item) =>
					button.dataset.evidencePhase === 'after'
						? item.id === 'target-clicks'
						: item.phase === button.dataset.evidencePhase,
				) ?? reportDatasets[0];
			selected = 0;
			render();
		});
	});
	root.querySelectorAll<HTMLButtonElement>('[data-dataset]').forEach((button) => {
		button.addEventListener('click', () => {
			dataset = reportDatasets.find((item) => item.id === button.dataset.dataset) ?? reportDatasets[0];
			selected = 0;
			render();
		});
	});
	svg.addEventListener('pointermove', (event) => {
		if (
			dataset.kind !== 'line' ||
			event.pointerType === 'touch' ||
			svg.getAnimations({ subtree: true }).some((animation) => animation.playState === 'running')
		)
			return;
		const rect = svg.getBoundingClientRect();
		const next = Math.max(
			0,
			Math.min(
				dataset.categories.length - 1,
				Math.round(((event.clientX - rect.left - 52) / (rect.width - 78)) * (dataset.categories.length - 1)),
			),
		);
		if (next === selected) return;
		selected = next;
		draw();
	});
	root.addEventListener('evidence-reveal', () => {
		requestAnimationFrame(() => {
			draw();
			animate();
		});
	});
	const storageKey = `will-evidence-${locale}-v3`;
	try {
		const saved: unknown = JSON.parse(sessionStorage.getItem(storageKey) ?? 'null');
		if (saved && typeof saved === 'object' && 'id' in saved) {
			dataset = reportDatasets.find((item) => item.id === saved.id) ?? reportDatasets[0];
			if ('selected' in saved && typeof saved.selected === 'number' && Number.isInteger(saved.selected))
				selected = Math.max(0, Math.min(dataset.categories.length - 1, saved.selected));
		}
	} catch {
		/* Chart navigation also works without storage. */
	}
	window.addEventListener('pagehide', () => {
		try {
			sessionStorage.setItem(storageKey, JSON.stringify({ id: dataset.id, selected }));
		} catch {
			/* Optional local state. */
		}
	});
	root.classList.add('evidence-ready');
	render();
	new ResizeObserver(() => {
		const width = Math.round(root.getBoundingClientRect().width);
		if (width > 0 && Math.max(270, width) !== drawnWidth) {
			draw();
			animate();
		}
	}).observe(root);
}
