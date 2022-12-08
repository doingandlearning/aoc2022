const { readFileSync } = require("node:fs");

// There is a TS version of this as well.

const data = readFileSync("./07-input").toString();

const tree = [{ name: "/", size: 0, children: [] }];
let currentPosition = tree[0];
const currentStack = [];

// Create tree
const instructions = data.split("\n");

instructions.forEach((line, index) => {
  processStep(line, index);
});

function processStep(line, index) {
  if (line.startsWith("$ cd")) {
    moveDirectory(line.split("$ cd")[1].trim());
  } else if (line === "$ ls") {
    //
  } else {
    addFileToDirectory(line);
  }
  if (index === instructions.length - 1 && currentPosition !== tree[0]) {
    processStep("$ cd ..", index);
  }
}

let result = 0;
let dirSizes = [];
findAllSizes(tree, 0);

function findAllSizes(object) {
  if (
    object.hasOwnProperty("size") &&
    parseInt(object.size) < 100000 &&
    object.hasOwnProperty("children")
  ) {
    result += parseInt(object.size);
  }

  if (object.hasOwnProperty("size") && object.hasOwnProperty("children")) {
    dirSizes.push(object.size);
  }

  for (var i = 0; i < Object.keys(object).length; i++) {
    if (typeof object[Object.keys(object)[i]] == "object") {
      findAllSizes(object[Object.keys(object)[i]], result);
    }
  }
}

console.log("The sum of all the directories less t han 100,000 is: ", result);

dirSizes.sort((a, b) => b - a);
const availableSpace = 70000000 - dirSizes[0];
const neededSpace = 30000000 - availableSpace;

for (let i = 1; i < dirSizes.length; i++) {
  // next directory is too small
  if (dirSizes[i + 1] < neededSpace) {
    console.log("This size of the directory to remove is: ", dirSizes[i]);
    break;
  }
}

function moveDirectory(path) {
  if (path === "/") {
    currentPosition = tree[0];
  } else if (path === "..") {
    const size = currentPosition.size;
    currentPosition = currentStack.pop();
    currentPosition.size += size;
  } else {
    currentStack.push(currentPosition);
    let targetDirectory = currentPosition.children.find(
      (item) => item.name === path
    );
    if (!targetDirectory) {
      const newDirectory = { name: path, size: 0, children: [] };
      currentPosition.children.push(newDirectory);
      currentPosition = newDirectory;
    } else {
      currentPosition = targetDirectory;
    }
  }
}

function addFileToDirectory(line) {
  const [description, name] = line.split(" ");

  if (description === "dir") {
    currentPosition.children.push({ name, size: 0, children: [] });
  } else {
    currentPosition.children.push({ name, size: parseInt(description) });
    currentPosition.size += parseInt(description);
  }
}
