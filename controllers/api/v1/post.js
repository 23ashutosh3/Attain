const Post = require("../../../models/postSchema");

// Authenticated  user can create post
module.exports.userPost = async function(req, res) {
  try {
    console.log("hello1");
    const { post, author } = req.body;
    const newPost = new Post({
      post,
      author,
    });

    const savePost = await newPost.save();
    res.json(savePost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//Authenticated user can get all the post
module.exports.getPost = async function(req, res) {
  const limitValue = req.query.limit || 2;
  const skipValue = req.query.skip || 0;
  Post.find()
    .then((post) => {
      res
        .send(post)
        .limit(limitValue)
        .skip(skipValue);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured",
      });
    });
};
//Authenticated user can delete post
module.exports.deletePost = async function(req, res) {

  try {
    const postData = await Post.findById(req.params.id);
    if (!postData) {
      return res.json(400, {
        message: "post not found",
      });
    }

    postData.remove();

    return res.json(200, {
      message: "Post deleted",
    });
  } catch (err) {
    res.json(500, {
      message: "internal error",
    });
  }
};
//Authenticated user can update post
module.exports.updatePost = async function(req, res) {
  try {
    let { post_id } = req.params.id;
    console.log("req.query",req.params.id);

    const postData = await Post.findById(req.params.id);
    console.log("postData", postData);

    if (!postData) {
      return res.status(401).json({
        err: "Bad request",
      });
    }
    const { post, author } = req.body;
    let obj = {};
    obj.post = post;
    obj.author = author;
    console.log("obj", obj);

    const savePost = postData.save(obj);
    console.log("savePost", savePost);
    res.json({
      message: "success",
      post,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
