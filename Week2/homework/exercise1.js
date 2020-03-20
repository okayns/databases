const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword"
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_DATABASE = `CREATE DATABASE IF NOT EXISTS homeworkDB`;

  const USE_DATABASE = `USE homeworkDB`;

  const CREATE_AUTHORS_TABLE = `
		CREATE TABLE IF NOT EXISTS authors (
			author_no INT PRIMARY KEY,
			author_name VARCHAR(50),
			university VARCHAR(50),
			date_of_birth DATE,
			h_index INT,
			gender ENUM("m", "f"),
			friend INT
		);`;

  const ADD_FOREIGNKEY_TABLE = `
		ALTER TABLE authors
		ADD CONSTRAINT fk_fri FOREIGN KEY(
		friend) REFERENCES authors(author_no);`;

  connection.connect();

  try {
    // call the function that returns promise
    await execQuery(CREATE_DATABASE);
    await execQuery(USE_DATABASE);
    await execQuery(CREATE_AUTHORS_TABLE);
    await execQuery(ADD_FOREIGNKEY_TABLE);
  } catch (error) {
    console.error(error);
    connection.end();
  } finally {
    connection.end();
  }
}

seedDatabase();
