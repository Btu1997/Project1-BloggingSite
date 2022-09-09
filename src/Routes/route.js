const express =require("express");
const router= express.Router();
const {createBlog, getBlogs, updateBlogs,deleteBlog,deletedocs, loginUser}= require("../Controller/blogController");
const {createAuthor}= require("../Controller/authorController");
const {authenticate}= require("../Middleware/auth");
const {authorValidation , blogsValidation }= require("../validator/validator");



router.post("/authors", authorValidation , createAuthor)// API for Creation of Author


router.post("/blogs", blogsValidation , authenticate, createBlog)// API for Creation of blogs


router.get("/blogs",authenticate, getBlogs)// API for getting of blogs 


router.put("/blogs/:blogId",authenticate, updateBlogs)// API for updating of blogs 


router.delete("/blogs/:blogId",authenticate, deleteBlog)// API for deleting blog by path Params


router.delete("/blogs",authenticate, deletedocs)// API for deleting blog by query Params


router.post("/login", loginUser )// API for login author



module.exports= router;