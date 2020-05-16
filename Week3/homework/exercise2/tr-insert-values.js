const mysql = require('mysql');
const util = require('util');
const accountData = require('./accountData');
const accountChangeData = require('./accountChangeDatas');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week3DB',
});

const execQuery = util.promisify(connection.query.bind(connection));

connection.connect();

async function insertValues() {
  try {
    accountData.forEach(async (data) => {
      await execQuery('INSERT INTO account SET ?', data);
    });
    accountChangeData.forEach(async (data) => {
      await execQuery('INSERT INTO account_changes SET ?', data);
    });
  } catch (error) {
    console.log(error);
    connection.end();
  } finally {
    connection.end();
  }
}
insertValues();
