const express = require("express");
const router = express.Router();
const userPost = require("../../../controllers/api/v1/post");
const passport = require('passport');
router.post("/userPost", userPost.userPost);
router.get("/getPost", userPost.getPost);
router.get("/delete", userPost.deletePost);
module.exports = router;
