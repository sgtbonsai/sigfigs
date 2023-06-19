const readline = require('readline');

// terminal thing (ignore)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// count the number of sig figs
function countSignificantFigures(number) {
  const numString = String(number).replace(/^-/, ''); // remove the negative sign
  const decimalIndex = numString.indexOf('.');
  
  let significantFigures = 0;
  let countZeros = false;

  for (let i = 0; i < numString.length; i++) {
    const char = numString[i];
    
    if (char === '.' || char === 'e') {
      continue;
    }
    
    if (char === '0') {
      if (significantFigures > 0) {
        countZeros = true;
      }
    } else {
      significantFigures++;
      countZeros = false;
    }
    
    if (countZeros && decimalIndex !== -1 && i > decimalIndex) {
      break;
    }
  }

  return significantFigures;
}

// enter a number
rl.question('> Enter a number: ', (number) => {
  const result = countSignificantFigures(number);
  console.log(`> Number of significant figures: ${result}`);
  console.log("> Developed by BonsaiSgt on June 19, 2023")
  
  rl.close();
});