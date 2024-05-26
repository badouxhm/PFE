const express = require('express');
const Router = express.Router();
const db = require('../db');
const { authenticateJWT } = require('../auth');
Router.get('/historique',authenticateJWT, (req, res) => {
    const sql = 'SELECT h.*, u.nom, u.prenom FROM historique h JOIN users u ON h.id = u.id ORDER BY h.id_h DESC';

    db.query(sql, (err, resultat) => {
        if (err) {
            res.send({ error: err });
        } else {
            // Formater chaque date d'événement dans le résultat
            resultat.forEach(event => {
                const date = new Date(event.date_event);
                const formattedDate = date.toLocaleString('fr-FR', { timeZone: 'UTC' });
                event.date_event = formattedDate;
            });

            res.json(resultat);
            console.log(resultat);
        }
    });
});

module.exports = Router;
