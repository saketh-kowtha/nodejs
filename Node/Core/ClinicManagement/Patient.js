const HospitalError = require('./HospitalError')
const {VALIDATION_ERROR} = require('./helper')


class Patient{

    add({name, mobileNumber, age}){
        this.constructor.data.push( {name, mobileNumber, age, id: "PA" + (new Date()).getTime() % 10000000000 } )
        console.log("\nPatient Added Succefully\n")
    }

    static validate(patient){
        if(!patient || !isNaN(patient.name) || !patient.name || patient.name.trim()== "")
            throw new HospitalError(VALIDATION_ERROR + " : Invalid Patient Name")
        else if(!patient || isNaN(patient.mobileNumber) || !patient.mobileNumber || patient.mobileNumber.trim()== "")
            throw new HospitalError(VALIDATION_ERROR + " : Invalid Patient Mobile Number")
        else if(!patient || isNaN(patient.age) || !patient.age || patient.age.trim()== "")
            throw new HospitalError(VALIDATION_ERROR + " : Invalid Age")
        return true
    }

}
Patient.data = []


module.exports = Patient