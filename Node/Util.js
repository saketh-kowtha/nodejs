const fs = require("fs")
const path = require("path")

  
class Util{
   constructor(){
        // const TIME = new Date()
        
        // const input = []
        // stdin.addListener("data", (d) => {
        //     input.push(d.toString().trim())
        //     if(input.length == 1){
        //         this.constructor.vendingMachine([2000, 1000, 500, 100, 50, 10, 5, 2, 1], 5000)
        //     }
        // });

        // console.log(`Time Elapsed ${((new Date()).getTime() - TIME.getTime() )/ 1000} sec`)
        this.constructor.wordList(["ab"])
    }
   
    //Anagram 
   static anagrams = ([a,b]) =>  a.split("").sort().join() == b.split("").sort().join()
   
    /**
    * Prime Numbers between 0 - 1000 
    */
   static primeNumbers = () => {
        for(let i = 0; i <= 1000; i++){
            let isPrime=true
            for(let j = 2; j <= Math.sqrt(i); j++)
                if(i%j == 0 && i != j)
                    isPrime=false
            console.log(`${i} is ${isPrime ? "" : " Not a"} Prime Number `)
        }
   }

   //Binary Search
   static binarySearch = (list, ele) => {
        let n = parseInt(list.length / 2)
        if(list[n] > ele){
            Util.binarySearch(list.splice(0, n), ele)
        }
        else if(list[n] < ele){
            Util.binarySearch(list.splice(n+1, n), ele)
        }
        else if(list[n] == ele)
            console.log(`${ele}  Found`)
        else
            console.log("Not Found")
   }

   //Insertion Sort
   static insertionSort = (list) => {
        console.log(`Before Sorting : ${list}`)
        for(let i = 0; i < list.length; i++){
            let currEle=list[i]
            let j = i 
            while(j > 0 && currEle < list[j - 1]){
                list[j]=list[j-1]
                j--
            }
            list[j]=currEle
        }
        console.log(`After Sorting : ${list}`)
        return list
   }

   //Bubble Sort
   static bubbleSort = (list) =>{
        let n = list.length
        console.log(`Before Sorting : ${list}`)
        for(let i = 0; i < n; i++)
            for(let j = 0; j < n - i - 1; j++)
                if(list[j]>list[j+1])
                    [list[j], list[j+1]] = [list[j+1], list[j]]
        console.log(`After Sorting : ${list}`)
    }

    //WordList
    static wordList = ([pattern]) => {
        fs.readFile("./words.txt", (err, data) => {
            if(err) throw err
            data = data.toString()
            data = Util.insertionSort(data.split(" "))
            Util.binarySearch(data, pattern)
        })
    } 

    //Vending Machine using recursion
    static vendingMachine = (notes, change) =>{
        if(change == 0)
            return 0
        for(let i = 0 ; i < notes.length; i++)
            if(notes[i] <= change){
                console.log(notes[i])
                return Util.vendingMachine(notes, change - notes[i])
            }    
    }

    //Insertion Sort on strings
    static stringInsertionSort = (str) =>{
        Util.insertionSort(str[0].split(" "))
    }
}



module.exports.Util=Util