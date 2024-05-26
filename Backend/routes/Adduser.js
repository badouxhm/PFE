const express = require('express');
const Router = express.Router();
const db = require ("../db")
const { authenticateJWT } = require('../auth');

Router.post('/addUser',authenticateJWT,(req,res)=>{
    const nom = req.body.Nom;
    const prenom = req.body.Prenom;
    const date_naissance = req.body.Date_naissance;
    const email = req.body.Email;
    const password = req.body.Password;
    const role = req.body.Role;
    
    const sql = 'INSERT INTO users (nom,prenom,email,password,date_naissance,role) VALUES (?,?,?,?,?,?)';
    const valeurs = [nom,prenom,email,password,date_naissance,role];

    const sqlVerification = 'SELECT * FROM users WHERE email = ?'

    db.query(sqlVerification,email,(err,resultat) => {
        if(err){
            console.error('Erreur lors de la recuperation de la BDD :', err);
            res.status(500).send('erreur lors de la recuperation de la BDD');
        }else{
            console.log("verification...")
            if(resultat.length>0){
                console.log("E-mail existant deja !")
                res.send({message: 'E-mail deja existant'})
            }else{
                db.query(sql, valeurs, (err, resultat) => {
                    if (err) {
                        console.error('Erreur lors de l\'insertion dans la base de données :', err);
                        res.status(500).send('Erreur lors de l\'insertion dans la base de données');
                    } 
                    
                    else {
                        console.log(`utilisateur ajouté à la BDD`);
                        res.send ({recu: true})
                    }
                });
            }
        }
    })

    
});
module.exports = Router ;