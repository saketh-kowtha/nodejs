//Prime numbers that are anagrams using queue

const Util = require("../Util").Util
const QueueList = require("./DataStructuresTen").QueueList


const queue = new QueueList()
let arr = [[]]
for(let i = 0; i <= 1000; i++){
    if(isPrime(i)){
        arr[0].push(i)
    }
}


for(let i = 0; i <= 1000; i++){
    for(j = 0; j < arr[0].length; j++){
        if(Util.anagrams([arr[0][i]+"", arr[0][j]+""]) && i!=j)
            queue.queue(arr[0][i])
    }
}


function isPrime(num) {
    for(var i = 2; i <= Math.sqrt(num); i++)
      if(num % i === 0) return false;
    return num > 1;
}


while(!queue.isEmpty()){
    console.log(queue.dequeue())
}