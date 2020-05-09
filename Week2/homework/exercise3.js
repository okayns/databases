const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week2DB",
});

const execQuery = util.promisify(connection.query.bind(connection));

connection.connect();

async function seedDatabase() {
  const nameOfCollaborators = `
SELECT a1.author_name as Author_Name, 
a2.author_name as Collabrator_Name 
FROM Authors a1 
LEFT JOIN Authors a2 
ON a1.Collaborator = a2.author_no;
`;

  const authorPaperTitle = `
SELECT a.author_name AS Author_Name, r.paper_title AS Paper_Title
FROM Authors AS a
LEFT JOIN Necessary_Table AS n
ON a.author_no = n.author_id
LEFT JOIN Research_Papers AS r
ON n.paper_id = r.paper_id
`;

  try {
    console.log(await execQuery(nameOfCollaborators));
    console.log(await execQuery(authorPaperTitle));
  } catch (error) {
    console.log(error);
    connection.end();
  } finally {
    connection.end();
  }
}

seedDatabase();
