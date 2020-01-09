/**
 * Prime Numbers between 1 - 1000 and dividing in an array by range 100
 */

let arr = []
let j = -1
for(let i = 0; i <= 1000; i++){
    if(i%100 == 0 && i  < 1000)
    {
        j++
        if(!arr[j])
            arr[j] = []
    }
    if(isPrime(i))
        arr[j].push(i)

}


function isPrime(num) {
    for(var i = 2; i <= Math.sqrt(num); i++)
      if(num % i === 0) return false;
    return num > 1;
  }

  console.log(arr)