const express = require('express')
const app = express()
const cors = require('cors')

const addUserRouter = require('./routes/Adduser')
const updateUserRouter = require('./routes/updateUser')
const ListeUserRouter = require('./routes/listeUser')
const AddcellRouter = require('./routes/Addcell')
const fichiersPageRouter= require('./routes/fichiersPage')
const cellulePageRouter = require('./routes/cellulesPage')
const connexionRouter = require('./routes/connexion')
const historiqueRouter = require('./routes/historique')
const mapRouter = require('./routes/map')
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
app.use("/", historiqueRouter);
app.use("/", mapRouter);
app.use("/", updateUserRouter);
