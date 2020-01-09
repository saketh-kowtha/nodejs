
/**
 * Author : Saketh
 * Class : Queue
 * desctiption : 
 */

class Queue {
    
    constructor(){
        this.list = []
    }

    enqueue(ele){
       this.list.push(ele)
    }

    dequeue(){
        return this.list.shift()
    }

    isEmpty(){
        return this.list.length == 0
    }

    size(){
        return this.list.length 
    }



}


module.exports = Queue