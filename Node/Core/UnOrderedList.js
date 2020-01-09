
const Node = require("./ListNode")

/**
 * Author : Saketh
 * Class : UnOrderedList
 * desctiption : 
 */

class UnOrderedList{
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
            let currNode = node
            currNode.next = this.list
            this.list = currNode
        }
        this.size++
    }

    append(val){
        if(this.search(val)) return
        const node = new Node(val)
        if(this.size === 0)
            this.list = node
        else {
            let currEle = this.list
            while(currEle.next != null)
                currEle = currEle.next
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

    insert(ele, pos){
        if(this.search(ele)) return

        if(pos < 0) return
        else if(pos === 0) return this.add(ele)

        const node = new Node(ele)


        let srt = this.list
        let currEle = this.list
        let index = 0

        while(index < pos){
            srt = currEle
            currEle = currEle.next
            index++
        }
        node.next = currEle
        srt.next = node
        this.size++
    }

    pop(ele){

        if(!ele) {
            const popEle = this.list.element
            this.list = this.list.next
            this.size--

            return popEle
        }

        else if(!this.search(ele) && ele < 0 && ele > this.size) return -1

        else{   
            let srt = this.list
            let currEle = this.list
            let index = 0
            this.size--

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

}

module.exports = UnOrderedList




