const { readFileSync } = require("node:fs");

const data = readFileSync("./06-input").toString();

console.log(indexAtStartOfPacket(data));
console.log(indexAtStartOfMessage(data));

function indexAtStartOfPacket(data: string) {
  let currentList: string[] = [];
  for (let i = 0; i < data.length; i++) {
    const char = data[i];
    if (currentList.includes(char)) {
      // Need to handle the characters between this and the other occurance
      const indexOfFirst = currentList.indexOf(char);
      currentList = currentList.splice(indexOfFirst + 1);
      currentList.push(char);
    } else {
      currentList.push(char);
    }
    if (currentList.length === 4) {
      return i + 1;
    }
  }
}

function indexAtStartOfMessage(data: string) {
  let currentList: string[] = [];
  for (let i = 0; i < data.length; i++) {
    const char = data[i];
    if (currentList.includes(char)) {
      // Need to handle the characters between this and the other occurance
      const indexOfFirst = currentList.indexOf(char);
      currentList = currentList.splice(indexOfFirst + 1);
      currentList.push(char);
    } else {
      currentList.push(char);
    }
    if (currentList.length === 14) {
      return i + 1;
    }
  }
}
