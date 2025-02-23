import { build } from "esbuild";

await build({
	entryPoints: ["./src/main.tsx"],
	outdir: "./dest",
	bundle: true,
	minify: true
});
