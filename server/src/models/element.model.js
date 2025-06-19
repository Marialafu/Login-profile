const mongoose = require('mongoose');

//esquema por cada colección de MongoDB
const userSchema = new mongoose.Schema(
  {
    //required: para valores obligatorios
    //type: String, Number, Boolean, Arrays...
    firstValue: { type: String, required: true },
    secondValue: String
  },
  {
    //genera createAt y UpdateAt automático
    timestamps: true,
    collection: 'mongodbCollectionName'
  }
);

//js no sabe leer el esquema, el modelo compila el esquema
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
