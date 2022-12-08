import { readFileSync } from "node:fs";

const data = readFileSync("./07-input").toString();

interface File {
  name: string;
  size: number;
  children?: Array<File>;
}

interface Dir extends File {
  children: Array<File>;
}

const tree: Dir[] = [{ name: "/", size: 0, children: [] }];
let currentPosition = tree[0];
const currentStack: File[] = [];

// Create tree
const instructions = data.split("\n");

instructions.forEach((line, index) => {
  processStep(line, index);
});

function processStep(line: string, index: number) {
  if (line.startsWith("$ cd")) {
    moveDirectory(line.split("$ cd")[1].trim());
  } else if (line === "$ ls") {
    // do nothing!
  } else {
    addFileToDirectory(line);
  }
  if (index === instructions.length - 1 && currentPosition !== tree[0]) {
    processStep("$ cd ..", index);
  }
}

let result = 0;
let dirSizes: number[] = [];

findAllSizes(tree[0]);

function findAllSizes(file: File) {
  if (file.hasOwnProperty("children") && Array.isArray(file.children)) {
    dirSizes.push(file.size);
    for (let i = 0; i < file.children.length; i++) {
      findAllSizes(file.children[i]);
    }
    if (file.size < 100000) result += file.size;
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

function moveDirectory(path: string) {
  if (path === "/") {
    currentPosition = tree[0];
  } else if (path === "..") {
    const size = currentPosition.size;
    currentPosition = currentStack.pop() as Dir;
    currentPosition.size += size;
  } else {
    currentStack.push(currentPosition);
    let targetDirectory = currentPosition.children!.find(
      (item) => item.name === path
    );
    if (!targetDirectory) {
      const newDirectory = { name: path, size: 0, children: [] };
      currentPosition.children!.push(newDirectory);
      currentPosition = newDirectory;
    } else {
      currentPosition = targetDirectory as Dir;
    }
  }
}

function addFileToDirectory(line: string) {
  const [description, name] = line.split(" ");

  if (description === "dir") {
    currentPosition.children.push({ name, size: 0, children: [] });
  } else {
    currentPosition.children.push({ name, size: parseInt(description) });
    currentPosition.size += parseInt(description);
  }
}
