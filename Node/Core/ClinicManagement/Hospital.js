const Patient = require('./Patient')
const Doctor = require('./Doctor')
const { Select } = require('enquirer');
const stdin = require("./stdin")

const { edit, search, deleteObj, writeToFile, readFromFile } = require("./helper")
/**
 * 
 * Class : Hospital
 * 
 */
class Hospital {

    constructor(name, spec) {
        this.hospitalName = name
        this.speclization = spec
        let data = readFromFile()
        if (data) {
            data = JSON.parse(data)
            Patient.data = data["patients"]
            Doctor.data = data["doctors"]
        }
        console.log(`Welcome To ${this.hospitalName}.\n\nDo you know ${this.hospitalName} is Special for ${this.speclization}.\n\n`)
    }


    async start() {
        let menuChoices = ["Add Doctor", "Add Patient", "Edit Doctor", "Edit Patient", "Delete Doctor", "Delete Patient", "Search Doctor", "Search Patient", "Book Doctor Appoinment", "Print All Patients", "Print All Doctors", "Exit"]

        while (true) {
            const prompt = new Select({
                name: 'choice',
                message: 'Choose any one Operation',
                choices: menuChoices
              });
              let userOpt = null
              try{
                await prompt.run()
                menuChoices.forEach(e => {
                    if(e.enabled == true)
                        userOpt = e.index
                })
             }
              catch(err){
                  throw err
              }

            switch(parseInt(userOpt) + 1) {
                case 1: await this.addDoctor()
                    break
                case 2: await this.addPatient()
                    break
                case 3: await this.update(Doctor)
                    break
                case 4: await this.update(Patient)
                    break
                case 5: await this.delete(Doctor)
                    break
                case 6: await this.delete(Patient)
                    break
                case 7: await this.search(Doctor)
                    break
                case 8: await this.search(Patient)
                    break
                case 9: await this.bookAppoinment()
                    break
                case 10: this.printAll(Patient)
                    break
                case 11: this.printAll(Doctor)
                    break
                default: writeToFile({ doctors: Doctor.data, patients: Patient.data })
                    process.exit()
                    break
            }
        }
    }

    async addPatient() {
        let patient = {}
        patient = await stdin([
            {
              type: 'input',
              name: 'name',
              message: "Enter Your Name"
            },
            {
                type: 'input',
                name: 'mobileNumber',
                message: "Enter Your Number"
              },
              {
                type: 'input',
                name: 'age',
                message: "Enter Your Age"
              },
        ])

        try {
            const _patient = new Patient()
            if (Patient.validate(patient))
                _patient.add(patient)
        }
        catch (ex) {
            console.log(ex.name)
        }
    }

    async addDoctor() {
        let doctor = {}
        doctor = await stdin([
            {
              type: 'input',
              name: 'name',
              message: "Enter Doctor Name : "
            },
            {
                type: 'input',
                name: 'speclization',
                message: "Enter Doctor's Speclization : "
              },
              {
                type: 'input',
                name: 'avalibility',
                message: "Enter Doctors's Avalibility [format : HH:MM AM - HH:MM PM]: "
              },
        ])
        try {
            const _doctor = new Doctor()
            if (Doctor.validate(doctor))
                _doctor.add(doctor)
        }
        catch (ex) {
            console.log(ex.name)
        }
    }

    async update(dataObj) {
        const {id} = await stdin({
            type: 'input',
            name: 'id',
            message: "Enter ID : "
          })
        let searchResult = search(id, "id", dataObj)
        if (searchResult && searchResult.length > 0) {
            const feildNames = Object.keys(dataObj.data[0])
            const {feild} = await stdin({
                type: 'input',
                name: 'feild',
                message: `Enter Feild Name [${feildNames.join(",")}] : `
              })
              console.log(feild)
            if (feildNames.indexOf(feild) > -1) {
                const {value} = await stdin({
                    type: 'input',
                    name: 'value',
                    message: `Enter ${feild} value :  `
                  })
                try {
                    edit(id, value, feild, dataObj)
                }
                catch (ex) {
                    console.log(ex)
                }
            }
        }
        else
            console.log(`No Patient Found with Id ${id}`)
    }

    async delete(obj) {
        const {id} = await stdin({
            type: 'input',
            name: 'id',
            message: "Enter ID : "
          })
        let searchResult = search(id, "id", obj)
        if (searchResult && searchResult.length > 0) {
            deleteObj(id, obj)
        }
        else
            console.log(`No Patient Found with Id ${id}`)
    }


    async search(obj) {
        const feildNames = Object.keys(obj.data[0])
        const {feild} = await stdin({
            type: 'input',
            name: 'feild',
            message: `Enter Feild Name [${feildNames.join(",")}] : `
          })
        if (feildNames.indexOf(feild) > -1) {
            const {value} = await stdin({
                type: 'input',
                name: 'value',
                message: `Enter ${feild} value :  `
              })
            try {
                console.table(search(value, feild, obj))
            }
            catch (ex) {
                console.log(ex)
            }
        }
        else
            console.log(`Invalid Feild Name`)
    }

    async bookAppoinment() {

        let {patientId, doctorId, time} = await stdin([
            {
              type: 'input',
              name: 'patientId',
              message: "Enter Patient ID : "
            },
            {
                type: 'input',
                name: 'doctorId',
                message: "Enter Doctor's ID : "
              },
              {
                type: 'input',
                name: 'time',
                message: "Enter Time [HH:MM AM|PM]: "
              },
        ])

        if (!patientId || search(patientId, "id", Patient).length == 0)
            return console.log("No Patient With that ID")
        if (!doctorId || search(doctorId, "id", Doctor).length == 0)
            return console.log("No Doctor With that ID")
        if (!time || !time.match(/^([0-9]{1,2}):([0-9]{2}) (AM|PM)$/))
            return console.log("Invalid Time")
        time = time.split(" ").map(e => e.trim())
        if (time.length > 2)
            return console.log("Invalid Time Format")

        time = time[1] == "PM" ? (parseInt(time[0].split(":")[0].trim()) + 12) * 100 + parseInt(time[0].split(":")[1].trim()) : (parseInt(time[0].split(":")[0].trim())) * 100 + parseInt(time[0].split(":")[1].trim())

        let doctor = search(doctorId, 'id', Doctor)[0]
        let flag = true
        doctor.avalibility.forEach(ele => {
            let currEle = JSON.parse(ele)
            if (time >= parseInt(currEle.from) && time <= parseInt(currEle.to)) {
                let i = 0
                flag = false
                while (true) {
                    var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * i);
                    var day = currentDate.getDate()
                    var month = currentDate.getMonth() + 1
                    var year = currentDate.getFullYear()
                    let timeSlot = currEle.from + "-" + currEle.to + " " + day + " " + month + " " + year
                    if (!doctor.appoinment) {
                        let app = {}
                        app[timeSlot] = 1
                        edit(doctor.id, app, "appoinment", Doctor)
                        this.printAppoinment(patientId, doctor.name, timeSlot, time)
                        break
                    }
                    else if (doctor.appoinment && !doctor.appoinment[timeSlot]) {
                        let app = doctor.appoinment
                        app[timeSlot] = 1
                        edit(doctor.id, app, "appoinment", Doctor)
                        this.printAppoinment(patientId, doctor.name, timeSlot, time)
                        break
                    }
                    else if (doctor.appoinment && doctor.appoinment[timeSlot] && doctor.appoinment[timeSlot] < 5) {
                        let app = doctor.appoinment
                        app[timeSlot] = app[timeSlot] + 1
                        edit(doctor.id, app, "appoinment", Doctor)
                        this.printAppoinment(patientId, doctor.name, timeSlot, time)
                        break
                    }
                    i++
                    writeToFile({ doctors: Doctor.data, patients: Patient.data })
                }
            }
        })
        if (flag)
            console.log("Doctor is Unavailable at that time")
    }

    printAppoinment(patientId, doctorName, timeSlot, time) {
        timeSlot = timeSlot.split(" ").slice(1)
        console.log(`\n\nHello ${search(patientId, "id", Patient)[0].name} Your Appoinment is booked on ${timeSlot.join("-")} at ${parseInt(time / 100)}:${(time % 100  > 9 ? "": "0") + time % 100}\n\n`)
    }

    printAll(obj) {
        console.table(obj.data)
    }
}


module.exports = Hospital