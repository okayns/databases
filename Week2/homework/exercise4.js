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
	const NUMBER_OF_TOTAL_PAPERS_AND_AUTHORS = `
		SELECT a.paper_title AS 'PAPER TITLE',
			COUNT(b.author_id) AS 'THE NUMBER OF TOTAL AUTHORS'
			FROM researchers_papers AS a
			LEFT JOIN author_paper_relation AS b
			ON a.paper_id=b.paper_id
			GROUP BY a.paper_id`;

	const NUMBER_OF_TOTAL_PAPERS_BY_FEMALE_AUTHORS = `
		SELECT COUNT(a.paper_id) AS 'The number of papers published by all female authors'
			FROM researchers_papers AS a
			LEFT JOIN author_paper_relation AS b
			ON a.paper_id=b.paper_id
			LEFT JOIN authors AS c
			ON b.author_id=c.author_no
			WHERE c.gender='f'`;

	const AVARAGE_H_INDEX_PER_UNIVERSITY = `
    SELECT AVG(h_index), university
      FROM authors
      GROUP BY university`;

	const SUM_RESEARCH_PAPERS_PER_UNIVERSITY = `
    SELECT c.university AS 'UNIVERSITY',
      COUNT(a.paper_id) AS 'Sum of the research papers'
      FROM researchers_papers AS A
      LEFT JOIN author_paper_relation AS b
      ON a.paper_id=b.paper_id
      RIGHT JOIN authors AS c
      ON b.author_id = c.author_no
      GROUP BY university`;

	const MIN_AND_MAX_H_INDEX_PER_UNIVERSITY = `
    SELECT MIN(h_index) AS 'MIN of h-index',
      MAX(h_index) AS 'MAX of h-index', university
      FROM authors
      GROUP BY university`;

	connection.connect();

	try {
		const results = {
			totalPapersAndAuthors: execQuery(
				NUMBER_OF_TOTAL_PAPERS_AND_AUTHORS),
			totalPapersByFemaleAuthors: execQuery(
				NUMBER_OF_TOTAL_PAPERS_BY_FEMALE_AUTHORS
			),
			averageHindexPerUniversity: execQuery(
				AVARAGE_H_INDEX_PER_UNIVERSITY),
			totalPapersPerUniversity: execQuery(
				SUM_RESEARCH_PAPERS_PER_UNIVERSITY),
			minAndMaxHindex: execQuery(
				MIN_AND_MAX_H_INDEX_PER_UNIVERSITY)
		};

		await Promise.all(
			Object.keys(results)
			.map(async key => {
				console.log(`${key}:\n`, await results[
					key]);
			})
		);
	} catch (error) {
		console.error(error);
		connection.end();
	} finally {
		connection.end();
	}
}

seedDatabase();
