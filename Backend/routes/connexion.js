const express = require('express');
const Router = express.Router();
const { generateToken, authenticateJWT } = require('../auth');
const db = require("../db")
 
Router.post('/',(req,res)=>{
    const email = req.body.Email;
    const password = req.body.Password;
    
    const sql = 'SELECT * FROM users WHERE email = ? && password = ? && status = 1';
    const valeurs = [email,password];
    
    db.query(sql, valeurs, (err, resultat) => {
        if (err) {
            res.send({erorr: err})
        } 
        if(resultat.length>0){
            const id=resultat[0].id
            const nom=resultat[0].nom
            const prenom=resultat[0].prenom
            const role=resultat[0].role
            const token = generateToken(id,nom,prenom,email,password,role);
            
            console.log(resultat[0].role)
            res.send({token:token ,role : resultat[0].role})
        }else{
            console.log('E-mail ou Mot de passe incorrect')
            res.send({message: 'E-mail ou Mot de passe incorrect'})
        }
    });
})

module.exports = Router