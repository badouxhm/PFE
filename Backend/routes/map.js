const express = require('express');
const Router = express.Router();
const db = require ("../db")
const { authenticateJWT } = require('../auth');
Router.get('/map',authenticateJWT, (req, res) => {
    const sql = 'SELECT Site_status, X, Y, id_c FROM sites';

    db.query(sql, (err, resultat) => {
        if (err) {
            res.send({ error: err });
        } else {
            res.json(resultat);
        }
    });
});

module.exports = Router;