const { v4 } = require('uuid');
const UsersModel = require('../models/users.model');

const usersController = {};

usersController.getAllUsers = async (req, res) => {
  try {
    const allUsers = await UsersModel.find();
    return res.status(200).send(allUsers);
  } catch (error) {
    return res.status(500).send({ error: 'Error reading database' + error });
  }
};

usersController.createUsers = async (req, res) => {
  console.log(req.body);

  const { firebaseId, name, email, provider } = req.body;
  if (!firebaseId) return res.status(400).send({ error: 'No id' });
  if (!name || !email) return res.status(400).send({ error: 'No user data' });

  try {
    //si el valor y el campo es el mismo no hace falta poner name: name
    const newUser = new UsersModel({
      firebaseId,
      name,
      email,
      provider
    });
    console.log(newUser);

    //coge todos los usuarios de mongo gracias al model.
    const allUsers = await UsersModel.find();

    if (newUser.provider === 'google') {
      const mongoUser = allUsers.find(user => user.email === newUser.email);
      if (!mongoUser) await newUser.save();
    }

    return res.status(200).send(allUsers);
  } catch (error) {
    console.error(
      '❌ Error en createUsers:',
      error.name,
      error.message,
      error.stack
    );
    return res.status(500).send({ error: 'Error reading database' + error });
  }
};

usersController.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UsersModel.findById(id);

    if (!user) {
      return res.status(409).send({ error: 'User not exists' });
    }

    await UsersModel.updateOne({ _id: id }, { $set: { ...req.body } });

    const allUsers = await UsersModel.find();
    return res.status(200).send(allUsers);
  } catch (error) {
    return res.status(500).send({ error: 'Error reading database' + error });
  }
};

usersController.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UsersModel.findById(id);

    if (!user) return res.status(409).send({ error: 'User not exists' });

    await UsersModel.deleteOne({ _id: id });
    const allUsers = await UsersModel.find();

    return res.status(200).send(allUsers);
  } catch (error) {
    return res.status(500).send({ error: 'Error reading database' + error });
  }
};

module.exports = usersController;
