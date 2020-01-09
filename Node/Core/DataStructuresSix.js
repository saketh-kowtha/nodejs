/**
 * Hash the words which are in a file uing OrderedList 
 */
const fs = require("fs")

var stdin = process.openStdin();

const OrderedList = require("./OrderedList")


const hash = {}

fs.readFile("./Text.txt", (err, data) => {
    if(err) throw err
    data= data.toString()
    data = data.split(/\s+/)
    data.forEach(e => hashing(e))
    stdin.addListener("data", (d) => {
        input = d.toString().trim()
        if(input === "EOF")
        {   
            console.log(hash)
            fs.writeFile("./Text.txt", JSON.stringify(hash), (err, d) => {})
            process.exit()
        }
        else{
            hashing(input)
        }
    })

})

function hashing(input){
    let ip = parseInt(input)
    if(hash[ip % 11]){
        if(hash[ip % 11].search(ip))
            hash[ip % 11].remove(ip)
        else
            hash[ip % 11].add(ip)
    }
    else{
        const ol = new OrderedList()
        ol.add(ip)
        hash[ip % 11] = ol 
    }
}


