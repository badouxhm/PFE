const express = require('express');
const Router = express.Router();
const { generateToken, authenticateJWT, comparePassword } = require('../auth');
const db = require("../db")
 
Router.post('/',(req,res)=>{
    const email = req.body.Email;
    const password = req.body.Password;
    
    const sql = 'SELECT * FROM users WHERE email = ? && status = 1';
    const valeurs = [email];
    
    db.query(sql, valeurs, (err, resultat) => {
        if (err) {
            res.send({erorr: err})
        } 

        if(resultat.length>0){
            if (comparePassword(password,resultat[0].password)){

                const id=resultat[0].id
                const matricule=resultat[0].matricule
                const nom=resultat[0].nom
                const prenom=resultat[0].prenom
                const role=resultat[0].role
                const poste=resultat[0].poste
                const tel=resultat[0].tel
                const token = generateToken(id,matricule,nom,prenom,email,tel,role,poste);
                
                console.log(resultat[0].role)
                res.send({token:token ,role : resultat[0].role})
            }else{

                console.log('Mot de passe incorrect')
                res.send({message: 'Mot de passe incorrect'})
            }
        }else{
        }
    });
})

module.exports = Router