const Post = require("../../../models/postSchema");

//add votes for specific answer
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

module.exports.deletePost = async function(req, res) {
  try {
    let { post_id } = req.query;

    const postData = await Post.findById({ _id: post_id });
    if (!postData) {
      return res.status(401).json({
        err: "Bad request",
      });
    }

    const deleteUser = await Post.findByIdAndDelete({ _id: post_id });
    res.json({ message: "success", deletePost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.updatePost = async function(req, res) {
  try {
    let { post_id } = req.query;

    const postData = await Post.findById({ _id: post_id });
    if (!postData) {
      return res.status(401).json({
        err: "Bad request",
      });
    }
    const { post, author, categories } = req.body;
    let obj = {};
    obj.post = post;
    obj.author = author;

    const savePost = await postData.save(obj);
    res.json({
      message: "success",
      post,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
