const mysql = require('mysql2');

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '8520',
    database: 'pfe', 
});

module.exports = db;
