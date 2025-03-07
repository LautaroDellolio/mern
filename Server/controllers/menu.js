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

async function getMenu(req, res) {
    try {
        const { active } = req.query
        let response = null;
        if (active === undefined) {
            response = await Menu.find().sort({ order: "asc" });
        } else {
            response = await Menu.find({ active }).sort({ order: "asc" });
        }
        return res.status(200).send(response);
    } catch {
        console.error("Error al obtener los menú: ", error);
        res.status(500).send({ msg: "Error interno del servidor al obtener los menú" })
    }
}

async function updateMenu(req, res) {
    try {
        const { id } = req.params
        const menuData = req.body

        const menuUpdate = await Menu.findByIdAndUpdate({ _id: id }, menuData)
        console.log(menuData);

        res.status(200).send({ msg: "Menú modificado correctamente." })
    } catch (error) {
        console.error("Error al modificar el menu: ", error);
        res.status(400).send({ msg: "Error al modificar el menú" })
    }
}

async function deleteMenu(req, res) {
    try {
        const { id } = req.params
        const menuDelete = await Menu.findByIdAndDelete(id)
        res.status(200).send({msg: "Menú eliminado correctamente"})

    } catch {
        console.error("Error al eliminar el menú: ", error);
        res.status(400).send({ msg: "Error al eliminar el menú" })
    }
}

module.exports = {
    createMenu,
    getMenu,
    updateMenu,
    deleteMenu    
}