const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'input.txt');
const fileSizeMB = 10;
const bytesPerMB = 1024 * 1024;
const targetSize = fileSizeMB * bytesPerMB;

function divideNumberIntoFourParts(total) {
  let part1, part2, part3, part4;
  do {
    part1 = Math.floor(Math.random() * (total / 4)) + 1;
    part2 = Math.floor(Math.random() * (total / 3)) + 1;
    part3 = Math.floor(Math.random() * (total / 2)) + 1;
    
    while (part2 === part1) {
      part2 = Math.floor(Math.random() * (total / 3)) + 1;
    }
    while (part3 === part1 || part3 === part2) {
      part3 = Math.floor(Math.random() * (total / 2)) + 1;
    }
    
    part4 = total - (part1 + part2 + part3);
  } while (part4 <= 0 || part4 === part1 || part4 === part2 || part4 === part3);
  return [part1, part2, part3, part4];
};

function generateAlphabeticals() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < Math.floor(Math.random() * 11) + 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateRealNumbers() {
  return (Math.random() * (2 * 1e6) - 1e6).toString();
}

function generateIntegers() {
  return Math.floor(Math.random() * (2 * 1e6) - 1e6).toString();
}

function generateAlphanumerics() {
  var result = '';
  var alphanumerics = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var totalSpacesBefore = Math.floor(Math.random() * 11);
  var totalSpacesAfter = Math.floor(Math.random() * totalSpacesBefore);
  for (var i = 0; i < Math.floor(Math.random() * 11) + 5 - (totalSpacesAfter + totalSpacesBefore); i++) {
    result += alphanumerics.charAt(Math.floor(Math.random() * alphanumerics.length));
  }
  var spacesBefore = ' '.repeat(totalSpacesBefore);
  var spacesAfter = ' '.repeat(totalSpacesAfter);
  return "".concat(spacesBefore).concat(result).concat(spacesAfter);
}

function generateDataChunk() {
  return [
    generateAlphabeticals(),
    generateRealNumbers(),
    generateIntegers(),
    generateAlphanumerics()
  ].join(',') + '\n';
}

function generateFile() {
  let writtenSize = 0;
  const writeStream = fs.createWriteStream(filePath, { flags: 'w' });

  function writeChunk() {
    while (writtenSize < targetSize) {
      const chunk = generateDataChunk();
      if (!writeStream.write(chunk)) {
        writeStream.once('drain', writeChunk);
        return;
      }
      writtenSize += Buffer.byteLength(chunk, 'utf8');
    }
    writeStream.end(() => {
      console.log(`File '${filePath}' generated with approximately ${Math.floor(writtenSize/(1024*1024))} MB.`);
    });
  }

  writeChunk();
}

generateFile();
