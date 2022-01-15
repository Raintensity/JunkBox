"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _MimeTypes_DEFS, _MimeTypes_UNKNOWN;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MimeTypes = void 0;
class MimeTypes {
    static getMimeInfoFromMime(mime) {
        const mimeStr = mime.toLowerCase();
        const result = __classPrivateFieldGet(this, _a, "f", _MimeTypes_DEFS).find(item => item.mime === mimeStr);
        if (result !== undefined) {
            return {
                ext: result.ext,
                mime: result.mime,
                unknown: false
            };
        }
        return Object.assign({}, __classPrivateFieldGet(this, _a, "f", _MimeTypes_UNKNOWN));
    }
    static getMimeInfoFromExt(ext) {
        const extStr = ext.toLowerCase();
        const result = __classPrivateFieldGet(this, _a, "f", _MimeTypes_DEFS).find(item => item.ext === extStr);
        if (result !== undefined) {
            return {
                ext: result.ext,
                mime: result.mime,
                unknown: false
            };
        }
        return Object.assign({}, __classPrivateFieldGet(this, _a, "f", _MimeTypes_UNKNOWN));
    }
}
exports.MimeTypes = MimeTypes;
_a = MimeTypes;
_MimeTypes_DEFS = { value: [
        { ext: "txt", mime: "text/plain" },
        { ext: "html", mime: "text/html" },
        { ext: "css", mime: "text/css" },
        { ext: "js", mime: "text/javascript" },
        { ext: "bmp", mime: "image/bmp" },
        { ext: "gif", mime: "image/gif" },
        { ext: "heic", mime: "image/heic" },
        { ext: "heic", mime: "image/heif" },
        { ext: "ico", mime: "image/x-icon" },
        { ext: "jpg", mime: "image/jpeg" },
        { ext: "png", mime: "image/png" },
        { ext: "svg", mime: "image/svg+xml" },
        { ext: "tif", mime: "image/tiff" },
        { ext: "webp", mime: "image/webp" },
        { ext: "7z", mime: "application/x-7z-compressed" },
        { ext: "gz", mime: "application/gzip" },
        { ext: "lzh", mime: "application/x-lzh-compressed" },
        { ext: "xz", mime: "application/x-xz" },
        { ext: "zip", mime: "application/zip" },
        { ext: "dmg", mime: "application/x-apple-diskimage" },
        { ext: "exe", mime: "application/x-msdownload" },
        { ext: "aac", mime: "audio/aac" },
        { ext: "aif", mime: "audio/aiff" },
        { ext: "flac", mime: "audio/x-flac" },
        { ext: "mid", mime: "audio/midi" },
        { ext: "mp3", mime: "audio/mpeg" },
        { ext: "opus", mime: "audio/opus" },
        { ext: "ogg", mime: "audio/ogg" },
        { ext: "ts", mime: "video/mp2t" },
        { ext: "wav", mime: "audio/vnd.wave" },
        { ext: "avi", mime: "video/vnd.avi" },
        { ext: "mkv", mime: "video/x-matroska" },
        { ext: "mp4", mime: "video/mp4" },
        { ext: "webm", mime: "video/webm" },
        { ext: "otf", mime: "font/otf" },
        { ext: "ttf", mime: "font/ttf" },
        { ext: "woff", mime: "font/woff" },
        { ext: "woff2", mime: "font/woff2" },
        { ext: "csv", mime: "text/csv" },
        { ext: "json", mime: "application/json" },
        { ext: "pdf", mime: "application/pdf" },
        { ext: "xml", mime: "application/xml" },
        { ext: "", mime: "application/octet-stream" }
    ] };
_MimeTypes_UNKNOWN = { value: {
        ext: "",
        mime: "application/octet-stream",
        unknown: true
    } };
