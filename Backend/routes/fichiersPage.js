const express = require('express');
const Router = express.Router();
const multer = require('multer');
const csvtojson = require('csvtojson');
const db = require("../db");
const { authenticateJWT } = require('../auth');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

Router.post('/FichiersPage', authenticateJWT, upload.single('file'), (req, res) => {
    const { nom, date_modification } = req.body;
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
                const  ids = jsonObj.map(element => element.ID);

                const updateSql = 'UPDATE sites SET status = 0 WHERE ID IN (?)';
                const batches = [];
                const batchSize = 10000;

                for (let i = 0; i < jsonObj.length; i += batchSize) {
                    const batch = jsonObj.slice(i, i + batchSize).map(element => {
                        const { SUP, Site_Code, Site_location, Cell_CI, Cell_Name, CI_DEC, CI_HEX, LAC, LAC_HEX, Technologie, BSC_OMC, BSC, Site_Status, X, Y, COMMUNE, code_commune, ID, WILAYA, NATURE, CODE } = element;
                        return [SUP, Site_Code, Site_location, Cell_CI, Cell_Name, CI_DEC, CI_HEX, LAC, LAC_HEX, Technologie, BSC_OMC, BSC, Site_Status, X, Y, COMMUNE, code_commune, ID, WILAYA, NATURE, CODE];
                    });
                    batches.push(batch);
                }

                new Promise((resolve, reject) => {
                    db.query(updateSql, [ids], (err, result) => {
                        if (err) {
                            console.error('Error updating status:', err);
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                })
                .then(() => {
                    const insertPromises = batches.map(batch => {
                        const sql = 'INSERT INTO `sites` (`SUP`, `Site_Code`, `Site_Location`, `Cell_CI`, `Cell_Name`, `CI_DEC`, `CI_HEX`, `LAC`, `LAC_HEX`, `Technologie`, `BSC_OMC`, `BSC`, `Site_Status`, `X`, `Y`, `COMMUNE`, `code_commune`, `ID`, `WILAYA`, `NATURE`, `CODE`) VALUES ? ';
                        return new Promise((resolve, reject) => {
                            db.query(sql, [batch], (err, result) => {
                                if (err) {
                                    console.error('Error inserting batch:', err);
                                    reject(err);
                                } else {
                                    resolve(result);
                                }
                            });
                        });
                    });

                    return Promise.all(insertPromises);
                })
                .then(() => {
                    db.commit((err) => {
                        if (err) {
                            console.error('Error committing transaction:', err);
                            return db.rollback(() => {
                                res.status(500).send('Error committing transaction');
                            });
                        }
                        res.json({ message: 'All data inserted and updated successfully' });
                    });
                })
                .catch((error) => {
                    console.error('Error inserting or updating data:', error);
                    db.rollback(() => {
                        res.status(500).send('Error inserting or updating data');
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
        }
    });
});

module.exports = Router;
