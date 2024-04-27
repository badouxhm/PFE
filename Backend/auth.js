// auth.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwtSecret } = require('./config'); // Assurez-vous d'avoir ce fichier avec votre clé secrète JWT

// Fonction pour générer un token JWT
const generateToken = (email,password) => {
    return jwt.sign({email:email , password:password}, jwtSecret, { expiresIn: '1h' });
};

// Middleware pour protéger les routes avec JWT
const authenticateJWT = (req, res, next) => {
    const token = req.body.authorization;
    if (token) {
        jwt.verify(token, jwtSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            console.log("vous etes authentifié !")
            req.user = user;
            
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Fonction pour hacher un mot de passe
const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

// Fonction pour comparer un mot de passe en clair avec un hachage de mot de passe
const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};

module.exports = {
    generateToken,
    authenticateJWT,
    hashPassword,
    comparePassword
};
