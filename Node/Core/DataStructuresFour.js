const crypto = require("crypto")

const Queue = require("./Queue")

var stdin = process.openStdin();

console.log("Enter Your Choice \n1. Deposit \n2. Withdraw\n3. Exit")

const withDraw = new Queue()

const depoit = new Queue()



stdin.addListener("data", (d) => {
    input = d.toString().trim()
    if(input === "3")
    {
        while(!depoit.isEmpty()){
            console.log(`Enter Amount to deposit (${depoit.dequeue()}) : ${Math.floor(Math.random() * 10000)} rs`)
        }

        while(!withDraw.isEmpty()){
            console.log(`Enter Amount to withdraw (${withDraw.dequeue()}) : ${Math.floor(Math.random() * 10000)} rs`)
        }
        process.exit()
    }
    else{
        const token = crypto.randomBytes(8).toString('hex');
        console.log(`Your Token Id is ${token}`)
        switch(input){
            case "1":
                depoit.enqueue(token)
                break
            case "2":
                withDraw.enqueue(token)
                break
        }
    }
    console.log("Enter Your Choice \n1. Deposit \n2. Withdraw\n3. Exit ")

})