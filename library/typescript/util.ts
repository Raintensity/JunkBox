export class NumberUtil {
	static zPad(n: number, l: number) {
		return (Array(l).join("0") + n).slice(-l);
	}
}
