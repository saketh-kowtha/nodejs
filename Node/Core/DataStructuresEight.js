/**
 * Print Calender based on user input passed with CMD args
 */

let args = process.argv.splice(2)

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


if(!args[0] || !args[1] )
    return console.log("Invalid Arguments passed")

if(isNaN(args[1]) || months.indexOf(args[0]) == -1)
    return console.log("Arguments are not in proper formate Example : Jan 2019")

let arr = [
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    []
]


let date = new Date(`${args[0]} ${args[1]}`)

let srtMnthIndex = new Date(`1 ${args[0]} ${args[1]}`).getDay()

for(let i = 1;  ;i++){
    date = new Date(`${i} ${args[0]} ${args[1]}`)
    if( months.indexOf(args[0]) != date.getMonth())
        break
    arr[1].push(i)
}

arr[1].unshift(...Array(srtMnthIndex).fill(" "))

for(let i = 0; i < 2; i++)
    for(let j = 0; j < arr[i].length; j++){
        process.stdout.write(`${arr[i][j]}\t`)
        if((j+1)%7 == 0) 
            console.log("\n")
    }

console.log("\n")
