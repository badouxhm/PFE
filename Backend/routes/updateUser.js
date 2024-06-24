const express = require('express');
const Router = express.Router();
const db = require('../db');
const { authenticateJWT, hashPassword } = require('../auth');

Router.put('/updateUser/:id', authenticateJWT, (req, res) => {
    const mat = req.body.Matricule;
    const nom = req.body.Nom;
    const prenom = req.body.Prenom;
    const date_naissance = req.body.Date_naissance;
    const email = req.body.Email;
    const password = req.body.Password;
    const passwordHashed = hashPassword(password);
    const role = req.body.Role;
    const poste = req.body.Poste;
    const tel = req.body.Tel;
    const id_c = req.params.id;

    const sql = "UPDATE users SET matricule = ?, nom = ?, prenom = ?, email = ?, password = ?, date_naissance = ?, role = ?, poste = ?, tel = ? WHERE id = ?";
    const valeurs = [mat, nom, prenom, email, passwordHashed, date_naissance, role, poste, tel, id_c];

    db.query(sql, valeurs, (err, resultat) => {
        if (err) {
            console.log("error :", err);
            return res.status(500).send({ error: 'Erreur lors de la mise à jour de l\'utilisateur.' });
        } else {
            return res.status(200).send({ message: 'Utilisateur mis à jour avec succès.' });
        }
    });
});

Router.get('/updateUser/:id', authenticateJWT, (req, res) => {
    const rechercheKey = req.params.id;
    const value = [rechercheKey];
    const sql = 'SELECT * FROM `users` WHERE id = ?';
    db.query(sql, value, (err, resultat) => {
        if (err) {
            res.send({ error: err });
            console.log(err);
        } else {
            res.json(resultat);
        }
    });
});

module.exports = Router;
