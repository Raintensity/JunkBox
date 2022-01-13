import { Dirent, promises as fsp } from "fs";
import CleanCSS from "clean-css";

const pwd = process.cwd();
const cssDir = pwd + "/template/css";

const cleanCSS = new CleanCSS();

const main = async () => {
	const options: { withFileTypes: true } = { withFileTypes: true };

	// Scan common dir
	console.log("Scanning: " + cssDir);
	const cssDirEnt = await fsp.readdir(cssDir, options);
	for (const ent of cssDirEnt) {
		await build(ent);
	}
};

const build = async (ent: Dirent) => {
	if (ent.isDirectory()) return;
	if (!ent.name.match(/\.css$/)) return;
	if (ent.name.match(/\.min\.css$/)) return;
	console.log("Minifying: " + ent.name);

	let file = await fsp.readFile(cssDir + "/" + ent.name, "utf-8");
	const output = cleanCSS.minify(file);

	const fileName = ent.name.slice(0, ent.name.length - 4) + ".min.css";
	await fsp.writeFile(cssDir + "/" + fileName, output.styles);
};

main();
