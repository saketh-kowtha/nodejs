/**
 * Author : Saketh
 * Class : Dequeue
 * desctiption : 
 */

class Dequeue {
    
    constructor(){
        this.list = []
    }

    addRear = (ele) => this.list.push(ele)

    addFront = (ele) => this.list.unshift(ele)

    removeFront = () => this.list.shift()

    removeRear = () => this.list.pop()

    isEmpty = () => this.list.length == 0

    size = () => this.list.length 

}


module.exports = Dequeue