const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const DROP_DATABASE = `DROP DATABASE IF EXISTS week2DB`;
  const CREATE_HOMEWORK_DATABASE = `CREATE DATABASE IF NOT EXISTS week2DB`;
  const USE_DATABASE = `USE week2DB`;
  const CREATE_Authors_TABLE = `
    CREATE TABLE IF NOT EXISTS Authors (
      author_no INT PRIMARY KEY,
      author_name VARCHAR(50),
      university VARCHAR(50),
      date_of_birth DATE,
      h_index INT,
      gender ENUM('m', 'f')
    );`;

  const CREATE_AuthorColumn = `
    ALTER TABLE Authors
    ADD COLUMN Collaborator INT;`;

  const CREATE_ForeignKEY_Collabrator = `
    ALTER TABLE Authors ADD CONSTRAINT FK_Collabrator FOREIGN KEY(Collaborator) REFERENCES Authors(author_no);`;

  connection.connect();
  try {
    await Promise.all[
      (execQuery(DROP_DATABASE),
      execQuery(CREATE_HOMEWORK_DATABASE),
      execQuery(USE_DATABASE),
      execQuery(CREATE_Authors_TABLE),
      execQuery(CREATE_AuthorColumn),
      execQuery(CREATE_ForeignKEY_Collabrator))
    ];
  } catch (error) {
    console.error(error);
    connection.end();
  } finally {
    connection.end();
  }
}

seedDatabase();
