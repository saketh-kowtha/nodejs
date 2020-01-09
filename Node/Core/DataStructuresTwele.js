//Prime anagrams using 2D array
const Util = require("../Util").Util


let arr = [[],[]]
for(let i = 0; i <= 1000; i++){
    if(isPrime(i)){
        arr[0].push(i)
    }
}


for(let i = 0; i <= 1000; i++){
    for(j = 0; j < arr[0].length; j++){
        if(Util.anagrams([arr[0][i]+"", arr[0][j]+""]) && i!=j && arr[1].indexOf(arr[0][i]) == -1)
            arr[1].push(arr[0][i])
    }
}

arr[0] = arr[0].filter(e => arr[1].indexOf(e) == -1)

function isPrime(num) {
    for(var i = 2; i <= Math.sqrt(num); i++)
      if(num % i === 0) return false;
    return num > 1;
}


console.log(JSON.stringify(arr[0]), "\n")
console.log(JSON.stringify(arr[1]))