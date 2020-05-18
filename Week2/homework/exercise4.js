const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week2DB',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const query1 = `
    SELECT rp.paper_title, COUNT(DISTINCT n.author_id) AS 'Authors'
    FROM  Author_and_Paper n 
    RIGHT JOIN Research_Papers rp
    ON rp.paper_id = n.paper_id
	GROUP BY rp.paper_id`;

  const query2 = `
    SELECT a.gender , COUNT(n.paper_id) 
    FROM Author_and_Paper n 
    INNER JOIN Authors a 
    on a.author_no = n.author_id 
    WHERE a.gender ='f';
    `;

  const query3 = `SELECT AVG(h_index),university FROM Authors GROUP BY university `;

  const query4 = `
    SELECT a.university ,
    COUNT(DISTINCT rp.paper_title) 
    AS 'Sum of the Research Papers'
    FROM Authors a 
    LEFT JOIN Author_and_Paper n
    ON (a.author_no = n.author_id)
    LEFT JOIN Research_Papers rp
    ON (n.paper_id = rp.paper_id) 
    GROUP BY a.university
    `;
  const query5 = `
    SELECT university,min(h_index) as MIN_Value, 
    max(h_index) as MAX_Value
    FROM Authors
    GROUP BY university;`;
  connection.connect();

  try {
    console.log(await execQuery(query1));
    console.log('/-/-/-/-/-/-/-/');
    console.log(await execQuery(query2));
    console.log('/-/-/-/-/-/-/-/');
    console.log(await execQuery(query3));
    console.log('/-/-/-/-/-/-/-/');
    console.log(await execQuery(query4));
    console.log('/-/-/-/-/-/-/-/');
    console.log(await execQuery(query5));
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
}

seedDatabase();
