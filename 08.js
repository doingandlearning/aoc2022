const { readFileSync } = require("node:fs");

const data = readFileSync("./08-test").toString();

// Set up forest array
const forest = [];

data.split("\n").forEach((row) => {
  forest.push(row.split("").map((item) => parseInt(item)));
});

let totalVisible = 2 * forest.length + 2 * forest[0].length - 4;

for (let x = 1; x < forest[0].length - 1; x++) {
  for (let y = 1; y < forest.length - 1; y++) {
    const visible = treeVisibleRight(y, x) || treeVisibleLeft(y, x);

    console.log(visible);
  }
}

function treeVisibleLeft(x, y) {
  let height = forest[y][x];

  for (let i = x - 1; i > -1; i--) {
    const currentHeight = forest[y][i];
    if (currentHeight >= height) {
      return false;
    }
  }

  return true;
}
function treeVisibleRight(x, y) {
  let height = forest[y][x];

  for (let i = x + 1; i < forest[0].length; i++) {
    const currentHeight = forest[y][i];
    if (currentHeight >= height) {
      return false;
    }
  }
  return true;
}

// function treeVisibleUp(x, y) {
//   let height = forest[y][x];

//   for (let i = y - 1; i > -1; i--) {
//     const currentHeight = forest[i][x];
//     if (currentHeight >= height) {
//       return false;
//     }
//   }

//   return true;
// }
// function treeVisibleDown(x, y) {
//   let height = forest[y][x];

//   for (let i = y + 1; i < forest.length - 1; i++) {
//     const currentHeight = forest[i][x];
//     if (currentHeight >= height) {
//       return false;
//     }
//   }

//   return true;
// }

console.log(forest);
console.log(totalVisible);
