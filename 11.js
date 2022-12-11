const { readFileSync } = require("node:fs");

const data = readFileSync("./11-input").toString();

const monkeys = data.split("\n\n");

const parsedMonkeys = [];

monkeys.forEach((monkey) => {
  const splitValues = monkey.split("\n");
  const monkeyNum = parseInt(splitValues[0].split(" ")[1].replace(":", ""));
  const startingItems = splitValues[1]
    .split(": ")[1]
    .split(", ")
    .map((item) => parseInt(item));
  const operation = (old) => eval(splitValues[2].split("= ")[1]); // EVIL!!!

  const test = parseInt(splitValues[3].split("by ")[1]);
  const ifTrue = parseInt(splitValues[4].split(" monkey ")[1]);
  const ifFalse = parseInt(splitValues[5].split(" monkey ")[1]);
  parsedMonkeys.push({
    monkeyNum,
    startingItems,
    operation,
    test,
    ifTrue,
    ifFalse,
    itemsInspected: 0,
  });
});

// for (let round = 0; round < 20; round++) {
//   parsedMonkeys.forEach((monkey) => {
//     const currentLength = monkey.startingItems.length;
//     for (let i = 0; i < currentLength; i++) {
//       const item = monkey.startingItems.splice(0, 1)[0];
//       let worryLevel = Math.floor(monkey.operation(item) / 3);
//       if (worryLevel % monkey.test === 0) {
//         parsedMonkeys[monkey.ifTrue].startingItems.push(worryLevel);
//       } else {
//         parsedMonkeys[monkey.ifFalse].startingItems.push(worryLevel);
//       }
//       monkey.itemsInspected++;
//     }
//   });
// }

// const inspected = parsedMonkeys
//   .map((item) => item.itemsInspected)
//   .sort((a, b) => b - a);

// console.log(inspected[0] * inspected[1]);

for (let round = 0; round < 10000; round++) {
  parsedMonkeys.forEach((monkey) => {
    const currentLength = monkey.startingItems.length;
    for (let i = 0; i < currentLength; i++) {
      const item = monkey.startingItems.splice(0, 1)[0];
      let worryLevel = monkey.operation(item);
      if (worryLevel % monkey.test === 0) {
        parsedMonkeys[monkey.ifTrue].startingItems.push(worryLevel);
      } else {
        parsedMonkeys[monkey.ifFalse].startingItems.push(worryLevel);
      }
      monkey.itemsInspected++;
    }
  });
}

const inspected = parsedMonkeys
  .map((item) => item.itemsInspected)
  .sort((a, b) => b - a);

console.log(inspected[0] * inspected[1]);
