# CommandLine

Build run esbuild on command line.

Require esvuild for `PATH`

## Usage

Note: Static files are not copied automatically.

```sh
npm i
rm -rf ./dest
mkdir dest
cp ./src/index.html ./dest/index.html
npm run build
```

### Dev server

```sh
npm i
rm -rf ./dest
mkdir dest
cp ./src/index.html ./dest/index.html
npm run dev
```
