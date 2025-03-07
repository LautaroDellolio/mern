const Course = require("../models/course")
const image = require("../utils/image")

async function createCourse(req, res) {
    try {
        const course = new Course(req.body)
        const imagePath = image.getFilePath(req.files.miniature)
        course.miniature = imagePath

        const courseStored = await course.save()
        res.status(200).send(courseStored)

    } catch (error) {
        console.error("Error al crear el curso")
        res.status(400).send({ msg: "Error al crear el curso" })
    }
}

async function getCourse(req, res) {
    try {
        const { page = 1, limit = 10 } = req.query
        const options = {
            page: parseInt(page),
            limit: parseInt(limit)
        }
        const listCourse = await Course.find().paginate(options)
        res.status(200).send(listCourse)
    } catch (error) {
        console.error("Error al obtener los cursos: ", error);
        res.status(400).send({ msg: "Error al obtener los cursos" })
    }
}

async function updateCourse(req, res) {
    try {
        const { id } = req.params
        const courseData = req.body
        if (req.file && req.file.miniature) {
            const imagePath = image.getFilePath(req.file.miniature)
            courseData.miniature = imagePath
        }

        const courseUpdate = await Course.findByIdAndUpdate({ _id: id }, courseData)
        res.status(200).send({msg:"Curso modificado correctamente"})
    } catch (error) {
        console.error("Error al modificar el curso: ", error);
        res.status(400).send({ msg: "Error al modificar el curso" })
    }
}

async function deleteCourse(req, res) {
    try {
        const { id } = req.params
        await Course.findByIdAndDelete(id)
        res.status(200).send({msg: "Curso eliminado correctamente"})

    } catch {
        console.error("Error al eliminar el Curso: ", error);
        res.status(400).send({ msg: "Error al eliminar el Curso" })
    }
}

module.exports = {
    createCourse,
    getCourse,
    updateCourse,
    deleteCourse
}