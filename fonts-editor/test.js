import {svgEditor} from "./src/svg-editor.js";
import fs from "fs";
import {join} from "node:path";
import {fileURLToPath} from "url";
import {dirname} from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let param = {

    k: 1,
    by: 10,
    bx: 20,
    a: 10,
    cx1: 5,
    cx2: 20,
}

down(param);
up(param)

function down() {
    let width = 256;
    let height = 256;
    let k = param.k;
    let by = param.by;
    let bx = param.bx;
    let a = param.a;
    let cx1 = param.cx1;
    let cx2 = param.cx2;
    let x = width - by / k - a;
    let x0 = -x + bx;
    let x1 = -bx;
    let x2 = bx;
    let x3 = x - bx;
    let c0 = -x + bx - cx1;
    let c1 = -x + bx - cx2;
    let c2 = x - bx + cx2;
    let c3 = x - bx + cx1;

    function y(x) {
        return {
            x: x,
            y: x < 0 ?
                k * x + height :
                -k * x + height
        }
    }

    function b(x, a = 0) {
        return {
            x: x,
            y: by + a
        }
    }

    let down = {
        shapes: [{
            name: "path",
            startPoint: {x: 0, y: by},
            steps: [
                {
                    id: "first draw", name: "draw", draws: [
                        {
                            name: "L",
                            point: b(x0)
                        },
                        {
                            name: "C",
                            point: y(x0),
                            point1: b(c0),
                            point2: y(c1),
                        },
                        {
                            name: "L",
                            point: y(x1)
                        },
                        {
                            name: "S",
                            point: y(x2),
                            point1: {x: 0, y: height},
                        },
                        {
                            name: "L",
                            point: y(x3)
                        },
                        {
                            name: "C",
                            point: b(x3),
                            point1: y(c2),
                            point2: b(c3),
                        },
                    ]
                }
            ]
        }], viewPort: {
            x: width, y: 0, width: width * 2, height: height
        }, precision: 1, startPoint: {
            x: 0, y: 0
        }
    };

    console.log(JSON.stringify(down));
    drawFromJson(join(__dirname, 'down.svg'), down);
}

function up(param) {
    let width = 256;
    let height = 256;
    let k = param.k;
    let by = param.by;
    let bx = param.bx;
    let a = param.a;
    let cx1 = param.cx1;
    let cx2 = param.cx2;
    let x = width - by / k - a;
    let x0 = -x + bx;
    let x1 = -bx;
    let x2 = bx;
    let x3 = x - bx;
    let c0 = -x + bx - cx1;
    let c1 = -x + bx - cx2;
    let c2 = x - bx + cx2;
    let c3 = x - bx + cx1;

    function y(x) {
        return {
            x: x,
            y: -(x < 0 ?
                k * x + height :
                -k * x + height)
        }
    }

    function b(x, a = 0) {
        return {
            x: x,
            y: -(by + a)
        }
    }

    let up = {
        shapes: [{
            name: "path",
            startPoint: {x: 0, y: -by},
            steps: [
                {
                    id: "first draw", name: "draw", draws: [
                        {
                            name: "L",
                            point: b(x0)
                        },
                        {
                            name: "C",
                            point: y(x0),
                            point1: b(c0),
                            point2: y(c1),
                        },
                        {
                            name: "L",
                            point: y(x1)
                        },
                        {
                            name: "S",
                            point: y(x2),
                            point1: {x: 0, y: -height},
                        },
                        {
                            name: "L",
                            point: y(x3)
                        },
                        {
                            name: "C",
                            point: b(x3),
                            point1: y(c2),
                            point2: b(c3),
                        },
                    ]
                }
            ]
        }], viewPort: {
            x: width, y: height, width: width * 2, height: height
        }, precision: 1, startPoint: {
            x: 0, y: 0
        }
    };

    console.log(JSON.stringify(up));
    drawFromJson(join(__dirname, 'up.svg'), up);
}


function drawFromFile(path) {
    fs.readFile(path + '.json', "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        let str = data.toString();
        str = str.substring(str.indexOf("{"));

        let canvas = JSON.parse(str);

        drawToPath(path + '.svg', canvas);
    })
}


function drawFromJson(path, data) {
    fs.writeFile(path, svgEditor.generateSvg(data), "utf8", (err) => {
    })
}