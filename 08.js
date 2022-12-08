const { readFileSync } = require("node:fs");

const data = readFileSync("./08-input").toString();

// Set up forest array
const forest = [];

data.split("\n").forEach((row) => {
  forest.push(row.split("").map((item) => parseInt(item)));
});

let totalVisible = 2 * forest.length + 2 * forest[0].length - 4;
let maxScenic = 0;

for (let x = 1; x < forest[0].length - 1; x++) {
  for (let y = 1; y < forest.length - 1; y++) {
    const results = [
      treeVisibleDown(y, x),
      treeVisibleUp(y, x),
      treeVisibleLeft(y, x),
      treeVisibleRight(y, x),
    ];
    const visible = results
      .map((item) => item.blocked)
      .reduce((a, c) => a || c, false);

    const scenic = results.map((item) => item.count).reduce((a, c) => a * c, 1);
    if (visible) totalVisible++;
    maxScenic = Math.max(maxScenic, scenic);
  }
}

function treeVisibleLeft(x, y) {
  let height = forest[y][x];
  let count = 0;
  for (let i = x - 1; i > -1; i--) {
    const currentHeight = forest[y][i];
    count++;
    if (currentHeight >= height) {
      return { blocked: false, count };
    }
  }

  return { blocked: true, count };
}
function treeVisibleRight(x, y) {
  let height = forest[y][x];
  let count = 0;
  for (let i = x + 1; i < forest[0].length; i++) {
    const currentHeight = forest[y][i];
    count++;
    if (currentHeight >= height) {
      return { blocked: false, count };
    }
  }
  return { blocked: true, count };
}

function treeVisibleUp(x, y) {
  let height = forest[y][x];
  let count = 0;
  for (let i = y - 1; i > -1; i--) {
    const currentHeight = forest[i][x];
    count++;
    if (currentHeight >= height) {
      return { blocked: false, count };
    }
  }

  return { blocked: true, count };
}
function treeVisibleDown(x, y) {
  let height = forest[y][x];
  let count = 0;
  for (let i = y + 1; i < forest.length; i++) {
    const currentHeight = forest[i][x];
    count++;
    if (currentHeight >= height) {
      return { blocked: false, count };
    }
  }
  return { blocked: true, count };
}

console.log(totalVisible);
console.log(maxScenic);
