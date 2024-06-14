const express = require('express');
const Router = express.Router();
const { generateToken, authenticateJWT, comparePassword } = require('../auth');
const db = require("../db")
 
Router.get('/chartTechnologie',(req,res)=>{
    const sql= "SELECT Technologie, COUNT(*) AS NbrCells FROM sites GROUP BY Technologie"
    db.query(sql,(err,resultat)=>{
        if (err){
            res.send({erreur : err})
        }else{
            res.json(resultat)
            console.log(resultat)
        }
    })
})
Router.get('/chartSUP',(req,res)=>{
    const sql= "SELECT SUP, COUNT(*) AS SupCells FROM sites GROUP BY SUP;"
    db.query(sql,(err,resultat)=>{
        if (err){
            res.send({erreur : err})
        }else{
            res.json(resultat)
            console.log(resultat)
        }
    })
})
Router.get('/chartStatus',(req,res)=>{
    const sql= "SELECT status, COUNT(*) AS StatusCells FROM sites GROUP BY status;"
    db.query(sql,(err,resultat)=>{
        if (err){
            res.send({erreur : err})
        }else{
            res.json(resultat)
            console.log(resultat)
        }
    })
})
Router.get('/NombreCells',(req,res)=>{
    const sql= "SELECT COUNT(*) AS NombreCells FROM sites;"
    db.query(sql,(err,resultat)=>{
        if (err){
            res.send({erreur : err})
        }else{
            res.json(resultat)
            console.log(resultat)
        }
    })
})

Router.get('/Wilaya',(req,res)=>{
    const sql= "SELECT wilaya.*, s.nbcelles FROM wilaya INNER JOIN (SELECT WILAYA, COUNT(*) AS nbcelles FROM sites GROUP BY WILAYA) s ON wilaya.name = s.WILAYA ORDER BY wilaya.name ASC;"
    db.query(sql,(err,resultat)=>{
        if (err){
            res.send({erreur : err})
        }else{
            res.json(resultat)
            console.log(resultat)
        }
    })
})

module.exports = Router;