const readline = require('readline');
const { prompt } = require('enquirer');

//Creating Sync STDIN
const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function stdin(questionText) {
    // return new Promise((resolve, reject) => {
    //     readlineInterface.question(questionText, (input) => resolve(input) );       
    // });

    return await prompt(questionText)
}

module.exports = stdin

