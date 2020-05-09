const mysql = require("mysql");
const util = require("util");
const authors = require("./authors");
const papers = require("./papers");
const necessaryTableData = require("./necessaryTableData");
const collaboratorData = require("./collabrator");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week2DB",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_Research_Papers_TABLE = `
    CREATE TABLE IF NOT EXISTS Research_Papers (
      paper_id INT PRIMARY KEY,
      paper_title VARCHAR(50),
      conference VARCHAR(50),
      publish_date DATE
    );`;

  const CREATE_NecessaryTable = `
  CREATE TABLE IF NOT EXISTS Necessary_Table (
    author_id INT,
    paper_id INT,
    CONSTRAINT FK_Author FOREIGN KEY(author_id) REFERENCES Authors(author_no),
    CONSTRAINT FK_Paper FOREIGN KEY(paper_id) REFERENCES Research_Papers(paper_id),
    CONSTRAINT PK_Author_Paper PRIMARY KEY(author_id, paper_id)
  );`;

  function rng() {
    return 101 + Math.floor(Math.random() * collaboratorData.length);
  }

  connection.connect();

  try {
    await execQuery(CREATE_Research_Papers_TABLE);
    await execQuery(CREATE_NecessaryTable);

    authors.forEach(async (author) => {
      await execQuery("INSERT INTO Authors SET ?", author);
    });

    papers.forEach(async (paper) => {
      await execQuery("INSERT INTO Research_Papers SET ?", paper);
    });

    necessaryTableData.forEach(async (data) => {
      await execQuery("INSERT INTO Necessary_Table SET ?", data);
    });

    const setCollabratorColumn = await collaboratorData.map((value) =>
      execQuery(
        `UPDATE Authors SET Collaborator = ${rng()} WHERE author_no = ${value}`
      )
    );
    await Promise.all[setCollabratorColumn];
  } catch (error) {
    console.error(error);
    connection.end();
  } finally {
    connection.end();
  }
}

seedDatabase();
