// usercontroller.js
const UserModel = require("../models/usermodel");

async function createUser(req, res) {
    const { email, password, confirmPassword, pin, name, lastName, country, birthdate } = req.body;


    // Verificar si el usuario tiene al menos 18 años
    const today = new Date();
    const dob = new Date(birthdate);
    const age = today.getFullYear() - dob.getFullYear();
    if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
        age--;
    }
    if (age < 18) {
        return res.status(400).json({ error: "Debes tener al menos 18 años para registrarte" });
    }

    try {
        const newUser = await UserModel.create({
            email,
            password, 
            pin,
            name,
            lastName,
            country,
            birthdate
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ error: "Hubo un problema al registrar el usuario" });
    }
}

module.exports = {
    createUser
};
