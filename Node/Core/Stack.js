/**
 * Author : Saketh
 * Class : Stack
 * desctiption : 
 */

class Stack {
    
    constructor(){
        this.list = []
    }

    push(ele){
       this.list.push(ele)
    }

    isEmpty(){
        return this.list.length == 0
    }

    size(){
        return this.list.length 
    }

    peek(){
        return this.list[this.list.length - 1]
    }

    pop(){
        if(this.size() === 0)
            throw Error("Index Out Of Bound")
        this.list.pop()
    }

}


module.exports = Stack