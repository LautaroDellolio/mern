const Newsletter = require("../models/newsletter")

async function suscribeEmail(req, res) {
    try {
        //falta validar que el email ya no exista
        const { email } = req.body
        if (!email) {
            return res.status(400).send({ msg: "El email es obligatorio" })
        }
        const newsletter = await new Newsletter({
            email: email.toLowerCase()
        })
        newsletter.save()
        res.status(200).send(newsletter)
    } catch (error) {
        console.error("Error al suscribir el email")
        res.status(400).send({ msg: "Error al suscribir el email" })
    }
}

async function getEmails(req, res) {
    try {
        const { page = 1, limit = 10 } = req.query
        const options = {
            page: parseInt(page),
            limit: parseInt(limit)
        }
        const newsletterStored = await Newsletter.paginate({},options)
        console.log(newsletterStored);
        res.status(200).send(newsletterStored)
    } catch (error) {
        console.error("Error al obtener los email", error)
        res.status(400).send({ msg: "Error al obtener los email" })
    }
}

async function deleteEmail(req, res) {
    try {
        const { id } = req.params
        await Newsletter.findByIdAndDelete(id)
        res.status(200).send({ msg: "Email eliminado correctamente" })

    } catch (error) {
        console.error("Error al eliminar el Email: ", error);
        res.status(400).send({ msg: "Error al eliminar el email" })
    }
}

module.exports = {
    suscribeEmail,
    getEmails,
    deleteEmail
} 