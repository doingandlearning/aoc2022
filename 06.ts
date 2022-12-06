const { readFileSync } = require("node:fs");

const data = readFileSync("./06-input").toString();

console.log(indexAtEndOfRepetition(data, 4));
console.log(indexAtEndOfRepetition(data, 14));

function indexAtEndOfRepetition(data: string, target: number) {
  let currentList: string[] = [];
  for (let i = 0; i < data.length; i++) {
    const char = data[i];
    if (currentList.includes(char)) {
      const indexOfFirst = currentList.indexOf(char);
      currentList = currentList.splice(indexOfFirst + 1);
      currentList.push(char);
    } else {
      currentList.push(char);
    }
    if (currentList.length === target) {
      return i + 1;
    }
  }
}
