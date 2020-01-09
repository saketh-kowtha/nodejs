class HospitalError extends Error{
    constructor(msg){
        super(msg)
        this.name = msg
    }
}

module.exports = HospitalError