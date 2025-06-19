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
  const { info } = req.body;
  if (!info) return res.status(400).send({ error: 'Bad request' + error });

  try {
    const users = await UsersModel.findById(req.params.id);

    if (users) return res.status(409).send({ error: 'User exists' });

    const newUsers = new UsersModel({
      _id: v4(),
      info
    });

    await newUsers.save();

    const allUsers = await UsersModel.find();
    return res.status(200).send(allUsers);
  } catch (error) {
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

    return res.send(200).send(allUsers);
  } catch (error) {
    return res.status(500).send({ error: 'Error reading database' + error });
  }
};

module.exports = usersController;
