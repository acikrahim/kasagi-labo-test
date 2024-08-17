const fs = require('fs');
const path = require('path');

const FILE_NAME = 'input.txt';
const OUTPUT_FILE = 'output/ouput.txt';

function checkType(obj) {
  if (/^\d+\.\d+$/.test(obj)) {
    return 'real';
  } else if (/^\d+$/.test(obj)) {
    return 'integer';
  } else if (/^[a-zA-Z]+$/.test(obj)) {
    return 'alphabetical';
  } else {
    return 'alphanumeric';
  }
}

function removeSpaces(obj) {
  obj = obj.trim();
  const type = checkType(obj);
  return `Object: '${obj}', Type: ${type}`;
}

function readFile(fileName) {
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err}`);
      return;
    }

    const objects = data.split(',').map(item => item.trim());
    const output = objects.map(removeSpaces).join('\n');

    fs.writeFile(OUTPUT_FILE, output, err => {
      if (err) {
        console.error(`Error writing output file: ${err}`);
      } else {
        console.log(`Output written to '${OUTPUT_FILE}'`);
      }
    });
  });
}

readFile(path.join(__dirname, FILE_NAME));
