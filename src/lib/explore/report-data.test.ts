import { describe, expect, it } from 'vitest';
import { chartPoints } from './charts';
import { reportDatasets } from './report-data';

describe('report evidence integrity', () => {
	it('retains the report values and both complete time series', () => {
		const eye = reportDatasets[0];
		expect(eye.series[0][0]).toBe(0.25737418);
		expect(eye.series[1][5]).toBe(0.3631188);
		expect(eye.categories).toEqual(['0-5', '5-10', '10-15', '15-20', '20-25', '25-30']);
		expect(reportDatasets[5].series).toEqual([[8.5], [6]]);
	});
	it('keeps individual EEG records separate on the same scale', () => {
		const [a, b] = reportDatasets.filter((dataset) => dataset.phase === 'during');
		expect(a.maximum).toBe(b.maximum);
		expect(a.series[0]).not.toEqual(b.series[0]);
		expect(a.slide).toBe(10);
	});
	it('uses zero baselines and retains all source points within their axes', () => {
		for (const dataset of reportDatasets)
			for (const series of dataset.series) {
				expect(series).toHaveLength(dataset.categories.length);
				expect(
					series.every((value) => Number.isFinite(value) && value >= 0 && value <= dataset.maximum),
				).toBe(true);
			}
		expect(chartPoints([0, 3], 400, 230, 3)).toEqual([
			[52, 200],
			[374, 30],
		]);
	});
	it('keeps all fixation categories rather than displaying only favorable totals', () => {
		const data = reportDatasets[4];
		expect(data.series).toEqual([
			[68, 25.5, 42.5],
			[55.5, 11, 44.5],
		]);
		expect(data.series[0][1] + data.series[0][2]).toBe(data.series[0][0]);
		expect(data.series[1][1] + data.series[1][2]).toBe(data.series[1][0]);
	});
});
