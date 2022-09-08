const authorModel = require("../Models/authorModel");
const { isValidName, isValidTitle ,isValidEmail,  isValidPassword, } = require("../validator/validator");

const createAuthor = async function (req, res) {
  try {
    let authorDetails = req.body;
    let [fname, lname, title, email, password] = [ authorDetails.fname, authorDetails.lname, authorDetails.title, authorDetails.email, authorDetails.password,];
    
    if (!fname || !lname || !title || !email || !password) {
        return res
        .status(400)
        .send({ status: false, msg: "Please give all required input" });
    }
    
    let [firstname, lastname, Title, Email, Password ] = [ isValidName(fname), isValidName(lname), isValidTitle(title), isValidEmail(email), isValidPassword(password),];

    if (!firstname || !lastname || !Title || !Email || !Password ) {
      return res.status(400).send({ status: false, message: "Enter a valid input" });
    }

    let savedData = await authorModel.create(authorDetails);

    res.status(201).send({ status: true, data: savedData });

  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

module.exports = { createAuthor };
