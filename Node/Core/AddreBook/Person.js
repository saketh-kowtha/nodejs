const crypto = require("./AddresssBookCrypto")

/**
 * Author : Saketh
 * Class -> Person
 * decription : This method holds user model and validation
 */
class Person{
    constructor({firstName, lastName,address,city,state,zip,phoneNumber}){
        this.firstName = firstName
        this.lastName = lastName
        this.address = address
        this.city = city
        this.state = state
        this.zip = zip
        this.phoneNumber = phoneNumber
        this._id = crypto.genToken()
        this.ts = new Date().getTime()
    }

    validate(){
        if(!isNaN(this.firstName))
            return "Invalid First Name"
        else if(!isNaN(this.lastName))
            return "Invalid Last Name"
        else if(!this.address)
            return "Invalid Address"
        else if(!this.city)
            return "Invalid City Name"
        else if(!this.state)
            return "Invalid State"
        else if(isNaN(this.zip))
            return "Invalid ZIP"
        else if(this.phoneNumber.length != 10 && isNaN(this.phoneNumber))
            return "Invalid Phone Number"
        return "OK"
    }

    toString(){
        return JSON.stringify({
            firstName: this.firstName,
            lastName: this.lastName,
            address: this.address,
            city: this.city,
            state: this.state,
            zip: this.zip,
            phoneNumber: this.phoneNumber,
            _id: this._id
        })
    }

}

module.exports = Person