const express = require('express');
const Router = express.Router();
const multer = require('multer');
const csvtojson = require('csvtojson');
const db = require("../db");
const { authenticateJWT } = require('../auth');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

Router.post('/FichiersPage',authenticateJWT, upload.single('file')   , (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const { nom, date_modification } = req.body;

    // Vérifiez que `nom` et `date_modification` existent
    if (!nom || !date_modification) {
        return res.status(400).send('Nom or date_modification is missing.');
    }

    const dateAjout = new Date();
    const dateModificationFormatted = new Date(date_modification).toISOString().slice(0, 19).replace('T', ' ');
    const dateAjoutFormatted = dateAjout.toISOString().slice(0, 19).replace('T', ' ');

    const fileInfoValues = [nom, dateAjoutFormatted, dateModificationFormatted];
    const fileInfoSql = 'INSERT INTO `fichiers` (`nom`, `date_ajout`, `date_modification`) VALUES (?, ?, ?)';

    db.beginTransaction((err) => {
        if (err) {
            console.error('Error starting transaction:', err);
            return res.status(500).send('Error starting transaction');
        }

        db.query(fileInfoSql, fileInfoValues, (err, fileInfoResult) => {
            if (err) {
                console.error('Error inserting file information:', err);
                return db.rollback(() => {
                    res.status(500).send('Error inserting file information');
                });
            }

            console.log('File information inserted successfully');

            csvtojson({
                delimiter: '|'
            })
            .fromString(req.file.buffer.toString())
            .then((jsonObj) => {
                const batchSize = 1000; // Nombre de lignes à insérer par batch
                const batches = [];

                for (let i = 0; i < jsonObj.length; i += batchSize) {
                    const batch = jsonObj.slice(i, i + batchSize).map(element => {
                        const { SUP, Site_Code, Site_location, Cell_CI, Cell_Name, CI_DEC, CI_HEX, LAC, LAC_HEX, Technologie, BSC_OMC, BSC, Site_Status, X, Y, COMMUNE, code_commune, ID, WILAYA, NATURE, CODE } = element;
                        return [SUP, Site_Code, Site_location, Cell_CI, Cell_Name, CI_DEC, CI_HEX, LAC, LAC_HEX, Technologie, BSC_OMC, BSC, Site_Status, X, Y, COMMUNE, code_commune, ID, WILAYA, NATURE, CODE];
                    });
                    batches.push(batch);
                }

                const insertPromises = batches.map(batch => {
                    const sql = 'INSERT INTO `sites` (`SUP`, `Site_Code`, `Site_Location`, `Cell_CI`, `Cell_Name`, `CI_DEC`, `CI_HEX`, `LAC`, `LAC_HEX`, `Technologie`, `BSC_OMC`, `BSC`, `Site_Status`, `X`, `Y`, `COMMUNE`, `code_commune`, `ID`, `WILAYA`, `NATURE`, `CODE`) VALUES ?';
                    return new Promise((resolve, reject) => {
                        db.query(sql, [batch], (err, resultat) => {
                            if (err) {
                                console.error('Error inserting batch:', err);
                                reject(err);
                            } else {
                                resolve(resultat);
                            }
                        });
                    });
                });

                Promise.all(insertPromises)
                    .then(() => {
                        db.commit((err) => {
                            if (err) {
                                console.error('Error committing transaction:', err);
                                return db.rollback(() => {
                                    res.status(500).send('Error committing transaction');
                                });
                            }
                            console.log("All batches inserted successfully!");
                            res.json({ message: 'All data inserted successfully' });
                        });
                    })
                    .catch((error) => {
                        console.error('Error inserting data:', error);
                        db.rollback(() => {
                            res.status(500).send('Error inserting data');
                        });
                    });
            })
            .catch((error) => {
                console.error('Error converting CSV to JSON', error);
                db.rollback(() => {
                    res.status(500).send('Error converting CSV to JSON');
                });
            });
        });
    });
});

Router.get('/FichiersPage', (req, res) => {
    const sql = 'SELECT * FROM fichiers ORDER BY date_ajout DESC;';
    db.query(sql, (err, resultat) => {
        if (err) {
            res.send({ error: err });
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

module.exports = Router;
