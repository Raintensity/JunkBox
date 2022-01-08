import { NumberUtil } from "./util";

type DatePattern = { [name: string]: (date: Date) => string };

export class DateEx extends Date {
	toISOString(): string;
	toISOString(offset?: string | number): string;

	toISOString(offset?: number): string {
		if (!offset) return super.toISOString();

		const offsetMS = offset * 60 * 60 * 1000;
		const offsetDate = new Date(this.getTime() + offsetMS);
		const dateString = offsetDate.toISOString();

		return dateString.slice(0, dateString.length - 1)
			+ "+" + NumberUtil.zPad(~~offset, 2)
			+ NumberUtil.zPad(offset * 60 % 60, 2);
	}

	getJPDay() {
		return ["日", "月", "火", "水", "木", "金", "土"][this.getDay()];
	}

	static #formatPriority = [
		"hh", "h", "mm", "m", "ss", "s",
		"dd", "d", "yyyy", "yy", "MM", "M"
	];

	static #patterns: DatePattern = {
		hh: (date: Date) => NumberUtil.zPad(date.getUTCHours(), 2),
		h: (date: Date) => date.getUTCHours() + "",
		mm: (date: Date) => NumberUtil.zPad(date.getUTCMinutes(), 2),
		m: (date: Date) => date.getUTCMinutes() + "",
		ss: (date: Date) => NumberUtil.zPad(date.getUTCSeconds(), 2),
		s: (date: Date) => date.getUTCSeconds() + "",
		dd: (date: Date) => NumberUtil.zPad(date.getUTCDate(), 2),
		d: (date: Date) => date.getUTCDate() + "",
		yyyy: (date: Date) => date.getUTCFullYear() + "",
		yy: (date: Date) => date.getUTCFullYear() % 100 + "",
		MM: (date: Date) => NumberUtil.zPad(date.getUTCMonth() + 1, 2),
		M: (date: Date) => date.getUTCMonth() + 1 + ""
	};

	format(pattern: string, offset?: number) {
		return DateEx.format(this, pattern, offset);
	}

	static format(date: Date, pattern: string, offset?: number) {
		if (offset) {
			date = new Date(date.getTime() + offset * 60 * 60 * 1000);
		}

		return this.#formatPriority.reduce((res, fmt) => {
			return res.replace(fmt, this.#patterns[fmt](date));
		}, pattern);
	}
}

