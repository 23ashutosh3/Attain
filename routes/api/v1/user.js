const express = require("express");
const router = express.Router();
const userAuth = require("../../../controllers/api/v1/userAuth");
router.post("/register", userAuth.userRegister);
router.post("/login", userAuth.login);
module.exports = router;
