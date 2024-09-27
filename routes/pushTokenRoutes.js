const express = require('express');
const router = express.Router();

// Aquí almacenarás los tokens
let pushTokens = [];

// Ruta para recibir el token de notificaciones push
router.post('/push-token', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    // Almacena el token (puedes usar una base de datos en producción)
    if (!pushTokens.includes(token)) {
        pushTokens.push(token);
    }

    return res.status(200).json({ message: 'Token saved successfully' });
});

module.exports = router;
