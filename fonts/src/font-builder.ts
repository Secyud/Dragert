// @ts-ignore
import {SVGIcons2SVGFontStream} from "svgicons2svgfont";
import svg2ttf from "svg2ttf";
import ttf2woff2 from "ttf2woff2";
import {join} from "node:path";
import {fs} from "../../utils/src/file-stream";
import {readFile, writeFile} from 'node:fs/promises';

interface ISvgIconData {
    name: string;
    unicode: string;
    path: string;
}

export class FontBuilder {
    data: ISvgIconData[] = [];

    addSvg(svgData: ISvgIconData) {
        this.data.push(svgData);
    }

    async buildWoff2Font(inputTtfPath: string, outputWoff2Path: string) {
        const buffer = await fs.readFile(inputTtfPath);
        const woff2 = ttf2woff2(buffer as NonSharedBuffer);
        await fs.writeFile(outputWoff2Path, woff2, {encoding: "utf-8"});
        console.log(`Woff2 icon successfully created!(${outputWoff2Path})`);
    }

    async buildTtfFont(inputSvgPath: string, outputTtfPath: string) {
        const buffer = await fs.readFile(inputSvgPath, {encoding: 'utf-8'});
        const ttf = svg2ttf(typeof buffer === "string" ? buffer : buffer.toString());
        await fs.writeFile(outputTtfPath, Buffer.from(ttf.buffer), {encoding: "utf-8"});
    }

    buildSvg(outputPath: string, fontName: string) {
        return new Promise<void>((resolve, reject) => {

            const fontStream = new SVGIcons2SVGFontStream({fontName: fontName});
            const ws = fs.createWriteStream(outputPath);

            fontStream.pipe(ws)
                .on('finish', function () {
                    console.log(`SvgFont successfully created!(${outputPath})`);
                    resolve();
                })
                .on('error', function (err) {
                    console.log(err);
                    reject();
                });

            for (const icon of this.data) {
                let glyph = fs.createReadStream(icon.path);
                glyph["metadata"] = {
                    unicode: [icon.unicode],
                    name: icon.name,
                }
                fontStream.write(glyph);
            }

            fontStream.end();
        })
    }

    async buildSvgFontCss(outputPath: string, fontClass: string) {

        let css = `.${fontClass}{`;

        for (const icon of this.data) {
            css += `&.${icon.name}::after {content: '${icon.unicode}';}`;
        }

        css += '}';

        const cssFileOutputPath = join(outputPath);

        await fs.writeFile(cssFileOutputPath, css, {encoding: "utf-8"});

        console.log(`Svg Font css create successfully!(${cssFileOutputPath})`);
    }
}