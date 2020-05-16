const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

connection.connect();

// Give an example of a value that can be passed as name and code that would take advantage of SQL-injection and (fetch all the records in the database)

function getPopulationInjection(Country, name, cb) {
  connection.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' OR 1=1`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error('Not found'));
      cb(null, result);
    },
  );
}

// Rewrite the function so that it is no longer vulnerable to SQL injection
function getPopulationNoInjection(Country, name, code, cb) {
  connection.query(
    'SELECT Population FROM ?? WHERE Name = ? and code = ?',
    [Country, name, code],
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error('Not found'));
      cb(null, result);
    },
  );
}

getPopulationInjection('Country', 'Turkey', function (err, result) {
  if (err) throw err;
  console.log(result);
});

getPopulationNoInjection('Country', 'Turkey', 'TUR', function (err, result) {
  if (err) throw err;
  console.log(result);
});

connection.end();
