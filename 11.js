const { readFileSync } = require("node:fs");

const data = readFileSync("./11-input").toString();

const monkeys = data.split("\n\n");

// function getMonkeys() {
//   const parsedMonkeys = [];

//   monkeys.forEach((monkey) => {
//     const splitValues = monkey.split("\n");
//     const monkeyNum = parseInt(splitValues[0].split(" ")[1].replace(":", ""));
//     const startingItems = splitValues[1]
//       .split(": ")[1]
//       .split(", ")
//       .map((item) => parseInt(item));
//     const operation = (old) => eval(splitValues[2].split("= ")[1]); // EVIL!!!

//     const test = parseInt(splitValues[3].split("by ")[1]);
//     const ifTrue = parseInt(splitValues[4].split(" monkey ")[1]);
//     const ifFalse = parseInt(splitValues[5].split(" monkey ")[1]);
//     parsedMonkeys.push({
//       monkeyNum,
//       startingItems,
//       operation,
//       test,
//       ifTrue,
//       ifFalse,
//       itemsInspected: 0,
//     });
//   });
//   return parsedMonkeys;
// }

// function part1() {
//   const parsedMonkeys = getMonkeys();
//   for (let round = 0; round < 20; round++) {
//     parsedMonkeys.forEach((monkey) => {
//       const currentLength = monkey.startingItems.length;
//       for (let i = 0; i < currentLength; i++) {
//         const item = monkey.startingItems.splice(0, 1)[0];
//         let worryLevel = Math.floor(monkey.operation(item) / 3);
//         if (worryLevel % monkey.test === 0) {
//           parsedMonkeys[monkey.ifTrue].startingItems.push(worryLevel);
//         } else {
//           parsedMonkeys[monkey.ifFalse].startingItems.push(worryLevel);
//         }
//         monkey.itemsInspected++;
//       }
//     });
//   }

//   const inspected = parsedMonkeys
//     .map((item) => item.itemsInspected)
//     .sort((a, b) => b - a);

//   console.log(inspected[0] * inspected[1]);
// }

// function part2() {
//   const monkeys = getMonkeys();
//   const divider = monkeys.map((m) => m.test).reduce((a, b) => a * b, 1);
//   for (let i = 0; i < 10000; i++) {
//     for (const monkey of monkeys) {
//       let items = monkey.startingItems;
//       while (items.length) {
//         let item = items.shift();
//         monkey.itemsInspected++;

//         item = monkey.operation(item);
//         item = item % divider;
//         const destination =
//           item % monkey.divisibleBy === 0 ? monkey.ifTrue : monkey.ifFalse;

//         monkeys[destination].startingItems.push(item);
//       }
//     }
//   }
//   const activity = monkeys.map((m) => m.itemsInspected);
//   activity.sort((a, b) => b - a);
//   console.log(activity[0] * activity[1]);
// }

// part1();

// part2();

function getOperationFunction(input) {
  return function (old) {
    const string = input.replace(/old/, old);
    // Warning: do not use in prod
    return eval(string);
  };
}

// console.log(getOperationFunction("old * 19")(10));
// console.log(getOperationFunction("old * old")(10));
// console.log(getOperationFunction("old + 3")(10));

function getMonkeys() {
  const parsedMonkeys = [];

  monkeys.forEach((monkey) => {
    const splitValues = monkey.split("\n");
    const monkeyNum = parseInt(splitValues[0].split(" ")[1].replace(":", ""));
    const startingItems = splitValues[1]
      .split(": ")[1]
      .split(", ")
      .map((item) => parseInt(item));
    const operation = (old) => eval(splitValues[2].split("= ")[1]); // EVIL!!!

    const divisibleBy = parseInt(splitValues[3].split("by ")[1]);
    const ifTrue = parseInt(splitValues[4].split(" monkey ")[1]);
    const ifFalse = parseInt(splitValues[5].split(" monkey ")[1]);
    parsedMonkeys.push({
      id: monkeyNum,
      items: startingItems,
      operation,
      sendTo: (item) => (item % divisibleBy === 0 ? ifTrue : ifFalse),
      totalInspectedObjects: 0,
      divisibleBy,
    });
  });
  return parsedMonkeys;
}

function part1() {
  const monkeys = getMonkeys();
  for (let i = 0; i < 20; i++) {
    for (const monkey of monkeys) {
      let items = monkey.items;
      while (items.length) {
        let item = items.shift();
        monkey.totalInspectedObjects++;

        item = monkey.operation(item);
        item = Math.floor(item / 3);
        const destination = monkey.sendTo(item);

        monkeys[destination].items.push(item);
      }
    }
  }
  const activity = monkeys.map((m) => m.totalInspectedObjects);
  activity.sort((a, b) => b - a);
  console.log(activity[0] * activity[1]);
}

function part2() {
  const monkeys = getMonkeys();
  const divider = monkeys.map((m) => m.divisibleBy).reduce((a, b) => a * b, 1);

  for (let i = 0; i < 10000; i++) {
    for (const monkey of monkeys) {
      let items = monkey.items;
      while (items.length) {
        let item = items.shift();
        monkey.totalInspectedObjects++;

        item = monkey.operation(item);
        item = item % divider;
        const destination = monkey.sendTo(item);

        monkeys[destination].items.push(item);
      }
    }
  }
  const activity = monkeys.map((m) => m.totalInspectedObjects);
  activity.sort((a, b) => b - a);
  console.log(activity[0] * activity[1]);
}

part1();
part2();
