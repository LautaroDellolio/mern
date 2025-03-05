const Menu = require("../models/menu")

async function createMenu(req, res) {
    try {
        const menu = new Menu(req.body)
        const menuStored = await menu.save()
        res.status(200).send(menuStored)
    } catch (error) {
        console.error("Error al crear el menu: ", error);
        res.status(500).send({ msg: "Error interno del servidor al crear el menú" })
    }
}

module.exports = {
    createMenu
}