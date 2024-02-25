const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userController = require("./controllers/usercontroller");
const path = require("path");

const app = express();
const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/myapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexión exitosa a la base de datos");
}).catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
});

app.use(bodyParser.json());

app.post("/register", userController.createUser);

// Sirve el archivo HTML estático desde la carpeta client
app.use(express.static(path.join(__dirname, "../client")));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
