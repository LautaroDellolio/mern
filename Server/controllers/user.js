const bcrypt = require("bcryptjs");
const User = require("../models/user");
const image = require("../utils/image");

async function getMe(req, res) {
  try {
    const { user_id } = req.user;
    const response = await User.findById(user_id);

    if (!response) {
      return res.status(404).send({ msg: "Usuario no encontrado" });
    }
    console.log(response);
    return res.status(200).send(response);
  } catch (error) {
    console.error("Error en getMe:", error);
    return res.status(500).send({ msg: "Error del servidor" });
  }
}

async function getUser(req, res) {
  try {
    const { active } = req.query;
    let response = null;
    if (active === undefined) {
      response = await User.find();
    } else {
      response = await User.find({ active });
    }
    return res.status(200).send(response);
  } catch (error) {
    console.error("Error en getMe:", error);
    return res.status(500).send({ msg: "Error del servidor" });
  }
}

async function createUser(req, res) {
  try {
    const { password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hasPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      ...req.body,
      active: false,
      password: hasPassword,
    });
    console.log(user);

    if (req.files?.avatar) {
      const imgPath = image.getFilePath(req.files.avatar);
      user.avatar = imgPath;
    }
    const userStored = await user.save();
    res.status(201).send(userStored);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(400).send({ msg: "Error al crear el usuario" });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const userData = req.body;

    if (userData.password) {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(userData.password, salt);
      userData.password = hashPassword;
    } else {
      delete userData.password;
    }

    if (req.files.avatar) {
      const imgPath = image.getFilePath(req.files.avatar);
      userData.avatar = imgPath;
      console.log(req.files.avatar);
    }
    const userUpdate = await User.findByIdAndUpdate({ _id: id }, userData);
    console.log(userData);
    res.status(200).send({ msg: "Usuario modificado correctamente." });
  } catch (error) {
    console.error("Error al modificar el usario");
    res.status(400).send({ msg: "Error al modifiar el usuario" });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const userDelete = await User.findByIdAndDelete(id)
    res.status(200).send({msg: "Usualio eliminado Exitosamente."})
  } catch (error) {
    console.error("Error al eliminar usuario");
    res.status(400).send({ msg: "Error al eliminar usuario" });
  }
}

module.exports = {
  getMe,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
