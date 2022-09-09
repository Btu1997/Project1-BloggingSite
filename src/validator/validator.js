const mongoose = require("mongoose")
const authorModel = require("../Models/authorModel");

////////////////////////////////////////////////////    Function for Validation      ////////////////////////////////////////////////////////////////////////

const isValidName = function(body) {
    const nameRegex = /^[a-zA-Z_ ]*$/

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




///////////////////////////////////////////////////////    Author Validation      ////////////////////////////////////////////////////////////////////////



const authorValidation = async function(req, res, next){
    let authorDetails = req.body;
    let {fname, lname, title, email, password} = {...authorDetails}

    if (!fname ) {
        return res
        .status(400)
        .send({ status: false, msg: "fname is required" });
    }

    if (!lname ) {
        return res
        .status(400)
        .send({ status: false, msg: "lname is required" });
    }
    if ( !title ) {
        return res
        .status(400)
        .send({ status: false, msg: "title is required" });
    }
    if ( !email ) {
        return res
        .status(400)
        .send({ status: false, msg: "email is required" });
    }
    if ( !password ) {
        return res
        .status(400)
        .send({ status: false, msg: "password is required" });
    }
    
    let [firstname, lastname, Title, Email, Password ] = [ isValidName(fname), isValidName(lname), isValidTitle(title), isValidEmail(email), isValidPassword(password),];
    
    if (!firstname ) {
      return res.status(400).send({ status: false, message: "Enter valid firstname" });
    }

    if ( !lastname ) {
      return res.status(400).send({ status: false, message: "Enter valid lastname" });
    }

    if ( !Title  ) {
      return res.status(400).send({ status: false, message: "Enter valid Title" });
    }

    if ( !Email ) {
        return res.status(400).send({ status: false, message: "Enter valid Email" });
    }

    const isEmailAlreadyUsed = await authorModel.findOne({ email }); 

    if (isEmailAlreadyUsed) {
        return res.status(400).send({ status: false, message: `email address is already registered` })
    }
    

    if ( !Password ) {
      return res.status(400).send({ status: false, message: "Enter valid Password" });
    }

    next()
}





///////////////////////////////////////////////////////    Blogs Validation      ////////////////////////////////////////////////////////////////////////



const blogsValidation = async function(req, res, next){
    let blogDetails = req.body;
    let {title, body, authorId, tags, category} = {...blogDetails}

    if (!title ) {
        return res
        .status(400)
        .send({ status: false, msg: "title is required" });
    }

    if (!body ) {
        return res
        .status(400)
        .send({ status: false, msg: "body is required" });
    }
    if ( !authorId ) {
        return res
        .status(400)
        .send({ status: false, msg: "authorId is required" });
    }
    if ( !tags ) {
        return res
        .status(400)
        .send({ status: false, msg: "tags is required" });
    }
    if ( !category ) {
        return res
        .status(400)
        .send({ status: false, msg: "category is required" });
    }
    
    let [Title, Body, AuthorId, Tags, Category] = [ isValidName(title), isValidName(body), isValidAuthorId(authorId), isValidTag(tags), isValidName(category),];
    
    if (!Title ) {
      return res.status(400).send({ status: false, message: "Enter valid Title" });
    }

    if ( !Body ) {
      return res.status(400).send({ status: false, message: "Enter valid Body" });
    }

    if ( !AuthorId  ) {
      return res.status(400).send({ status: false, message: "Enter valid AuthorId" });
    }

    if ( !Tags ) {
        return res.status(400).send({ status: false, message: "Enter valid Tags" });
    }

    if ( !Category ) {
      return res.status(400).send({ status: false, message: "Enter valid Category" });
    }

    next()
}





module.exports={  authorValidation , blogsValidation };

