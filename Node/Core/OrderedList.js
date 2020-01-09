const Node = require("./ListNode")

/**
 * Author : Saketh
 * Class : OrderedList
 * desctiption : 
 */

class OrderedList{
    constructor(){
        this.list = null
        this.size = 0
    }

    add(val){
        if(this.search(val)) return
        const node = new Node(val)
        if(this.size === 0)
            this.list = node
        else {
            let head = this.list
            if(head == null || head.element >= node.element){
                node.next = head
                head = node
            }

            let currEle = this.list

            while(currEle.next != null && currEle.next.element < node.element){
                currEle = currEle.next
            }
            node.next = currEle.next
            currEle.next = node
        }
        this.size++
    }

    size(){
        return this.size
    }

    isEmpty(){
        return this.size === 0
    }

    remove(ele){
        if (!this.search(ele)) return
        let currEle = this.list

        if(this.list.element === ele)
            this.list = this.list.next

        while(currEle != null){
            if(currEle.next && currEle.next.element === ele){
                currEle.next = currEle.next.next
                break
            }
            currEle = currEle.next
        }
        this.size--
    }

    search(ele){
        return this.index(ele) > -1
    }

    index(ele){
        let count = 0
        let currEle = this.list
        while(currEle != null)
        {
            if(currEle.element == ele)
                return count
            currEle = currEle.next
            count++
        }
        return -1
    }



    pop(ele){

        if(!ele) {
            this.size--
            const popEle = this.list.element
            this.list = this.list.next
            return popEle
        }

        else if(!this.search(ele) && ele < 0 && ele > this.size) return -1

        else{   
            this.size--
            let srt = this.list
            let currEle = this.list
            let index = 0

            while(index < ele){
                srt = currEle
                currEle = currEle.next
                index++
            }
            srt.next = currEle.next 
            return currEle.element
        }


    }

    toString(){
        let currEle = this.list
        let data = []
        while(currEle != null)
        {
            data.push(currEle.element)
            currEle = currEle.next
        }
        return data.join(" -> ")
    }

    print(){
        let currEle = this.list
        let data = []
        while(currEle != null)
        {
            data.push(currEle.element)
            currEle = currEle.next
        }
        console.log(data.join(" -> "))
        return data.join(" -> ")
    }

    *iterate(){
        let currEle = this.list
        while(currEle != null){
            yield currEle.element
            currEle = currEle.next
        }
    }

}


module.exports = OrderedList
