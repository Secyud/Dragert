
let i = 1;
let j = 256 - i;

console.log(`(${-j}, ${getY1(-j)})`);
console.log(`(${j}, ${getY2(j)})`);
console.log(`(${-j}, ${getY1(-j)})`);
console.log(`(${j}, ${getY2(j)})`);

function getY1(x) {
    return x + 256;
}


function getY2(x) {
    return -x + 256;
}