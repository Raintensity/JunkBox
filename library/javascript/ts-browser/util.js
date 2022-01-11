export class NumberUtil {
    static zPad(n, l) {
        return (Array(l).join("0") + n).slice(-l);
    }
}
