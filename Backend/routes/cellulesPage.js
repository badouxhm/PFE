const express = require('express');
const Router = express.Router();
const db = require('../db')


Router.get('/cellulesPage',(req,res)=>{
    const sql ='SELECT * FROM sites'
    db.query(sql, (err, resultat) => {
        if (err) {
            res.send({erorr: err})
        }
        else{
            res.json(resultat) 
            console.log(resultat) 
        }
    });

})
Router.delete('/cellulesPage/:id',(req,res)=>{
    
    const id = req.params.id
    const sql = "UPDATE sites SET status = CASE WHEN status = 1 THEN 0 ELSE 1 END WHERE id_c = ?"
    const value = [id]
    db.query(sql,value,(err,resultat)=>{
        if (err)console.log("error :",err)
        else console.log("supprimer !")
    })
})
Router.put('/updateCell/:id',(req,res)=>{
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
    const id_c = req.params.id
    
    const sql = "UPDATE sites SET SUP = ?,Site_Code = ?,Site_Location = ?,Cell_CI = ?,Cell_Name = ?,CI_DEC = ?,CI_HEX = ?,LAC = ?,LAC_HEX = ?,Technologie = ?,BSC_OMC = ?,BSC = ?,Site_Status = ?,X = ?,Y = ?,COMMUNE = ?,code_commune = ?,ID = ?,WILAYA = ?,NATURE = ?,CODE = ? WHERE id_c = ?";
    const valeurs = [SUP, Site_Code, Site_location, Cell_CI, Cell_Name, CI_DEC, CI_HEX, LAC, LAC_HEX, Technologie, BSC_OMC, BSC, Site_Status, X, Y, COMMUNE, code_commune, ID, WILAYA, NATURE, CODE,id_c];
    db.query(sql,valeurs,(err,resultat)=>{
        if (err)console.log("error :",err)
        else console.log("modifier !")
    })
})
Router.get('/cellulesPage/:value', (req, res) => {
    const rechercheKey = '%'+req.params.value+'%'
    const value = [rechercheKey, rechercheKey, rechercheKey, rechercheKey, rechercheKey,rechercheKey, rechercheKey, rechercheKey, rechercheKey, rechercheKey,rechercheKey, rechercheKey, rechercheKey, rechercheKey, rechercheKey,rechercheKey, rechercheKey, rechercheKey, rechercheKey, rechercheKey,rechercheKey, rechercheKey];
    
    const sql = 'SELECT * FROM sites WHERE id_c LIKE ? OR SUP LIKE ? OR Site_Code LIKE ? OR Site_location LIKE ? OR Cell_CI LIKE ? OR Cell_Name LIKE ? OR CI_DEC LIKE ? OR CI_HEX LIKE ? OR LAC LIKE ? OR LAC_HEX LIKE ? OR Technologie LIKE ? OR BSC_OMC LIKE ? OR BSC LIKE ? OR Site_Status LIKE ? OR X LIKE ? OR Y LIKE ? OR COMMUNE LIKE ? OR code_commune LIKE ? OR ID LIKE ? OR WILAYA LIKE ? OR NATURE LIKE ? OR CODE LIKE ?'
    db.query(sql, value, (err, resultat) => {
        if (err) {
            res.send({ error: err });
            console.log(err);
        } else {
            res.json(resultat);
            console.log("ok rechercher !");
        }
    });
});

module.exports = Router;