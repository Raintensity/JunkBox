import { Dirent, promises as fsp } from "fs";
import ts from "typescript";
import { minify, MinifyOptions, MinifyOutput } from "terser";
import { OutputOptions, rollup, RollupOptions } from "rollup";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

// Options
const browserTranspileOptions: ts.TranspileOptions = {
	compilerOptions: {
		target: ts.ScriptTarget.ES2020,
		module: ts.ModuleKind.ESNext,
		strict: true
	}
};

const nodeTranspileOptions: ts.TranspileOptions = {
	compilerOptions: {
		target: ts.ScriptTarget.ES2020,
		module: ts.ModuleKind.CommonJS,
		strict: true
	}
};

const minifyOptions: MinifyOptions = {
	format: { comments: false }
};

const inputOption: RollupOptions = {
	plugins: [
		terser(minifyOptions),
		typescript({ module: "esnext" })
	]
};

const outputOption: OutputOptions = {};

// Defs
const pwd = process.cwd();
const tsDir = pwd + "/library/typescript";
const tsComDir = tsDir + "/common";
const tsBrowserDir = tsDir + "/browser";
const tsNodeDir = tsDir + "/node";
const browserOutDir = pwd + "/library/javascript/ts-browser";
const nodeOutDir = pwd + "/library/javascript/ts-node";

const getFilePath = (name: string, type: BUILD_TYPE) => {
	const dir = type === 0 ? "common" : type === 1 ? "node" : "browser";
}

const BUILD_TYPE = {
	COMMON: 0,
	NODE: 1,
	BROWSER: 2
} as const;
type BUILD_TYPE = typeof BUILD_TYPE[keyof typeof BUILD_TYPE];

// Main func
const main = async () => {
	const options: { withFileTypes: true } = { withFileTypes: true };

	// Scan common dir
	console.log("Scanning: " + tsComDir);
	const comDir = await fsp.readdir(tsComDir, options);
	for (const ent of comDir) {
		await build(ent, tsComDir, BUILD_TYPE.COMMON);
	}

	// Scan browser dir
	console.log("Scanning: " + tsBrowserDir);
	const browserDir = await fsp.readdir(tsBrowserDir, options);
	for (const ent of browserDir) {
		await build(ent, tsBrowserDir, BUILD_TYPE.BROWSER);
	}

	// Scan node dir
	console.log("Scanning: " + tsNodeDir);
	const nodeDir = await fsp.readdir(tsNodeDir, options);
	for (const ent of nodeDir) {
		await build(ent, tsNodeDir, BUILD_TYPE.NODE);
	}

	console.log("Done.");
};

// Build func
const build = async (ent: Dirent, path: string, type: BUILD_TYPE) => {
	if (ent.isDirectory()) return;
	if (ent.name.split(".").pop() !== "ts") return;
	const fileName = ent.name.slice(0, ent.name.lastIndexOf("."));
	console.log("Transpiling: " + ent.name);

	let str = await fsp.readFile(path + "/" + ent.name, "utf-8");

	// Transpile for Node
	if (type === BUILD_TYPE.COMMON || type === BUILD_TYPE.NODE) {
		const tsOut = ts.transpileModule(str, nodeTranspileOptions);
		const outName = "/" + fileName + ".js";
		await fsp.writeFile(nodeOutDir + outName, tsOut.outputText);
	}

	// Transpile for browser
	if (type === BUILD_TYPE.COMMON || type === BUILD_TYPE.BROWSER) {
		let tsOut: ts.TranspileOutput | null,
			minOut: MinifyOutput | null,
			outName: string;

		// Transpile
		tsOut = ts.transpileModule(str, browserTranspileOptions);
		outName = "/" + fileName + ".js";
		await fsp.writeFile(browserOutDir + outName, tsOut.outputText);

		str = tsOut.outputText;
		tsOut = null;

		// Minify
		minOut = await minify(str, minifyOptions);
		outName = "/" + fileName + ".min.js";
		await fsp.writeFile(browserOutDir + outName, minOut.code ?? "");

		str = "";
		minOut = null;

		// Packaging
		let packOut = await packaging(path + "/" + ent.name);
		if (packOut !== null) {
			outName = "/" + fileName + ".pack.js";
			await fsp.writeFile(browserOutDir + outName, packOut);
		}
	}
};

// Packaging func
const packaging = async (path: string): Promise<String | null> => {
	inputOption.input = path;
	const bundle = await rollup(inputOption);

	if (bundle.watchFiles.length < 2) {
		bundle.close();
		inputOption.input = undefined;
		return null;
	}

	const result = await bundle.generate(outputOption);
	bundle.close();
	inputOption.input = undefined;

	if (!result.output.length) {
		throw new Error("Failed packaging.");
	}
	return result.output[0].code;
};

main();
