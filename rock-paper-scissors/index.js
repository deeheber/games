const inquirer = require('inquirer');

(async function main () {
  const score = { computer: 0, user: 0, tie: 0 };
  let prompt;
  let computer;

  do {
    prompt = await inquirer
      .prompt([{
        type: 'list',
        name: 'user',
        message: 'What will it be?',
        choices: ['rock', 'paper', 'scissors']
      }]);

    const { user } = prompt;
    computer = getComputerChoice();
    const winner = calculateWinner(user, computer);

    score[winner]++;

    prompt = await inquirer
      .prompt([{
        type: 'confirm',
        name: 'playAgain',
        message: 'Would you like to play again?',
        default: true
      }]);
  } while (prompt.playAgain);

  console.log('Thanks for playing!');
  // TODO add formatting here
  console.log(score);
})();

function getComputerChoice () {
  // random number between 0 - 2
  const randomNum = Math.floor(Math.random() * Math.floor(3));

  switch (randomNum) {
    case 0:
      return 'rock';
    case 1:
      return 'paper';
    default:
      return 'scissors';
  }
}

function calculateWinner (user, computer) {
  // TODO color the output
  console.log(`You picked: ${user}`);
  console.log(`Computer picked: ${computer}`);

  if (user === 'rock') {
    if (computer === 'rock') {
      console.log('It\'s a tie!');
      return 'tie';
    }

    if (computer === 'paper') {
      console.log('Paper covers rock.');
      return 'computer';
    }

    if (computer === 'scissors') {
      console.log('Rock smashes scissors.');
      return 'user';
    }
  }

  if (user === 'scissors') {
    if (computer === 'scissors') {
      console.log('It\'s a tie!');
      return 'tie';
    }

    if (computer === 'paper') {
      console.log('Scissors cuts paper.');
      return 'user';
    }

    if (computer === 'rock') {
      console.log('Rock smashes scissors.');
      return 'computer';
    }
  }

  if (user === 'paper') {
    if (computer === 'paper') {
      console.log('It\'s a tie!');
      return 'tie';
    }

    if (computer === 'rock') {
      console.log('Paper covers rock.');
      return 'user';
    }

    if (computer === 'scissors') {
      console.log('Scissors cuts paper.');
      return 'computer';
    }
  }

  throw new Error('Unrecognized choice.');
}
