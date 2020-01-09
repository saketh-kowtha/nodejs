//Find number of Binary search trees can be formed using given n nodes

function bin(n){
    return fact(2 * n) / (fact(n+1) * fact(n)) 
}

function fact(n){
    const memCache = {}
    if(memCache[n])
        return memCache
    if(n == 1) return 1
    memCache[n] = n * fact(n - 1)
    return memCache[n]
}

console.log(bin(1))
console.log(bin(2))
console.log(bin(3))
console.log(bin(4))
console.log(bin(10))
console.log(bin(20))
console.log(bin(30))
console.log(bin(40))
