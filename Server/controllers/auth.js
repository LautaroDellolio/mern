const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

async function register(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!email) return res.status(400).send({ msg: "El email es obligatorio" });
    if (!password)
      return res.status(400).send({ msg: "La contraseña es obligatoria" });

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser)
      return res.status(400).send({ msg: "El usuario ya existe" });

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      role: "user",
      active: false,
      password: hashPassword,
    });

    const userStorage = await user.save();
    return res.status(201).send(userStorage);
  } catch (error) {
    console.error("Error al registrar en la BBDD: ", error);
    return res.status(500).send({ msg: "Error interno del servidor" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) return res.status(400).send({ msg: "El email es obligatorio" });
    if (!password)
      return res.status(400).send({ msg: "La contraseña es obligatorio" });
    const emailLowerCase = email.toLowerCase();
    const userStore = await User.findOne({ email: emailLowerCase });
    if (!userStore) {
      return res.status(404).send({ msg: "Usuario no encontrado" });
    }
    bcrypt.compare(password, userStore.password, (bcryptError, check) => {
      if (bcryptError) {
        res.status(500).send({ msg: "Los datos ingresados son incorrectos" });
      } else if (!check) {
        res.status(400).send({ msg: "Los datos ingresados son incorrectos" });
      } else if (!userStore.active) {
        res.status(401).send({ msg: "El usuario aun esta activo" });
      } else {
        res.status(200).send({
          access: jwt.createAccessToken(userStore),
          refresh: jwt.createRefreshToken(userStore),
        });
      }
    });
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).send({ msg: "Error del servidor" });
  }
}

async function refreshAccessToken(req, res) {
  try {
    const { token } = req.body;
    // Verifica si el token está presente
    if (!token) {
      return res.status(400).send({ msg: "El token es obligatorio" });
    }
    // Decodifica el token
    const decodedToken = jwt.decoded(token);
    // Verifica si el token es válido
    if (!decodedToken || !decodedToken.user_id) {
      return res.status(401).send({ msg: "Token inválido o expirado" });
    }
    const { user_id } = decodedToken;

    // Busca el usuario en la base de datos
    const userStore = await User.findOne({ _id: user_id });
    if (!userStore) {
      return res.status(404).send({ msg: "Usuario no encontrado" });
    }

    // Genera y envía un nuevo access token
    res.status(200).send({
      accessToken: jwt.createAccessToken(userStore),
    });
  } catch (error) {
    console.error("Error de acceso", error);
    res.status(500).send({ msg: "Error del servidor" });
  }
}

module.exports = {
  register,
  login,
  refreshAccessToken,
};
