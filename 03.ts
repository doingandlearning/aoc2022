import { readFileSync } from "node:fs";

const data = readFileSync("./03-input").toString().split("\n");

// Part 1:

const part1 = data
  .map((row) => generateCharacterValue(splitAndFindUnique(row.split(""))))
  .reduce((a, c) => a + c, 0);

console.log(`The answer to part1 is ${part1}`);

// Part 2:

const results = [];
for (let i = 0; i < data.length / 3; i++) {
  const currentSet = [...data].splice(i * 3, 3);
  results.push(getCommonValue(currentSet));
}

const part2 = results
  .map((value) => generateCharacterValue(value))
  .reduce((a, c) => a + c, 0);

console.log(`The answer to part2 is ${part2}.`);

// Helper functions

function getCommonValue(values: string[]) {
  let result = "";

  for (let i = 0; i < values[0].length; i++) {
    const currentChar = values[0][i];
    if (values[2].includes(currentChar) && values[1].includes(currentChar)) {
      result = currentChar;
      break;
    }
  }
  return result;
}

function generateCharacterValue(char: string) {
  const ascii = char.charCodeAt(0);
  if (ascii > 96) {
    return ascii - 96;
  }
  return ascii - 38;
}

function splitAndFindUnique(item: string[]) {
  const firstHalf = [...item].splice(0, item.length / 2);
  const secondHalf = [...item].splice(item.length / 2);

  let result: string = "";
  for (let i = 0; i < firstHalf.length; i++) {
    const char = firstHalf[i];
    if (secondHalf.includes(char)) {
      result = char;
      break;
    }
  }
  return result;
}
