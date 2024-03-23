const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const multer = require('multer');
const mysql = require('mysql2')
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.listen(3002,(req,res)=>{
    console.log('le serveur est sur le port 3002 !');
})

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '8520',
    database: 'pfe', 
})

app.post('/addUser',(req,res)=>{
    const nom = req.body.Nom;
    const prenom = req.body.Prenom;
    const date_naissance = req.body.Date_naissance;
    const email = req.body.Email;
    const password = req.body.Password;
    const role = req.body.Role;
    
    const sql = 'INSERT INTO users (nom,prenom,email,password,date_naissance,role) VALUES (?,?,?,?,?,?)';
    const valeurs = [nom,prenom,email,password,date_naissance,role];

    const sqlVerification = 'SELECT * FROM users WHERE email = ?'

    db.query(sqlVerification,email,(err,resultat) => {
        if(err){
            console.error('Erreur lors de la recuperation de la BDD :', err);
            res.status(500).send('rreur lors de la recuperation de la BDD ');
        }else{
            console.log("verification...")
            if(resultat.length>0){
                console.log("E-mail existant deja !")
                res.send({message: 'E-mail deja existant'})
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
    })

    
});

app.post('/',(req,res)=>{
    const email = req.body.Email;
    const password = req.body.Password;
    const sql = 'SELECT * FROM users WHERE email = ? && password = ? ';
    const valeurs = [email,password];

    db.query(sql, valeurs, (err, resultat) => {
        if (err) {
            res.send({erorr: err})
        } 
        if(resultat.length>0){
            console.log(resultat[0].role)
            res.send({role : resultat[0].role})
        }else{
            console.log('E-mail ou Mot de passe incorrect')
            res.send({message: 'E-mail ou Mot de passe incorrect'})
        }
    });
})
app.get('/listeUser',(req,res)=>{
    const sql ='SELECT * FROM users'
    db.query(sql, (err, resultat) => {
        if (err) {
            res.send({erorr: err})
        }
        else{
            res.json(resultat) 
            console.log("ok")
        }
    });

})
app.delete('/listeUser/:id',(req,res)=>{
    const id = req.params.id
    const sql = "DELETE FROM users WHERE id = ?"
    const value = [id]
    db.query(sql,value,(err,resultat)=>{
        if (err)console.log("error :",err)
        else console.log("supprimer !")
    })
})
app.get('/listeUser/:value', (req, res) => {
    const rechercheKey = '%'+req.params.value+'%'
    const value = [rechercheKey, rechercheKey, rechercheKey, rechercheKey];
    const sql = 'SELECT * FROM users WHERE id LIKE ? OR nom LIKE ? OR prenom LIKE ? OR email LIKE ?'
    db.query(sql, value, (err, resultat) => {
        if (err) {
            res.send({ error: err });
        } else {
            res.json(resultat);
            console.log("ok rechercher !");
        }
    });
});
const upload = multer();
const csvtojson = require('csvtojson');
app.post('/FichiersPage', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    const file = req.file;
  
    // Convertir le fichier CSV en JSON
    csvtojson()
      .fromString(file.buffer.toString()) // Convertir le buffer du fichier en chaîne CSV
      .then((jsonObj) => {
        console.log(jsonObj);
        res.status(200).json(jsonObj); // Renvoyer le JSON résultant
      })
      .catch((error) => {
        console.error('Error converting CSV to JSON', error);
        res.status(500).send('Error converting CSV to JSON');
      });
  });