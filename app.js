// COMPLETED: Import required modules
// Hint: You will need the 'fs' module for reading the file and the 'chalk' library for coloring the words.
const fs = require('fs');
const chalk = require('chalk');

/**
 * Synchronously reads the content of 'declaration.txt'.
 * @returns {string} The content of the file.
 */
function readFileContent() {
    // COMPLETED: Use the 'fs' module to synchronously read the content of 'declaration.txt' and return it.
    try {
        // Read file synchronously
        const data = fs.readFileSync('declaration.txt', 'utf8');
        return data;
    } catch (err) {
        console.error('Error reading file:', err);
        return null;
    }
}

/**
 * Gets the word count from the content.
 * @param {string} content The file content.
 * @returns {Object} An object with words as keys and their occurrences as values.
 */
function getWordCounts(content) {
    // TODO: Implement a function to count occurrences of each word in the content.
    // Hint: Consider splitting the content into words and then tallying the counts.
    const wordCount = {};  // Using a plain object instead of Map

    // Improved regex to handle words with apostrophes (e.g., "it's", "you're")
    const words = content.toLowerCase().match(/\b\w+(?:'\w+)?\b/g) || [];

    words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });

    return wordCount;

}

/**
 * Colors a word based on its frequency.
 * @param {string} word The word to be colored.
 * @param {number} count The frequency of the word.
 * @returns {string} The colored word.
 */
function colorWord(word, count) {
    // COMPLETED: Return the word colored based on its frequency using the 'chalk' library.
    // For example: 
    // - Words that occur once can be blue
    // - Words that occur between 2 and 5 times can be green
    // - Words that occur more than 5 times can be red
    if (count === 1) {
        return chalk.blue(word);  // Words occurring once -> blue
    } else if (count >= 2 && count <= 5) {
        return chalk.green(word); // Words occurring 2 to 5 times -> green
    } else {
        return chalk.red(word);   // Words occurring more than 5 times -> red
    }
}

/**
 * Prints the first 15 lines of the content with colored words.
 * @param {string} content The file content.
 * @param {Object} wordCount The word occurrences.
 */
function printColoredLines(content, wordCount) {
    const lines = content.split('\n').slice(0, 15);

    for (const line of lines) {
        const coloredLine = line.split(/\W+/).map(word => {
            // TODO: Color the word based on its frequency using the 'colorWord' function.
            if (!word) return ''; // Handle empty splits
            const count = wordCount[word.toLowerCase()] || 0; // Normalize to lowercase
            return colorWord(word, count);
        }).join(' ');

        console.log(coloredLine);
    }
}

/**
 * Main function to read the file, count the word occurrences and print the colored lines.
 */
function processFile() {
    const content = readFileContent();
    const wordCount = getWordCounts(content);
    printColoredLines(content, wordCount);
}

if (require.main === module) {
    // This will execute only if the file is run directly.
    processFile();
}

// TODO: Export the functions for testing
// Hint: You can use the 'module.exports' syntax.
module.exports = {
    readFileContent,
    getWordCounts,
    colorWord,
    printColoredLines,
    processFile
};
