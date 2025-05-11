// Backend database used: Mysql
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Aderonke@01',  
  database: 'projectdb'  
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

module.exports = connection;


//My sql database connection established
