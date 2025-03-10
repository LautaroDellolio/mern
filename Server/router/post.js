const express = require("express")
const multiparty = require("connect-multiparty")
const PostController = require("../controllers/post")
const md_auth = require("../middleware/aunthenticated")

const md_upload = multiparty({uploadDir: "./upload/blog"})

const api = express.Router()

api.post("/post", [md_auth.asureAuth, md_upload], PostController.createPost)
api.get("/post", [md_auth.asureAuth], PostController.getPosts)
api.patch("/post/:id", [md_auth.asureAuth, md_upload], PostController.updatePost)
api.delete("/post/:id", [md_auth.asureAuth], PostController.deletePost)
api.get("/post/:path", PostController.getPost)


module.exports = api