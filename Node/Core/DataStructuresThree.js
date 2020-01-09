//Checking Infix equation is balanced or not

const fs = require("fs")

var stdin = process.openStdin();


const Stack = require("./Stack")

stdin.addListener("data", (d) => {
    input = d.toString().trim()
    if(input === "EOF")
    {
        
            process.exit()
    }
    else{
        const stack = new Stack()
        let invalid = false
        for(let i = 0; i < input.length; i++){
            if(input[i] == "(")
                stack.push("(")
            if(input[i] == ")")
                try{
                    stack.pop()
                }
                catch(ex){
                    invalid = true
                }
        }
        console.log(stack.isEmpty() && !invalid)
    }
})