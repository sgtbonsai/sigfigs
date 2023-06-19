const readline = require('readline');

// terminal thing (ignore)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// count the number of sig figs
function countSignificantFigures(number) {
  const numString = String(number).replace(/[^0-9.eE+-]/g, ''); // remove things that aren't numbers
  const decimalIndex = numString.indexOf('.');

  let significantFigures = 0;
  let countZeros = false;

  for (let i = 0; i < numString.length; i++) {
    const char = numString[i];

    if (char === '.' || char === 'e' || char === 'E' || char === '+' || char === '-') {
      continue;
    }

    if (char === '0') {
      if (significantFigures > 0 || countZeros || i > decimalIndex) {
        countZeros = true;
        significantFigures++;
      }
    } else {
      significantFigures++;
      countZeros = false;
    }
  }

  return significantFigures;
}

// start
function startProgram() {
  rl.question('> Enter a number: ', (input) => {
    const number = Number(input);

    if (isNaN(number)) {
      console.log('Please input a valid number.');
      restartProgram();
    } else {
      const result = countSignificantFigures(number);
      console.log(`> Number of significant figures: ${result}`);
      console.log("> Developed by Leo Tran on June 19, 2023");
      rl.close();
    }
  });
}

// restart of NaN detected
function restartProgram() {
  startProgram();
}

startProgram();