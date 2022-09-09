const authorModel = require("../Models/authorModel");


const createAuthor = async function (req, res) {
  try {
    let authorDetails = req.body;


    let savedData = await authorModel.create(authorDetails);

    res.status(201).send({ status: true, data: savedData });

  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

module.exports = { createAuthor };
