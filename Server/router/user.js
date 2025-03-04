const express = require("express");
const multiparty = require("connect-multiparty");
const UserControler = require("../controllers/user");
const md_auth = require("../middewares/aunthenticated");

const md_upload = multiparty({ uploadDir: "./upload/avatar" });
const api = express.Router();

api.get("/user/me", [md_auth.asureAuth], UserControler.getMe);
api.get("/users", [md_auth.asureAuth], UserControler.getUser);
api.post("/user", [md_auth.asureAuth, md_upload], UserControler.createUser);
api.patch(
  "/user/:id",
  [md_auth.asureAuth, md_upload],
  UserControler.updateUser
);
api.delete("/user/:id", [md_auth.asureAuth], UserControler.deleteUser);

module.exports = api;
