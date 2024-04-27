const express = require('express');
const Router = express.Router();
const multer = require('multer');
const db = require("../db")

const upload = multer();
const csvtojson = require('csvtojson');

Router.post('/FichiersPage', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const file = req.file;
    const nom = req.body.nom;
    const dateModification = req.body.date_modification;
    const dateAjout = new Date();
    const dateModification1 = dateModification.slice(0, 19).replace('T', ' ');
    const dateAjout1 = dateAjout.toISOString().slice(0, 19).replace('T', ' ');
    
    const fileInfoValues = [nom, dateAjout1,dateModification1];
    const fileInfoSql = 'INSERT INTO `fichiers` (`nom`, `date_ajout`, `date_modification`) VALUES (?, ?, ?)';
    db.query(fileInfoSql, fileInfoValues, (err, fileInfoResult) => {
        if (err) {
            console.error('Error inserting file information:', err);
            return res.status(500).send('Error inserting file information');
        }
    
        console.log('File information inserted successfully');

        // Convertir le fichier CSV en JSON
        csvtojson({
            delimiter: '|'
        })
        .fromString(file.buffer.toString()) // Convertir le buffer du fichier en chaîne CSV
        .then((jsonObj) => {
            const promises = jsonObj.map((Element) => {
                const SUP = Element.SUP;
                const Site_Code = Element.Site_Code;
                const Site_location = Element.Site_location;
                const Cell_CI = Element.Cell_CI;
                const Cell_Name = Element.Cell_Name;
                const CI_DEC = Element.CI_DEC;
                const CI_HEX = Element.CI_HEX;
                const LAC = Element.LAC;
                const LAC_HEX = Element.LAC_HEX;
                const Technologie = Element.Technologie;
                const BSC_OMC = Element.BSC_OMC;
                const BSC = Element.BSC;
                const Site_Status = Element.Site_Status;
                const X = Element.X;
                const Y = Element.Y;
                const COMMUNE = Element.COMMUNE;
                const code_commune = Element.code_commune;
                const ID = Element.ID;
                const WILAYA = Element.WILAYA;
                const NATURE = Element.NATURE;
                const CODE = Element.CODE;
                const VALUES = [SUP, Site_Code, Site_location, Cell_CI, Cell_Name, CI_DEC, CI_HEX, LAC, LAC_HEX, Technologie, BSC_OMC, BSC, Site_Status, X, Y, COMMUNE, code_commune, ID, WILAYA, NATURE, CODE];

                const sql = 'INSERT INTO `sites` (`SUP`, `Site_Code`, `Site_Location`, `Cell_CI`, `Cell_Name`, `CI_DEC`, `CI_HEX`, `LAC`, `LAC_HEX`, `Technologie`, `BSC_OMC`, `BSC`, `Site_Status`, `X`, `Y`, `COMMUNE`, `code_commune`, `ID`, `WILAYA`, `NATURE`, `CODE`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                return new Promise((resolve, reject) => {
                    db.query(sql, VALUES, (err, resultat) => {
                        if (err) {
                            console.error('Error inserting data:', err);
                            reject(err);
                        } else {
                            resolve(resultat);
                        }
                    });
                });
            });

            Promise.all(promises)
            .then(() => {
                console.log("LISTE INSEREE !");
                res.json({ message: 'All data inserted successfully' });
            })
            .catch((error) => {
                console.error('Error inserting data:', error);
                res.status(500).send('Error inserting data');
            });
        })
        .catch((error) => {
            console.error('Error converting CSV to JSON', error);
            res.status(500).send('Error converting CSV to JSON');
        });
    });
});
Router.get('/FichiersPage', (req, res) => {
    const sql = 'SELECT * FROM fichiers ORDER BY date_ajout DESC;';
    db.query(sql, (err, resultat) => {
        if (err) {
            res.send({ error: err }); // Correction de la faute de frappe ici
        } else {
            resultat.forEach(item => {
                if (item.date_ajout instanceof Date) {
                    item.date_ajout = item.date_ajout.toISOString().slice(0, 19).replace('T', ' ');
                }
                if (item.date_modification instanceof Date) {
                    item.date_modification = item.date_modification.toISOString().slice(0, 19).replace('T', ' ');
                }
            });
            
            res.json(resultat);
            console.log(typeof resultat[0].date_ajout)
            console.log("fichiers ok !");
        }
    });
});

module.exports = Router ;