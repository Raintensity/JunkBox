/**
 * For develop temporary, SHOULD NOT USE PRODUCTION.
 */

import fs, { promises as fsp } from "fs";
import { createServer, IncomingMessage, ServerResponse } from "http";
import path from "path";
import { MimeTypes } from "../../library/typescript/common/mime-types";

const cwd = process.cwd();
const baseArg = process.argv.length > 2 ? process.argv[2] : ".";
const base = path.join(cwd, baseArg);

const onRequest = async (req: IncomingMessage, res: ServerResponse) => {
	let url: string = req.url?.split("?")[0] ?? "/";
	if (url.endsWith("/")) url += "index.html";
	console.log("Request: " + url);

	try {
		if (path.relative(base, base + url).startsWith("..")) {
			throw new Error("Forbidden.");
		}
		await fsp.access(base + url, fs.constants.R_OK);

		const ext = url.split(".").pop() ?? "";
		const mime = MimeTypes.getMimeInfoFromExt(ext).mime;
		res.setHeader("Content-Type", mime);
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.writeHead(200);

		const stream = fs.createReadStream(base + url);
		stream.on("error", e => {
			stream.close();
			throw e;
		});
		stream.pipe(res);
	} catch (e) {
		res.setHeader("Content-Type", "text/plain");
		res.writeHead(500);
		if (e instanceof Error) {
			res.write(e.message);
			console.log(e.message);
		} else {
			res.write("Internal server error.");
			console.log("Internal server error.");
		}
		res.end();
	}
};

const server = createServer();
server.on("request", (req, res) => onRequest(req, res))
server.listen(15000);
console.log("Server has been started.");

process.on("SIGINT", () => {
	if (server.listening) server.close();
	console.log("\nServer has been stopped.");
});
