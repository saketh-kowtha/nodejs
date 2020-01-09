const fs = require("fs")

module.exports.VALIDATION_ERROR = "VALIDATION ERROR"

module.exports.edit = (currentId, newValue, feild, obj) =>{
    obj.data.forEach(element => {
        if(element.id == currentId){
            let currEle = {...element}
            currEle[feild] = newValue
            if(obj.validate(currEle) == true){
                element[feild] = currEle[feild]
                console.log("\nSuccessfully Updated\n")
            }
        }
    });
}

module.exports.deleteObj = (id, obj) => {
    obj.data = obj.data.filter(e => e.id != id)
    console.log("\nSuccesfully Deleted\n")
}

module.exports.search = (query, feild, obj) => {
    if(feild && query)
        return obj.data.filter(e => e[feild] && e[feild] == query )
}

module.exports.writeToFile = (obj) => {
    try{
        fs.writeFileSync("./data.txt", JSON.stringify(obj))
    }
    catch(ex)
    {
        console.log("Error Occured while saving")
    }
}

module.exports.readFromFile = () => {
    try{
        return (fs.readFileSync("./data.txt")).toString()
    }
    catch(ex)
    {
        console.log("Error Occured while getting data from file")
    }
}