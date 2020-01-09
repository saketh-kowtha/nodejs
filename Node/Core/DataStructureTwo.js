/**
 * Get all words from file and store in OrderedList ask user to search for a word if found delete it else add it to list
 */
const fs = require("fs")

var stdin = process.openStdin();


const OrderedList = require("./OrderedList")

fs.readFile("./Text.txt", (err, data) => {
    if(err) throw err
    data = data.toString()
    data = data.split(/\s+/);
    const ol = new OrderedList()
    data.forEach(e => {if(e && e.length != 0) ol.add(e.trim())})
        
        stdin.addListener("data", (d) => {
            input = d.toString().trim()
            if(input === "EOF")
            {
                fs.writeFile("./Text.txt", ol, (err, data) => {
                    if(err) throw err
                    process.exit()
                })
            }
            else{
                if(ol.search(input))
                    ol.remove(input)
                else
                    ol.add(input)
                console.log(ol)
            }
        });

    
})