const express = require('express');
const Router = express.Router();
const db = require ("../db")
const { authenticateJWT , hashPassword} = require('../auth');

Router.post('/addUser',authenticateJWT,(req,res)=>{
    const matricule = req.body.Matricule;
    const nom = req.body.Nom;
    const prenom = req.body.Prenom;
    const date_naissance = req.body.Date_naissance;
    const email = req.body.Email;
    const tel = req.body.Tel;
    const password = req.body.Password;
    const passwordHashed = hashPassword(password);
    const role = req.body.Role;
    const poste = req.body.Poste;
    
    const sql = 'INSERT INTO users (matricule,nom,prenom,email,tel,password,date_naissance,role,poste) VALUES (?,?,?,?,?,?,?,?,?)';
    const valeurs = [matricule,nom,prenom,email,tel,passwordHashed,date_naissance,role,poste];

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