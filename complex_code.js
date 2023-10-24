/* complex_code.js */
const fs = require('fs');

// Function to read the contents of a file
function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

// Function to write a string to a file
function writeFile(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Function to transform the text into uppercase
function transformToUpperCase(text) {
  return text.toUpperCase();
}

// Function to find the longest word in a given text
function findLongestWord(text) {
  const words = text.split(' ');
  let longestWord = '';
  
  words.forEach((word) => {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  });

  return longestWord;
}

// Function to count the occurrence of each letter in a given text
function countLetters(text) {
  const lettersCount = {};

  for (let i = 0; i < text.length; i++) {
    const letter = text[i].toLowerCase();

    if (letter.match(/[a-z]/)) {
      if (lettersCount[letter]) {
        lettersCount[letter]++;
      } else {
        lettersCount[letter] = 1;
      }
    }
  }

  return lettersCount;
}

// Main async function
async function main() {
  try {
    // Read the content of input.txt file
    const fileContent = await readFile('input.txt');

    // Transform the content to uppercase
    const upperCaseContent = transformToUpperCase(fileContent);

    // Write the transformed content to output.txt file
    await writeFile('output.txt', upperCaseContent);

    // Find the longest word in the transformed content
    const longestWord = findLongestWord(upperCaseContent);

    console.log('Longest Word:', longestWord);

    // Count the occurrence of each letter in the transformed content
    const letterCount = countLetters(upperCaseContent);

    console.log('Letter Count:', letterCount);

  } catch (err) {
    console.error('Error:', err);
  }
}

main();