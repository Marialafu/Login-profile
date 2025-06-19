const express = require('express');
const app = express();
const cors = require('cors');

const connectDB = require('./config/db');
const elementRoutes = require('./routes/element.routes');

require('dotenv').config();
//puerto traido de archivo .env
const port = process.env.PORT;

const corsOptions = {
  origin: '*', // Orígenes permitidos (cuando esté en un dominio real, lo cambiaremos por ese dominio)
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/element', elementRoutes);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await connectDB();
});
