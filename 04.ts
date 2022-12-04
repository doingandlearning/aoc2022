import { readFileSync } from "node:fs";

const data = readFileSync("./04-input").toString().split("\n");

let part1Counter = 0;

data.forEach((row) => {
  const [first, second] = row.split(",").map((elf) => expandList(elf));
  if (containsArray(first, second) || containsArray(second, first)) {
    part1Counter++;
  }
});

console.log(part1Counter);

let part2Counter = 0;

data.forEach((row) => {
  const [first, second] = row.split(",").map((elf) => expandList(elf));
  if (overlapExists(first, second) || overlapExists(second, first)) {
    part2Counter++;
  }
});

console.log(part2Counter);

function expandList(input: string) {
  const [start, end] = input.split("-");
  const result: number[] = [];
  for (let i = parseInt(start); i <= parseInt(end); i++) {
    result.push(i);
  }
  return result;
}

function containsArray(set: number[], subset: number[]) {
  let result = true;
  subset.forEach((element) => {
    if (!set.includes(element)) {
      result = false;
    }
  });
  return result;
}

function overlapExists(set: number[], subset: number[]) {
  let result = false;
  for (let i = 0; i < subset.length; i++) {
    if (set.includes(subset[i])) {
      result = true;
      break;
    }
  }
  return result;
}
