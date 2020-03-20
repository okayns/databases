const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "homeworkDB"
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const GET_AUTHORS_FRIENDS_NAMES = `
    SELECT first.author_name
      AS 'AUTHOR NAME',
      second.author_name AS 'FRIEND NAME'
      FROM authors first, authors second
      WHERE first.author_no = second.friend`;

  const GET_PAPERS_AND_AUTHORS = `
    SELECT author_name, paper_title
    FROM researchers_papers, authors
    WHERE researchers_papers.author_no = authors.author_no`;

  connection.connect();

  try {
    const authorsAndFriendsNames = await execQuery(GET_AUTHORS_FRIENDS_NAMES);
    console.log("AUTHORS AND FRIENDS NAMES:\n", authorsAndFriendsNames);

    const papersAndAuthors = await execQuery(GET_PAPERS_AND_AUTHORS);
    console.log("AUTHORS AND THEIR PAPERS: \n", papersAndAuthors);
  } catch (error) {
    console.error(error);
    connection.end();
  } finally {
    connection.end();
  }
}

seedDatabase();
