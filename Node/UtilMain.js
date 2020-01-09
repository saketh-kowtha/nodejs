const Util = require("./Util").Util
const readline = require('readline');

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function stdin(questionText) {
    return new Promise((resolve, reject) => {
        readlineInterface.question(questionText, (input) => resolve(input) );
    });
}


async function anagrams(){
    let a = await stdin("Enter String 1 : ")
    let b = await stdin("Enter String 2 : ")
    console.log("\nAnagrams\n",Util.anagrams([a, b]))
}

function primeNumbers(){
    console.log("\nPrime Numbers 1 - 1000\n")
    Util.primeNumbers()
}


async function binarySearch(){
    console.log("\IBinary Search \n")
    let list = await stdin("Enter List using ',' : ")
    list = list.split(",").map(e => parseInt(e.trim()))
    let word = await stdin("Enter word  : ")
    Util.binarySearch(list, word)
}

async function insertionSort(){
    console.log("\Insertion Sort Numberic array\n")
    let list = await stdin("Enter List using ',' : ")
    list = list.split(",").map(e => parseInt(e.trim()))
    Util.insertionSort(list)
}

async function insertionSortString(){
    console.log("\Insertion Sort String array\n")
    let list = await stdin("Enter List using ',' : ")
    list = list.split(",").map(e => e.trim())
    Util.bubbleSort(list)
}

async function bubbleSort(){
    console.log("\nBubble Sort Numbers\n")
    let list = await stdin("Enter List using ',' : ")
    list = list.split(",").map(e => parseInt(e.trim()))
    Util.insertionSort(list)
}

async function bubbleSortString(){
    console.log("\nBubble Sort String\n")
    let list = await stdin("Enter List using ',' : ")
    list = list.split(",").map(e => e.trim())
    Util.bubbleSort(list)
}

async function vendingMachine(){
    console.log("\nVending Machine\n")
    let notes = [2000, 1000, 500, 100, 50, 10, 5, 2, 1]
    console.log("Notes are : ", notes)
    let amount = await stdin("Enter Amount : ")
    Util.vendingMachine([2000, 1000, 500, 100, 50, 10, 5, 2, 1], parseInt(amount))
}

async function stringInsertionSort(){
    console.log("\nString Insertion Sort\n")
    let str = await stdin("Enter String   : ")
    Util.stringInsertionSort([str])

}

async function wordList(){
    console.log("\nWord List\n")
    let word = await stdin("Enter Word : ")

    Util.wordList([word])
}

async function main(){
    while(true)
    {
        ["Anagrams", "Prime Numbers 1-1000", "Binary Search", "Insertion Sort", "Insertion Sort String", "Bubble Sort", "Bubble Sort String", "Vending Machine", "String Insertion Sort", "Word List"].forEach((e, index) => console.log(`${index + 1}. ${e}`) )
        let userOps = await stdin("Enter your choice : ")
        switch(userOps){
            case "1": await anagrams()
                    break
            case "2":  primeNumbers()
                    break
            case "3": await binarySearch()
                    break
            case "4": await insertionSort()
                    break
            case "5": await insertionSortString()
                    break
            case "6": await bubbleSort()
                    break
            case "7": await bubbleSortString()
                    break
            case "8": await vendingMachine()
                    break
            case "9": await stringInsertionSort()
                    break
            case "10": await wordList()
                    break
            default : process.exit()
        }
    }
}

main()