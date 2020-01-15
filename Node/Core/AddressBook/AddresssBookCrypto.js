const crypto = require("crypto")

const KEY = "SECRET_KEY_KEEP_IT_SECRET"

//Method to Encrypt
module.exports.encrypt = (text) =>{
    var cipher = crypto.createCipher('aes-256-cbc',KEY)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}
  
//Method to decrypt
module.exports.decrypt = (text) => {
    var decipher = crypto.createDecipher('aes-256-cbc',KEY)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}

let counter = 0

//Method to generate 5 chars random number 
module.exports.genToken = () => {
    const token = crypto.randomBytes(4).toString('hex');
    return token.toLocaleUpperCase() + (counter++)
}
