const HospitalError = require('./HospitalError')


const {VALIDATION_ERROR} = require('./helper')

class Doctor{

     add({name, speclization, avalibility}){
         let to, from, ava = []
        avalibility = avalibility.split(",").map(e => {
            e = e.trim().split("-")
            e.forEach((e2, index) => {
                e2 = e2.trim().split(" ")
                let time = e2[0].split(":")

                if(e2[1] == "PM")
                    time = (parseInt(time[0].trim()) + 12) * 100 + parseInt(time[1].trim())
                else
                    time = (parseInt(time[0].trim())) * 100 + parseInt(time[1].trim())
                if((index + 1) % 2)
                    from = time
                else 
                    to = time
            })
            ava.push(JSON.stringify({from, to}))
        })
        this.constructor.data.push({name, speclization, avalibility:ava, id: "DO" + (new Date()).getTime() % 10000000000})
        console.log("\nDoctor Added Succefully\n")
    }


    static validate(doctor){
        if(!doctor)
            throw new HospitalError(VALIDATION_ERROR + " : Invalid Argument Passed")
        if(!isNaN(doctor.name) || !doctor.name || doctor.name.trim()== "")
            throw new HospitalError(VALIDATION_ERROR + " : Invalid Doctor Name")
        else if( !isNaN(doctor.speclization) || !doctor.speclization || doctor.speclization.trim()== "")
            throw new HospitalError(VALIDATION_ERROR + " : Invalid Doctor Speclization")
        if(typeof doctor.avalibility == "object")
            return true
        let timings = doctor.avalibility && doctor.avalibility.split(",").map(e => e.trim())
        timings.forEach(e => {
            if( !e.match(/^([0-9]{1,2}):([0-9]{2}) (AM|PM) \- ([0-9]{1,2}):([0-9]{2}) (AM|PM)$/))
                throw new HospitalError(VALIDATION_ERROR + " : Invalid Timings")
        })
        return true
    }

}
Doctor.data = []


module.exports = Doctor