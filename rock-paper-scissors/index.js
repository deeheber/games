const inquirer = require('inquirer');
const { red, yellow, green } = require('chalk');

(async function main () {
  const score = { computer: 0, user: 0, tie: 0 };
  let rounds = 0;
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
    rounds++;

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
  console.log('Final Score');
  console.log('------------------');
  console.log(`Computer: ${score.computer}`);
  console.log(`You: ${score.user}`);
  console.log(`Tie: ${score.tie}`);
  console.log(`Total rounds played: ${rounds}`);

  if (score.user > score.computer) {
    console.log('-------------------');
    console.log(green('Congratulations, you won overall!'));
  }

  if (score.computer > score.user) {
    console.log(red('Sorry, the computer beat you. Better luck next time.'));
  }

  if (score.computer === score.user) {
    console.log(yellow('It was a tie overall.'));
  }
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
      console.log(yellow('It\'s a tie!'));
      return 'tie';
    }

    if (computer === 'paper') {
      console.log(red('Paper covers rock.'));
      return 'computer';
    }

    if (computer === 'scissors') {
      console.log(green('Rock smashes scissors.'));
      return 'user';
    }
  }

  if (user === 'scissors') {
    if (computer === 'scissors') {
      console.log(yellow('It\'s a tie!'));
      return 'tie';
    }

    if (computer === 'paper') {
      console.log(green('Scissors cuts paper.'));
      return 'user';
    }

    if (computer === 'rock') {
      console.log(red('Rock smashes scissors.'));
      return 'computer';
    }
  }

  if (user === 'paper') {
    if (computer === 'paper') {
      console.log(yellow('It\'s a tie!'));
      return 'tie';
    }

    if (computer === 'rock') {
      console.log(green('Paper covers rock.'));
      return 'user';
    }

    if (computer === 'scissors') {
      console.log(red('Scissors cuts paper.'));
      return 'computer';
    }
  }

  throw new Error('Unrecognized choice.');
}
