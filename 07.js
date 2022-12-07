{
  const { readFileSync } = require("node:fs");

  const data = readFileSync("./07-test").toString();

  const tree = [{ name: "/", size: 0, children: [] }];
  let currentPosition = tree[0];
  const currentStack = [];

  // Create tree
  data.split("\n").forEach((line) => {
    if (line.startsWith("$ cd")) {
      moveDirectory(line.split("$ cd")[1].trim());
    } else if (line === "$ ls") {
      //
    } else {
      addFileToDirectory(line);
    }
  });

  let result = 0;
  let possibleDirs = [];
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
      possibleDirs.push(object.size);
    }

    for (var i = 0; i < Object.keys(object).length; i++) {
      if (typeof object[Object.keys(object)[i]] == "object") {
        findAllSizes(object[Object.keys(object)[i]], result);
      }
    }

    return result;
  }

  console.log(result);
  possibleDirs.sort((a, b) => b - a);

  const neededSpace = 70000000 - possibleDirs[0];

  for (let i = 1; i < possibleDirs.length; i++) {
    // next directory is too small
    if (possibleDirs[i + 1] < neededSpace) {
      console.log(possibleDirs[i]);
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
}
