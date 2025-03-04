const User = require("../models/user");

async function getMe(req, res) {
    console.log(req.user);
    
//   try {
//     const { user_id } = req.user;
//     const response = await User.findById(user_id);
//     if (!response) {
//       return res.status(400).send({ msg: "No se ha encontrado usuario" });
//     }
//     return res.status(200).send(response);
//   } catch (error) {
//     return res.status(500).send({ msg: "Error del servidor", error });
//   }
}

module.exports = {
  getMe,
};
