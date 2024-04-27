const express = require('express')
const app = express()
const cors = require('cors')

const addUserRouter = require('./routes/Adduser')
const ListeUserRouter = require('./routes/listeUser')
const AddcellRouter = require('./routes/Addcell')
const fichiersPageRouter= require('./routes/fichiersPage')
const cellulePageRouter = require('./routes/cellulesPage')
const connexionRouter = require('./routes/connexion')
const {authenticateJWT} = require('./auth')
app.use(express.json())
app.use(cors())
app.listen(3002,(req,res)=>{
    console.log('le serveur est sur le port 3002 !');
})
app.use("/", connexionRouter);
app.use("/", addUserRouter);
app.use("/", ListeUserRouter);
app.use("/", AddcellRouter);
app.use("/", fichiersPageRouter);
app.use("/", cellulePageRouter);
