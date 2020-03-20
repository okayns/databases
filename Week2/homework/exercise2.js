const util = require("util");
const mysql = require("mysql");
const fs = require("fs");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "homeworkDB"
});

const execQuery = util.promisify(connection.query.bind(connection));
const readFile = util.promisify(fs.readFile);

async function seedDatabase() {
  const CREATE_RESEARCHERSPAPERS_TABLE = `
		CREATE TABLE IF NOT EXISTS Researchers_Papers (
      paper_id INT PRIMARY KEY,
      paper_title TEXT,
      conference TEXT,
      publish_date DATE,
      author_no INT
      );`;

  const ADD_FOREIGNKEY_TABLE = `
    ALTER TABLE researchers_papers
      ADD CONSTRAINT fk_author
      FOREIGN KEY(author_no)
      REFERENCES authors(author_no);`;

  connection.connect();

  try {
    await execQuery(CREATE_RESEARCHERSPAPERS_TABLE);
    await execQuery(ADD_FOREIGNKEY_TABLE);

    const authorsData = await readFile(__dirname + "/authors.json", "utf8");
    const authors = await JSON.parse(authorsData);
    const authorsPromises = await authors.map(author =>
      execQuery("INSERT INTO authors SET ?", author)
    );

    const papersData = await readFile(
      __dirname + "/researchers_papers.json",
      "utf8"
    );
    const papers = await JSON.parse(papersData);
    const papersPromises = await papers.map(paper =>
      execQuery("INSERT INTO researchers_papers SET ?", paper)
    );

    await Promise.all[(authorsPromises, papersPromises)];
  } catch (error) {
    console.error(error);
    connection.end();
  } finally {
    connection.end();
  }
}

seedDatabase();
