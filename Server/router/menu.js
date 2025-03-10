const express = require("express")
const MenuController = require("../controllers/menu")
const md_auth = require("../middleware/aunthenticated")

const api = express.Router()


api.post("/menu", [md_auth.asureAuth], MenuController.createMenu )
api.get("/menu", MenuController.getMenu )
api.patch("/menu/:id", [md_auth.asureAuth], MenuController.updateMenu )
api.delete("/menu/:id", [md_auth.asureAuth], MenuController.deleteMenu )

module.exports = api