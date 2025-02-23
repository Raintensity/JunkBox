import { context } from "esbuild";

const ctx = await context({
	entryPoints: ["./src/main.tsx"],
	outdir: "./dest",
	bundle: true,
	minify: true
});

await ctx.watch();
await ctx.serve({ servedir: "./dest" });
