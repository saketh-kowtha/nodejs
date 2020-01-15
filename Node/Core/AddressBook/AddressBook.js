/**
 * Author : Kowtha Saketh
 * File Description : Address Book OOPS MODEL
 */

//importing section
const fs = require("fs")

const crypto = require("./AddresssBookCrypto")

const readline = require('readline');

const Person = require("./Person")

//Creating Sync STDIN
const readlineInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
});

function stdin(questionText) {
    return new Promise((resolve, reject) => {
      readlineInterface.question(questionText, (input) => resolve(input) );
    });
}
  

/**
 * Class -> AddressBook
 * description : AddressBook Application Actions, data is in this class
 */
class AddressBoook{

    constructor(){
        this.addressBook = this.getAddresBooks()
        this.currentAddressBookName = null
    }

    //Start method to start application
    start(){
        this.rootMenu()
    }

    //RootMenu method to display Main root menu 
    async rootMenu(){
        let exitRootMenu = false
        while(!exitRootMenu){
            let userOpt = await stdin("1. Create New AdressBook.\n2. Open Address Book.\n3. List Of Address Books\n4. Exit\n")
            switch(parseInt(userOpt)){
                case 1 : this.newAddressBook()
                        break;
                case 2: this.openAddressBook()
                        exitRootMenu = true
                        break
                case 3: console.table(Object.keys(this.addressBook))
                        break
                default : process.exit() 
            }
        }
    }

    //getAddessBooks -> this method get and return locally saved addressbook data
    getAddresBooks(){
        let data = fs.readFileSync("./data.encrypt")
        data = data.toString()
        try{
            if(data)
                data = crypto.decrypt(data)
        }
        catch(ex){
            console.log(ex)
        }
        return JSON.parse(data || "{}")
    }

    //new addresbook will create new address book based on user input and take user back to main menu
    async newAddressBook(){
        let name = await stdin("Enter Address Book Name : ")
        if(this.addressBook[name])
            console.log(`Address Book with name ${name} is already exist`)
        else{
            this.addressBook[name]=[]
            console.log(`Created Successfully`)
        }
        this.rootMenu()
    }

    //openaddress book will open user selected addressbook if not existed throws error message
    async openAddressBook(){
        let name = await stdin("Enter Address Book Name : ")
        if(this.addressBook[name]){
            this.currentAddressBookName = name
            let isExitAddressBook = false
            while(!isExitAddressBook){
                let userOpt = await stdin("\n1. Add New Addres.\n2. Edit Address.\n3. Delete Address \n4. Sort By Name\n5. Sort By Zip\n6. Display All\n7. Save\n8. Back to Root Menu\n9. Quit.\n")
                switch(parseInt(userOpt)){
                    case 1 : await this.addNewContact()
                            break;
                    case 2: await this.editContact()
                            break
                    case 3: console.log(this.deleteContact(await stdin("Enter Id : ")))
                            break
                    case 4: this.sortByName()
                            break
                    case 5: this.sortByZip()
                            break
                    case 6: this.displayContacts()
                            break
                    case 7: this.saveAddressBook()
                            break
                    case 8: isExitAddressBook = true
                            this.rootMenu()
                            break
                    default : process.exit() 
                }
            }
        }
        else{
            console.log(`No Address Book with name ${name}`)
            this.rootMenu()

        }
        this.rootMenu()
    }

    //SaveAddressBook will save modified data locally
    saveAddressBook(){
        fs.writeFile("./data.encrypt", crypto.encrypt(JSON.stringify(this.addressBook)), (err, data) => {
            if(err) throw err
            console.log("Saved Successfully")
        })
    }

    //addNewContact will add new user to addressbook
    async addNewContact(){
        const firstName = await stdin("Enter First Name : ")
        const lastName = await stdin("Enter Last Name : ")
        const address = await stdin("Enter Address : ")
        const city = await stdin("Enter City : ")
        const state = await stdin("Enter State : ")
        const zip = await stdin("Enter ZIP : ")
        const phoneNumber = await stdin("Enter Phone Number : ")
        let contact = new Person({firstName, lastName,address,city,state,zip,phoneNumber})
        if(contact.validate() != "OK")
            console.log(contact.validate())
        else{
            this.addressBook[this.currentAddressBookName].push(contact)
            console.log("Record Added Successfully")
        }
    }

    //Edit Contact will edit the contact based on user query
    async editContact(){
        const id = await stdin("Enter ID : ")
        let contact = this.getContact(id)
        if(!contact)
        {
            console.log("Invalid User ID")
            this.editContact()
        }
        const menu = ["First Name", "Last Name", "Address", "City", "State", "Zip", "Phone Number"]
        menu.forEach((e, index) => console.log(`${index + 1}. ${e}`) )
        const feild = await stdin("Enter Feild : ")
        if(contact[feild]){
            const value = await stdin("Enter Value : ")
            contact[feild] = value
            const updatedContact = new Person(contact)
            if(updatedContact.validate() == "OK"){
                this.deleteContact(id)
                this.addressBook[this.currentAddressBookName].push(updatedContact)
                console.log("Contact Updated Successfully")
            }
            else{
                console.log(updatedContact.validate())
                await this.editContact()
            }
        }
        else{
            console.log("No Such Feild Try again")
            this.editContact()
        }
    }

    //Thi is internal method like helper used to fetch specfic record based on query
    getContact(query){
        let record = null
        this.addressBook[this.currentAddressBookName].forEach(element => {
            if(element._id == query)
                record = element
        });
        return record
    }

    //This method will display all contacts in address book
    displayContacts(ele){
        if(!ele)
            ele=this.addressBook[this.currentAddressBookName]
        const modified = JSON.parse(JSON.stringify(ele))
        console.table(modified.map(e => { e.note = getTime(e.ts); delete e.ts;return e}))
    }

    //sortByName will sort address based on name
    sortByName(){
        const tempList = [...this.addressBook[this.currentAddressBookName]]
        this.displayContacts(tempList.sort((a, b) => a.firstName[0] > b.firstName[0] ? 0 : -1))
    }

    //sortByName will sort address based on Zip
    sortByZip(){
        const tempList = [...this.addressBook[this.currentAddressBookName]]
        this.displayContacts(tempList.sort((a, b) => parseInt(a.zip) - parseInt(b.zip)))
    }

    //This method will Delete contacts
    deleteContact(query){
        this.addressBook[this.currentAddressBookName] = this.addressBook[this.currentAddressBookName].filter(e => e._id != query)
        return "SuccessFully Deleted"
    }

}


function getTime(ele){
    var datePast = new Date(ele);
    var dateNow = new Date();
    
    var seconds = Math.floor((dateNow - (datePast))/1000);
    var minutes = Math.floor(seconds/60);
    var hours = Math.floor(minutes/60);
    var days = Math.floor(hours/24);
    return `${days}Day ${hours - days * 24} Hours ${minutes - hours * 60} Minutes ${seconds - minutes * 60} Seconds` 
}



module.exports = AddressBoook