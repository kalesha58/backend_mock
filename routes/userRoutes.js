const express=require("express");
const {signUp,login} = require("../controller/signup");
const router=express.Router()

router.post("/login",signUp)
router.post("/signup",login)
module.exports=router;