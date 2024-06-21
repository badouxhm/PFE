const express = require('express');
const Router = express.Router();
const db = require ('../db')
const { authenticateJWT } = require('../auth');

Router.get('/listeUser',authenticateJWT,(req,res)=>{
    const sql ='SELECT * FROM users'
    db.query(sql, (err, resultat) => {
        if (err) {
            res.send({erorr: err})
        }
        else{
            res.json(resultat) 
        }
    });
})

Router.delete('/listeUser/:id',authenticateJWT,(req,res)=>{
    const id = req.params.id
    const sql = "UPDATE users SET status = CASE WHEN status = 1 THEN 0 ELSE 1 END WHERE id = ?"
    const value = [id]

    db.query(sql,value,(err,resultat)=>{
        if (err)console.log("error :",err)
    })
})

Router.get('/listeUser/:value',authenticateJWT, (req, res) => {
    const rechercheKey = '%'+req.params.value+'%'
    const value = [rechercheKey, rechercheKey, rechercheKey, rechercheKey, rechercheKey, rechercheKey, rechercheKey];
    const sql = 'SELECT * FROM users WHERE id LIKE ? OR nom LIKE ? OR prenom LIKE ? OR email LIKE ? OR matricule LIKE ? OR poste LIKE ? OR tel LIKE ?'
    db.query(sql, value, (err, resultat) => {
        if (err) {
            res.send({ error: err });
        } else {
            res.json(resultat);
        }
    });
});

module.exports = Router