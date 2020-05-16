const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

const execQuery = util.promisify(connection.query.bind(connection));

connection.connect();

async function createTable() {
  const DROP_DATABASE = `DROP DATABASE IF EXISTS week3DB`;
  const CREATE_HOMEWORK_DATABASE = `CREATE DATABASE IF NOT EXISTS week3DB`;
  const USE_DATABASE = `USE week3DB`;

  const CREATE_account_TABLE = `
  CREATE TABLE IF NOT EXISTS account(
    account_number INT PRIMARY KEY, 
    balance INT
    )`;

  const CREATE_account_changes_TABLE = `
  CREATE TABLE IF NOT EXISTS account_changes(
    change_number INT PRIMARY KEY, 
    account_number INT, 
    amount FLOAT,
    changed_date TIMESTAMP,
    remark varchar(30),
    CONSTRAINT FK_Account FOREIGN KEY(account_number) 
    REFERENCES account(account_number)
    )`;
  try {
    await execQuery(DROP_DATABASE);
    await execQuery(CREATE_HOMEWORK_DATABASE);
    await execQuery(USE_DATABASE);
    await execQuery(CREATE_account_TABLE);
    await execQuery(CREATE_account_changes_TABLE);
  } catch (err) {
    console.error(err);
    connection.end();
  } finally {
    connection.end();
  }
}

createTable();
