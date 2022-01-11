"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _DateEx_formatPriority, _DateEx_patterns;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateEx = void 0;
const util_1 = require("./util");
class DateEx extends Date {
    toISOString(offset) {
        if (!offset)
            return super.toISOString();
        const offsetMS = offset * 60 * 60 * 1000;
        const offsetDate = new Date(this.getTime() + offsetMS);
        const dateString = offsetDate.toISOString();
        return dateString.slice(0, dateString.length - 1)
            + "+" + util_1.NumberUtil.zPad(~~offset, 2)
            + util_1.NumberUtil.zPad(offset * 60 % 60, 2);
    }
    getJPDay() {
        return ["日", "月", "火", "水", "木", "金", "土"][this.getDay()];
    }
    format(pattern, offset) {
        return DateEx.format(this, pattern, offset);
    }
    static format(date, pattern, offset) {
        if (offset) {
            date = new Date(date.getTime() + offset * 60 * 60 * 1000);
        }
        return __classPrivateFieldGet(this, _a, "f", _DateEx_formatPriority).reduce((res, fmt) => {
            return res.replace(fmt, __classPrivateFieldGet(this, _a, "f", _DateEx_patterns)[fmt](date));
        }, pattern);
    }
}
exports.DateEx = DateEx;
_a = DateEx;
_DateEx_formatPriority = { value: [
        "hh", "h", "mm", "m", "ss", "s",
        "dd", "d", "yyyy", "yy", "MM", "M"
    ] };
_DateEx_patterns = { value: {
        hh: (date) => util_1.NumberUtil.zPad(date.getUTCHours(), 2),
        h: (date) => date.getUTCHours() + "",
        mm: (date) => util_1.NumberUtil.zPad(date.getUTCMinutes(), 2),
        m: (date) => date.getUTCMinutes() + "",
        ss: (date) => util_1.NumberUtil.zPad(date.getUTCSeconds(), 2),
        s: (date) => date.getUTCSeconds() + "",
        dd: (date) => util_1.NumberUtil.zPad(date.getUTCDate(), 2),
        d: (date) => date.getUTCDate() + "",
        yyyy: (date) => date.getUTCFullYear() + "",
        yy: (date) => date.getUTCFullYear() % 100 + "",
        MM: (date) => util_1.NumberUtil.zPad(date.getUTCMonth() + 1, 2),
        M: (date) => date.getUTCMonth() + 1 + ""
    } };
