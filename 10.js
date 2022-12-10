const { readFileSync } = require("node:fs");

const data = readFileSync("./10-input").toString();

let x = 1;
let cycle = 0;

// SUm of signal strength 20th, 60th, 100th, 140th, 180th, and 220th cycles.
// Test result: 13140.
const targets = [20, 60, 100, 140, 180, 220];
const results = [];
let currentRow = "";
let crtPos = 1;

data.split("\n").forEach((instruction) => {
  if (crtPos === 0) {
    if (currentRow !== "") console.log(currentRow);
    currentRow = "";
  }
  const [op, data] = instruction.split(" ");

  if (op === "noop") {
    incCycle();
  } else {
    incCycle();
    incCycle();
    x += parseInt(data);
  }
});

function incCycle() {
  crt();
  cycle++;
  crtPos = cycle % 40;
  testForTarget();
}

function testForTarget() {
  if (targets.includes(cycle)) {
    results.push(getSignalStrength());
  }
}

function crt() {
  if (Math.abs(crtPos - x) < 2) {
    currentRow += "#";
  } else {
    currentRow += ".";
  }
  if (crtPos === 39) {
    console.log(currentRow);
    currentRow = "";
  }
}

console.log(results.reduce((a, c) => a + c, 0));

function getSignalStrength() {
  return x * cycle;
}
