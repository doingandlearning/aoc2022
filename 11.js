const { readFileSync } = require("node:fs");

const data = readFileSync("./11-input").toString();

const monkeys = data.split("\n\n");

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
