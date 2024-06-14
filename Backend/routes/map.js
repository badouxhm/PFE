const express = require('express');
const Router = express.Router();
const db = require("../db");
const { authenticateJWT } = require('../auth');

// Route pour récupérer les données paginées
Router.get('/map', authenticateJWT, (req, res) => {
    const page = parseInt(req.query.page) || 1; // Numéro de page
    const limit = parseInt(req.query.limit) || 10; // Nombre d'éléments par page
    const offset = (page - 1) * limit; // Offset pour la pagination

    // Requête pour récupérer les données paginées avec offset
    const sql = `SELECT Site_status, X, Y, id_c FROM sites LIMIT ?, ?`;
    db.query(sql, [offset, limit], (err, resultat) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(resultat);
        }
    });
});

module.exports = Router;
