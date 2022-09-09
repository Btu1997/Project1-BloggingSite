const mongoose = require("mongoose")

const isValidName = function(body) {
    const nameRegex = /^[a-zA-Z0-9_ ]*$/
    return nameRegex.test(body)
}

const isValidTitle = function(title){
    return["Mr", "Mrs", "Miss"].indexOf(title) !== -1
}

const isValidPassword = function(Password){
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    return passRegex.test(Password) 
}

const isValidTag = function(title){
    return["Book", "Friends", "Self help"].indexOf(title) !== -1
}

const isValidAuthorId = function(title){
    return mongoose.isValidObjectId(title)
}

const isValidEmail = function(email){
        return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email);

}

module.exports={isValidName, isValidTitle, isValidEmail, isValidPassword , isValidTag , isValidAuthorId };
