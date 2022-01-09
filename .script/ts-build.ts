import { promises as fsp } from "fs";
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

const createInputOption = (): RollupOptions => {
	return {
		plugins: [
			terser(minifyOptions),
			typescript({ module: "esnext" })
		]
	}
};

const outputOption: OutputOptions = {};

// Defs
const pwd = process.cwd();
const tsDir = pwd + "/library/typescript"
const browserOutDir = pwd + "/library/javascript/ts-browser";
const nodeOutDir = pwd + "/library/javascript/ts-node";

// Packaging func
const packaging = async (path: string): Promise<String | null> => {
	const inputOption = createInputOption();
	inputOption.input = path;
	const bundle = await rollup(inputOption);

	if (bundle.watchFiles.length < 2) {
		bundle.close();
		return null;
	}

	const result = await bundle.generate(outputOption);
	bundle.close();

	if (!result.output.length) {
		throw new Error("Failed packaging");
	}
	return result.output[0].code;
};

// Build func
const build = async () => {
	// Scan dir
	console.log("Scanning: " + tsDir);
	const tsDirEnt = await fsp.readdir(tsDir, { withFileTypes: true });

	for (const ent of tsDirEnt) {
		if (ent.isDirectory()) continue;
		if (ent.name.split(".").pop() !== "ts") continue;
		const fileName = ent.name.slice(0, ent.name.lastIndexOf("."));
		console.log("Transpiling: " + ent.name);

		let str = await fsp.readFile(tsDir + "/" + ent.name, "utf-8");
		let tsOut: ts.TranspileOutput | null, outName: string;

		// Transpile
		outName = "/" + fileName + ".js";
		// For node
		tsOut = ts.transpileModule(str, nodeTranspileOptions);
		await fsp.writeFile(nodeOutDir + outName, tsOut.outputText);
		// For browser
		tsOut = ts.transpileModule(str, browserTranspileOptions);
		await fsp.writeFile(browserOutDir + outName, tsOut.outputText);

		// Clean
		str = tsOut.outputText;
		tsOut = null;

		// Minify
		let minOut: MinifyOutput | null = await minify(str, minifyOptions);
		outName = "/" + fileName + ".min.js";
		await fsp.writeFile(browserOutDir + outName, minOut.code ?? "");

		// Clean
		str = "";
		minOut = null;

		// Packaging
		let packOut = await packaging(tsDir + "/" + ent.name);
		if (packOut !== null) {
			outName = "/" + fileName + ".pack.js";
			await fsp.writeFile(browserOutDir + outName, packOut);
		}
	}

	console.log("Done.");
};

build();
