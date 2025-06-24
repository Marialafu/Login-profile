const mongoose = require('mongoose');

//esquema por cada colección de MongoDB
const userSchema = new mongoose.Schema(
  {
    //required: para valores obligatorios
    //type: String, Number, Boolean, Arrays...
    firebaseId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    provider: String
  },
  {
    //genera createAt y UpdateAt automático
    timestamps: true,
    collection: 'usersCollection'
  }
);

//js no sabe leer el esquema, el modelo compila el esquema
//es lo que te permita interactuar con la base de datos de mongo.
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
