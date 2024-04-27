const express = require('express');
const Router = express.Router();
const { generateToken, authenticateJWT } = require('../auth');
const db = require("../db")
 
Router.post('/',(req,res)=>{
    const email = req.body.Email;
    const password = req.body.Password;
    
    const sql = 'SELECT * FROM users WHERE email = ? && password = ? ';
    const valeurs = [email,password];
    
    db.query(sql, valeurs, (err, resultat) => {
        if (err) {
            res.send({erorr: err})
        } 
        if(resultat.length>0){
            const token = generateToken(email,password);  
            console.log("le token : " ,token)
        }else{
            console.log('E-mail ou Mot de passe incorrect')
            res.send({message: 'E-mail ou Mot de passe incorrect'})
        }
    });
})

module.exports = Router