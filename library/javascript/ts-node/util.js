"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberUtil = void 0;
class NumberUtil {
    static zPad(n, l) {
        return (Array(l).join("0") + n).slice(-l);
    }
}
exports.NumberUtil = NumberUtil;
