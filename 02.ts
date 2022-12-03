import { readFileSync } from "node:fs";

const data = readFileSync("./02-input").toString();

type Opp = "A" | "B" | "C";
type Me = "X" | "Y" | "Z";

const rounds = data.split("\n") as Array<`${Opp} ${Me}`>;

let score = 0;

rounds.forEach((round) => {
  const [opponent, me] = round.split(" ");

  const choiceScore = me === "X" ? 1 : me === "Y" ? 2 : 3;
  const outcomeScore = getScore(opponent as Opp, me as Me);
  score += choiceScore + outcomeScore;
});

console.log("Current score is: ", score);

// Opp A = Rock, B = Paper, C = Scissors
// Me X = Rock, Y = Paper, C = Scissors
function getScore(opp: Opp, me: Me): 0 | 3 | 6 {
  if (opp === "A") {
    if (me === "X") {
      return 3;
    } else if (me === "Y") {
      return 6;
    } else return 0;
  } else if (opp === "B") {
    if (me === "X") {
      return 0;
    } else if (me === "Y") {
      return 3;
    } else return 6;
  } else {
    if (me === "X") {
      return 6;
    } else if (me === "Y") {
      return 0;
    } else return 3;
  }
}

let newScore = 0;

rounds.forEach((round) => {
  const [opponent, me] = round.split(" ");

  const move = chooseMove(opponent as Opp, me as Me);
  const choiceScore = move === "X" ? 1 : move === "Y" ? 2 : 3;
  const outcomeScore = getScore(opponent as Opp, move);
  newScore += choiceScore + outcomeScore;
});

console.log("The new score is: ", newScore);

// Opp A = Rock, B = Paper, C = Scissors
// Me X = Lose, Y = Draw, Z = Lose
function chooseMove(opp: Opp, me: Me): Me {
  if (opp === "A") {
    if (me === "X") {
      return "Z";
    } else if (me === "Y") {
      return "X";
    } else return "Y";
  } else if (opp === "B") {
    if (me === "X") {
      return "X";
    } else if (me === "Y") {
      return "Y";
    } else return "Z";
  } else {
    if (me === "X") {
      return "Y";
    } else if (me === "Y") {
      return "Z";
    } else return "X";
  }
}
