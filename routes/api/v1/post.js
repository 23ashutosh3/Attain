const express = require("express");
const router = express.Router();
const userPost = require("../../../controllers/api/v1/post");
const passport = require("passport");
router.post(
  "/userPost",
  passport.authenticate("jwt", { session: false }),
  userPost.userPost
);
router.get(
  "/getPost",
  passport.authenticate("jwt", { session: false }),
  userPost.getPost
);
router.delete(
  "/:id/delete",
  passport.authenticate("jwt", { session: false }),
  userPost.deletePost
);
router.put(
  "/:id/update",
  passport.authenticate("jwt", { session: false }),
  userPost.updatePost
);
module.exports = router;
