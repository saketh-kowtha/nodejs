//Prime anagrams using Stack
const Util = require("../Util").Util
const StackList = require("./DataStructuresTen").StackList


const stack = new StackList()
let arr = [[]]
for(let i = 0; i <= 1000; i++){
    if(isPrime(i)){
        arr[0].push(i)
    }
}


for(let i = 0; i <= 1000; i++){
    for(j = 0; j < arr[0].length; j++){
        if(Util.anagrams([arr[0][i]+"", arr[0][j]+""]) && i!=j)
            stack.push(arr[0][i])
    }
}


function isPrime(num) {
    for(var i = 2; i <= Math.sqrt(num); i++)
      if(num % i === 0) return false;
    return num > 1;
}


while(!stack.isEmpty()){
    console.log(stack.pop())
}