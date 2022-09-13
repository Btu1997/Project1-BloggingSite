const mongoose = require('mongoose');
const authourModel = require('./authorModel');
const ObjectId = mongoose.Schema.Types.ObjectId;


const BlogSchema = new mongoose.Schema( {
    "title": {
        type: String,
        require: true
    },
    "body":{
        type: String,
        require: true,
       
    },
    "authorId":{
        type: ObjectId,
        ref: "Mini-author",
        required:true

    },
    "tags": [{
        type: String,
        require: true,
        enum: ["Book", "Friends", "Self help"]
     }],
    "category": {
        type: String,
        require: true
    } ,
    "subcategory": [{
        type: String
    }],       
    "deletedAt": "", 

    "isdeleted": {
        type: Boolean,
        default: false
    },
    "publishedAt": "", 
    
    "isPublished": {
        type: Boolean,
        default: false
    }
   
    

}, { timestamps: true });


module.exports = mongoose.model('Blog', BlogSchema);








// if (!pathBlogId && Object.keys(queryDetails) >= 0) {
//     let blogDetails = await blogModel.find(queryDetails);
    
//   }else if (!queryDetails && pathBlogId ) {
    
//     let blogDetails = await blogModel.findById(pathBlogId);
//   }