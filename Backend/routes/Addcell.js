const express = require('express');
const Router = express.Router();
const db = require("../db")

Router.post('/addCell',(req,res)=>{
    const SUP = req.body.sup;
    const Site_Code = req.body.siteCode;
    const Site_location = req.body.siteLocation;
    const Cell_CI = req.body.cellCi;
    const Cell_Name = req.body.cellName;
    const CI_DEC = req.body.ciDec;
    const CI_HEX = req.body.ciHex;
    const LAC = req.body.lac;
    const LAC_HEX = req.body.lacHex;
    const Technologie = req.body.technologie;
    const BSC_OMC = req.body.bscOmc; 
    const BSC = req.body.bsc;
    const Site_Status = req.body.siteStatus;
    const X = req.body.x;
    const Y = req.body.y;
    const COMMUNE = req.body.commune;
    const code_commune = req.body.codeCommune;
    const ID = req.body.id;
    const WILAYA = req.body.wilaya;
    const NATURE = req.body.nature;
    const CODE = req.body.code;
    
    const sql = `
    INSERT INTO sites (SUP, Site_Code, Site_location, Cell_CI, Cell_Name, CI_DEC, CI_HEX, LAC, LAC_HEX, Technologie, BSC_OMC, BSC, Site_Status, X, Y, COMMUNE, code_commune, ID, WILAYA, NATURE, CODE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const valeurs = [SUP, Site_Code, Site_location, Cell_CI, Cell_Name, CI_DEC, CI_HEX, LAC, LAC_HEX, Technologie, BSC_OMC, BSC, Site_Status, X, Y, COMMUNE, code_commune, ID, WILAYA, NATURE, CODE];

    const sqlVerification = 'SELECT * FROM sites WHERE id = ?'

    db.query(sqlVerification,ID,(err,resultat) => {
        if(err){
            console.error('Erreur lors de la recuperation de la BDD :', err);
            res.status(500).send('erreur lors de la recuperation de la BDD ');
        }else{
            console.log("verification...")
            if(resultat.length>0){
                console.log("cellule existante deja !")
                res.send({message: 'Cellule deja existante'})
            }else{
                db.query(sql, valeurs, (err, resultat) => {
                    if (err) {
                        console.error('Erreur lors de l\'insertion dans la base de données :', err);
                        res.status(500).send('Erreur lors de l\'insertion dans la base de données');
                    } 
                    
                    else {
                        console.log(`utilisateur ajouté à la BDD `);

                    }
                });
            }
        }
    });
})


module.exports = Router