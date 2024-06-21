const express = require('express');
const Router = express.Router();
const db = require ('../db')
const { authenticateJWT  ,hashPassword } = require('../auth');

Router.put('/updateUser/:id',authenticateJWT,(req,res)=>{
    console.log("update")
    const nom = req.body.Nom;
    const prenom = req.body.Prenom;
    const date_naissance = req.body.Date_naissance;
    const email = req.body.Email;
    const password = req.body.Password;
    const passwordHashed = hashPassword(password);
    const role = req.body.Role;
    const id_c = req.params.id
    
    const sql = "UPDATE users SET nom = ?,prenom = ? ,email = ?,password = ?,date_naissance = ? ,role = ? WHERE id = ?";
    const valeurs = [nom, prenom, email, passwordHashed, date_naissance, role,id_c];
    
    db.query(sql,valeurs,(err,resultat)=>{
        if (err)console.log("error :",err)
    })
})

Router.get('/updateUser/:id',authenticateJWT,(req,res)=>{
    const rechercheKey = req.params.id
    const value = [rechercheKey];
    const sql = 'SELECT * FROM `users` WHERE id LIKE ?'
    db.query(sql, value, (err, resultat) => {
        if (err) {
            res.send({ error: err });
            console.log(err);
        } else {
            res.json(resultat);
        }
    });
})

module.exports = Router