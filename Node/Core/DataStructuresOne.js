/**
 * Get all words from file and store in UnorderedList ask user to search for a word if found delete it else add it to list
 */

const fs = require("fs")

var stdin = process.openStdin();


const UnOrderedList = require("./UnOrderedList")

fs.readFile("./Text.txt", (err, data) => {
    if(err) throw err
    data = data.toString()
    data = data.split(/\s+/);
    const ul = new UnOrderedList()
    data.forEach(e => {if(e && e.length != 0) ul.add(e.trim())})
        
        stdin.addListener("data", (d) => {
            input = d.toString().trim()
            if(input === "EOF")
            {
                fs.writeFile("./Text.txt", ul, (err, data) => {
                    if(err) throw err
                    process.exit()
                })
            }
            else{
                if(ul.search(input))
                    ul.remove(input)
                else
                    ul.add(input)
            }
        });

    
})