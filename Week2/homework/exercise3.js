const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost",
	user: "hyfuser",
	password: "hyfpassword",
	database: "homeworkDB"
});

const execQuery = util.promisify(connection.query.bind(
	connection));

async function seedDatabase() {
	const GET_AUTHORS_FRIENDS_NAMES = `
    SELECT second.author_name AS 'AUTHOR NAME',
      first.author_name AS 'FRIEND NAME'
      FROM authors AS first
      RIGHT JOIN authors AS second
      ON first.author_no = second.friend`;

	const GET_PAPERS_AND_AUTHORS = `
    SELECT first.author_name AS 'Author Name',
      second.paper_title AS 'Paper Title'
      FROM authors AS first
      LEFT JOIN author_paper_relation AS third
      ON first.author_no = third.author_id
      LEFT JOIN researchers_papers AS second
      ON third.paper_id = second.paper_id`;

	connection.connect();

	try {
		const authorsAndFriendsNames = await execQuery(
			GET_AUTHORS_FRIENDS_NAMES);
		console.log("AUTHORS AND FRIENDS NAMES:\n",
			authorsAndFriendsNames);

		const papersAndAuthors = await execQuery(
			GET_PAPERS_AND_AUTHORS);
		console.log("AUTHORS AND THEIR PAPERS: \n",
			papersAndAuthors);
	} catch (error) {
		console.error(error);
		connection.end();
	} finally {
		connection.end();
	}
}

seedDatabase();
