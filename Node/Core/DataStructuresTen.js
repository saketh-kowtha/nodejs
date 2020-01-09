const UnOrderedList = require("./UnOrderedList")

//Implementing Stack uing Linked List
class StackList{
    
    constructor(){
        this.list = new UnOrderedList()
    }

    push(ele){
        this.list.add(ele)
    }

    pop(){
        return this.list.pop(0)
    }

    isEmpty(){
        return this.list.isEmpty()
    }

    size(){
        return this.list.size()
    }

    toString(){
        return this.list.toString()
    }
}

//Implementing Queue using Linked List
class QueueList{
    
    constructor(){
        this.stack1 = new StackList()
        this.stack2 = new StackList()
    }

    queue(ele){
        while(!this.stack1.isEmpty())
            this.stack2.push(this.stack1.pop())
        this.stack1.push(ele)
        while(!this.stack2.isEmpty())
            this.stack1.push(this.stack2.pop())
    }

    dequeue(){
        if(this.stack1.isEmpty())
            return -1
        return this.stack1.pop()
    }

    isEmpty(){
        return this.stack1.isEmpty()
    }

    toString(){
        return this.list.toString()
    }
}


module.exports.QueueList = QueueList
module.exports.StackList = StackList