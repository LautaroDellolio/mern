const express = require("express")
const UserControler = require("../controllers/user")
const md_auth =require("../middewares/aunthenticated")

const api = express.Router()

api.get("/user/me", [md_auth.asureAuth],UserControler.getMe)

module.exports = api