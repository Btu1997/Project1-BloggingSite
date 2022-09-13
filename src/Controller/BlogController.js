const authourModel = require("../Models/authorModel");
const blogModel = require("../Models/blogModel");
const mongoose = require("mongoose");
const moment = require("moment");
const jwt = require("jsonwebtoken");


const createBlog = async function (req, res) {
  try {
    let data = req.body;
    let CurrentDate = moment().format("DD MM YYYY hh:mm:ss");

    let authorDetails = await authourModel.findById(data["authorId"]);

    if (!authorDetails) {
      return res
        .status(400)
        .send({ status: false, msg: " author is not present." });
    }

    if (data["isPublished"] == true) {
      data["publishedAt"] = CurrentDate;
    }
    if (data["isdeleted"] == true) {
      data["deletedAt"] = CurrentDate;
    }

    let savedData = await blogModel.create(data);
    res.status(201).send({ status: true, data: savedData });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};


const getBlogs = async function (req, res) {
  try {
    let filter = req.query;

    if (Object.keys(filter) == 0) {
      return res.status(404).send({ status: false, msg: "Provide a valid input" });
    }
    
    let getBlogsDetails = await blogModel.find({
      $and: [filter, { isdeleted: false, isPublished: true }],
    });

    if (!getBlogsDetails[0]) {
      return res
        .status(404)
        .send({ status: false, msg: " Blog is not present." });
    }
    return res.status(200).send({ status: true, data: getBlogsDetails });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

const updateBlogs = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let dataForUpdate = req.body;
    let tokensId = req.decodedToken.userId;
    let {title, body, tags, subcategory} = {...dataForUpdate}

    let CurrentDate = moment().format("DD MM YYYY hh:mm:ss");

    if (!mongoose.isValidObjectId(blogId)) {
      return res
        .status(400)
        .send({ status: false, error: "blogId is invalid" });
    }

    if (Object.keys(dataForUpdate) == 0) {

      return res.status(404).send({ status: false, msg: "Provide a input to update" });
    }
    let blog = await blogModel.findOne({_id : blogId})
    
    if (blog.authorId.toString() !== tokensId) {
      return res
        .status(401)
        .send({ status: false, message: `Unauthorized access` });
    }

    let updateBlog = await blogModel.findOneAndUpdate(
      { _id: blogId, isPublished: false, isdeleted: false },
      {
        $push: { tags: tags, subcategory: subcategory },

        $set: {
          title: title,
          body: body,
          isPublished: true,
          publishedAt: CurrentDate,
        },
      },
      { new: true }
    );

    if (!updateBlog ) {
      return res
        .status(404)
        .send({ status: false, msg: "Blog does not exist." });
    }


    res.status(200).send({ status: true, data: updateBlog });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};




const deleteBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let tokensId = req.decodedToken.userId;

    if (!mongoose.isValidObjectId(blogId)) {
      return res.status(400).send({ status: false, msg: "blogId is invalid" });
    }

    let getBlogDetails = await blogModel.findOne({ _id: blogId , isPublished: true });

    if (!getBlogDetails || getBlogDetails["isdeleted"] == true) {
      return res
        .status(404)
        .send({ status: false, msg: " Blog does not exist." });
    }

    if (getBlogDetails.authorId.toString() !== tokensId) {
      return res
        .status(401)
        .send({ status: false, message: `Unauthorized access` });
    }

    let deleteBlog = await blogModel.updateOne(
      { _id: blogId },
      { $set: { isdeleted: true } }
    );

    res.status(200).send();

  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};


const deletedocs = async function (req, res) {
  try {
    let query = req.query;
    let data = {isPublished: true, isdeleted: false, ...query}
    let tokensId = req.decodedToken.userId;
    
    if (Object.keys(query) == 0) {
      return res.status(404).send({ status: false, msg: "input is required" });
    }

    
    let blogDetails = await blogModel.findOne(data)
    
    if ( !blogDetails ) {
      return res
      .status(400)
      .send({ status: false, message: `Blog not exist`});
    }
    if ( blogDetails.authorId.toString() !== tokensId) {
      return res
      .status(401)
      .send({ status: false, message: `Unauthorized access` });
    }
    
    let deleteBlogs = await blogModel.updateMany(data, {
      $set: { isdeleted: true  },
    });

    if (deleteBlogs["matchedCount"] === 0) {
      return res.status(404).send({ status: false, msg: "Blog not exist" });
    }

    res.status(200).send({ status: false, msg: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};



const loginUser = async function (req, res) {
  try {
    let emailId = req.body.email;
    let password = req.body.password;

    if ( !emailId || !password ) {
      return res.status(404).send({ status: false, msg: "Provide a valid input" });
    }

    let authorDetails = await authourModel.findOne({
      email: emailId,
      password: password,
    });
    if (!authorDetails)
      return res.status(404).send({
        status: false,
        msg: "email or the password is not corerct",
      });

    let token = jwt.sign(
      {
        userId: authorDetails._id.toString(),
        team: "15",
      },
      "mini-blog-site_batch-15"
    );

    res.setHeader("x-auth-token", token);
    return res.status(200).send({ status: true, data: token });
  } catch (error) {
    return res.status(500).send({ msg: "Server Error" });
  }
};



module.exports = { createBlog, getBlogs, updateBlogs, deleteBlog, deletedocs, loginUser, };

