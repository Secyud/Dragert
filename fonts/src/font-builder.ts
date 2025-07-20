import {SVGIcons2SVGFontStream} from "svgicons2svgfont";
import * as svg2ttf from "svg2ttf";
import ttf2woff2 from "ttf2woff2";
import {join} from "node:path";
import {fs} from "../../utils/src/file-stream";

interface ISvgIconData {
    name: string;
    unicode: string;
    path: string;
}


export class FontBuilder {
    data: ISvgIconData[];

    addSvg(svgData: ISvgIconData) {
        this.data.push(svgData);
    }


    async buildWoff2Font(inputTtfPath: string, outputWoff2Path: string) {
        const buffer = await fs.readFile(inputTtfPath, {encoding: "utf-8"});
        const woff2 = ttf2woff2(buffer);
        await fs.writeFile(outputWoff2Path, woff2, {encoding: "utf-8"});
        console.log(`Woff2 icon successfully created!(${outputWoff2Path})`);
    }

    async buildTtfFont(inputSvgPath: string, outputTtfPath: string) {
        const buffer = await fs.readFile(inputSvgPath, {encoding: 'utf-8'});
        const ttf = svg2ttf(typeof buffer === "string" ? buffer : buffer.toString());
        await fs.writeFile(outputTtfPath, Buffer.from(ttf.buffer), {encoding: "utf-8"});
    }

    async buildSvgFont(outputPath: string, fontName: string) {
        const fontStream = new SVGIcons2SVGFontStream({fontName: fontName});
        const outputSvgFontPath = join(outputPath, fontName + ".svg");
        const ws = fs.createWriteStream(outputSvgFontPath);

        fontStream.pipe(ws);

        let css = ".si{";

        for (const icon of this.data) {
            let glyph = fs.createReadStream(icon.path);
            glyph["metadata"] = {
                unicode: [icon.unicode],
                name: icon.name,
            }
            css += `&.b.${icon}::before {content: '${icon.unicode}';}`;
            css += `&.a.${icon}::after {content: '${icon.unicode}';}`;
            fontStream.write(glyph);
        }

        fontStream.end();

        css += '}';

        const cssFileOutputPath = join(outputPath, fontName + ".css");

        await fs.writeFile(cssFileOutputPath, css, {encoding: "utf-8"});

        console.log(`Svg Font css create successfully!(${cssFileOutputPath})`);
    }
}