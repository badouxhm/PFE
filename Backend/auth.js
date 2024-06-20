
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwtSecret } = require('./config'); 

const generateToken = (id,matricule,nom,prenom,email,tel,role,poste) => {
    return jwt.sign({id:id ,matricule:matricule, nom:nom ,prenom:prenom, email:email ,tel:tel,nom:nom,role:role,poste:poste}, jwtSecret, { expiresIn: '1d' });
};

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, jwtSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};

module.exports = {
    generateToken,
    authenticateJWT,
    hashPassword,
    comparePassword
};
