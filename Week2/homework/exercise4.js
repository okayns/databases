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
  const NUMBER_OF_TOTAL_PAPERS_AND_AUTHORS = `
		SELECT COUNT(paper_id) AS 'The Number of Total Research Papers',
      COUNT(DISTINCT author_no) AS 'The Number of Total Authors'
      FROM researchers_papers`;

  const NUMBER_OF_TOTAL_PAPERS_BY_FEMALE_AUTHORS = `
		SELECT COUNT(researchers_papers.paper_id)
      AS 'The Number of Total Papers Published By Female Authors'
      FROM researchers_papers
      JOIN authors
      ON researchers_papers.author_no = authors.author_no
      WHERE authors.gender ='f'`;

  const AVARAGE_H_INDEX_PER_UNIVERSITY = `
      SELECT AVG(authors.h_index), university
      FROM authors
      GROUP BY university`;

  const SUM_RESEARCH_PAPERS_PER_UNIVERSITY = `
    SELECT COUNT(researchers_papers.paper_id)
      AS 'Sum of the research papers of the authors per university', authors.university
      FROM researchers_papers
      JOIN authors
      ON researchers_papers.author_no = authors.author_no
      GROUP BY authors.university`;

  const MIN_AND_MAX_H_INDEX_PER_UNIVERSITY = `
    SELECT MIN(h_index) AS 'MIN of h-index',
      MAX(h_index) AS 'MAX of h-index', university
      FROM authors
      GROUP BY university`;

  connection.connect();

  try {
    const results = {
      totalPapersAndAuthors: execQuery(NUMBER_OF_TOTAL_PAPERS_AND_AUTHORS),
      totalPapersByFemaleAuthors: execQuery(
        NUMBER_OF_TOTAL_PAPERS_BY_FEMALE_AUTHORS
      ),
      averageHindexPerUniversity: execQuery(AVARAGE_H_INDEX_PER_UNIVERSITY),
      totalPapersPerUniversity: execQuery(SUM_RESEARCH_PAPERS_PER_UNIVERSITY),
      minAndMaxHindex: execQuery(MIN_AND_MAX_H_INDEX_PER_UNIVERSITY)
    };

    await Promise.all(
      Object.keys(results).map(async key => {
        console.log(`${key}:\n`, await results[key]);
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
