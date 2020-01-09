//Pallidrome using Dequeue

const fs = require("fs")


const Dequeue = require("./Dequeue")

const str = "madam"

const ql = new Dequeue()
for(let i=0; i < str.length; i++ ){
    ql.addFront(str[i])
}

while(ql.size() && ql.removeRear() == ql.removeFront());
console.log(ql.size() == 0)
