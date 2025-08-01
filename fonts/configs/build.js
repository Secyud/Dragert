﻿import {dirname} from "path";
import {join} from "node:path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("Current dir: " + __dirname);

/**/

//
// const svgDir = join(__dirname, 'publish/secits-icons.svg');
// const jsonDir = join(__dirname, 'src/font.json');
// await buildSvgFont(jsonDir, svgDir);
//
// const ttfDir = join(__dirname, 'publish/secits-icons.ttf');
// await buildTtfFont(svgDir, ttfDir);
//
// const woff2Dir = join(__dirname, 'publish/secits-icons.woff2')
// await buildWoff2Font(ttfDir, woff2Dir);
//
// const pathPrefix = '../src/Secyud.Secits.Blazor/wwwroot/css/style/default';
//
// fs.copyFile(svgDir, join(__dirname, pathPrefix, 'secits-icons.svg'), e => {
// });
// fs.copyFile(ttfDir, join(__dirname, pathPrefix, 'secits-icons.ttf'), e => {
// });
// fs.copyFile(woff2Dir, join(__dirname, pathPrefix, 'secits-icons.woff2'), e => {
// });
// fs.copyFile(jsonDir, join(__dirname, pathPrefix, '../font.json'), e => {
// });