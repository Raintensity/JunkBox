interface MimeInfo {
	ext: string;
	mime: string;
}

interface MimeInfoResult extends MimeInfo {
	unknown: boolean;
}

export class MimeTypes {
	static readonly #DEFS: MimeInfo[] = [
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
	];

	static readonly #UNKNOWN: MimeInfoResult = {
		ext: "",
		mime: "application/octet-stream",
		unknown: true
	};

	static getMimeInfoFromMime(mime: string): MimeInfoResult {
		const mimeStr = mime.toLowerCase();
		const result = this.#DEFS.find(item => item.mime === mimeStr);
		if (result !== undefined) {
			return {
				ext: result.ext,
				mime: result.mime,
				unknown: false
			}
		}
		return Object.assign({}, this.#UNKNOWN);
	}

	static getMimeInfoFromExt(ext: string): MimeInfoResult {
		const extStr = ext.toLowerCase();
		const result = this.#DEFS.find(item => item.ext === extStr);
		if (result !== undefined) {
			return {
				ext: result.ext,
				mime: result.mime,
				unknown: false
			}
		}
		return Object.assign({}, this.#UNKNOWN);
	}
}

