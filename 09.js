const { readFileSync } = require("node:fs");

const data = readFileSync("./09-test").toString();

let headPositionX = 0;
let headPositionY = 0;
let tailPositionX = 0;
let tailPositionY = 0;

const visitedPositions = [];

data.split("\n").forEach((instruction) => {
  const [direction, magnitude] = instruction.split(" ");

  for (let i = 0; i < parseInt(magnitude); i++) {
    moveHead(direction);
    updateTail();
    const tailPositionString = `${tailPositionX},${tailPositionY}`;
		consol
    if (!visitedPositions.includes(tailPositionString))
      visitedPositions.push(tailPositionString);
  }
});

console.log(visitedPositions.length);

function moveHead(direction) {
  switch (direction) {
    case "R":
      headPositionX++;
      return;
    case "L":
      headPositionX--;
      return;
    case "U":
      headPositionY++;
      return;
    case "D":
      headPositionY--;
      return;
  }
}

function updateTail() {
  if (headPositionX === tailPositionX && headPositionY === tailPositionY)
    return;

  const xDiff = headPositionX - tailPositionX;
  const yDiff = headPositionY - tailPositionY;

  if (xDiff > 1) {
    tailPositionX++;
  }

  if (xDiff < -1) {
    tailPositionX--;
  }

  if (yDiff > 1) {
    tailPositionY++;
  }

  if (yDiff < -1) {
    tailPositionY--;
  }
}
