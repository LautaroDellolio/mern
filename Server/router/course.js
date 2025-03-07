const express = require("express")
const CourseController = require("../controllers/course")
const multiparty = require("connect-multiparty")
const md_auth = require("../middleware/aunthenticated")

const md_upload = multiparty({ uploadDir : "./upload/course"})
const api = express.Router()

api.post("/course", [md_auth.asureAuth, md_upload], CourseController.createCourse)
api.get("/course", [md_auth.asureAuth], CourseController.getCourse)
api.patch("/course/:id", [md_auth.asureAuth, md_upload], CourseController.updateCourse)
api.delete("/course/:id", [md_auth.asureAuth], CourseController.deleteCourse)



module.exports = api