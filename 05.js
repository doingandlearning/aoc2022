// import { readFileSync } from "node:fs";
const { readFileSync } = require("node:fs");

const data = readFileSync("./05-input").toString();

const [initialState, moves] = data.split("\n\n");

function parseInitialState(initialState) {
  const rows = initialState.split("\n");

  const positions = rows.at(-1).trim().split(/[ ]+/);
  const result = [];

  for (let i = 0; i < positions.length; i++) {
    const containedArray = [];
    result.push(containedArray);
  }

  for (let i = -2; i >= -rows.length; i--) {
    const matches = rows.at(i)?.match(/([ ]{4}|\[[A-Z]\])/g);
    matches.forEach((match, index) => {
      if (match != "    ") {
        result[index].push(match.replace("[", "").replace("]", ""));
      }
    });
  }
  return result;
}

const state = parseInitialState(initialState);

moves.split("\n").forEach((move) => parseMove(move));

function parseMove(move) {
  const tokens = move.split(" ");
  const amount = parseInt(tokens[1]);
  const from = parseInt(tokens[3]) - 1;
  const to = parseInt(tokens[5]) - 1;
  for (let i = 0; i < amount; i++) {
    const moving = state[from].pop();
    state[to].push(moving);
  }
}

console.log(state.reduce((a, c) => a + c.at(-1), ""));

const part2State = parseInitialState(initialState);
moves.split("\n").forEach((move) => parseMoveReverse(move, part2State));

function parseMoveReverse(move, state) {
  const tokens = move.split(" ");
  const amount = parseInt(tokens[1]);
  const from = parseInt(tokens[3]) - 1;
  const to = parseInt(tokens[5]) - 1;
  const inTransit = [];
  for (let i = 0; i < amount; i++) {
    const moving = state[from].pop();
    inTransit.unshift(moving);
  }
  state[to].push(...inTransit);
}
console.log(part2State.reduce((a, c) => a + c.at(-1), ""));
