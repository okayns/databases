const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

connection.connect();

// What are the names of countries with population greater than 8 million?
connection.query('SELECT Name FROM city WHERE Population > 8000000', function (
  err,
  result,
) {
  if (err) throw err;
  for (let key of result) {
    const greaterThan8Million = key.Name;
    console.log(
      'Names of countries with population greater than 8 million: ',
      greaterThan8Million,
    );
  }
});

// What are the names of countries that have “land” in their names?
connection.query('SELECT Name FROM country WHERE name LIKE "%land%"', function (
  err,
  result,
) {
  if (err) throw err;
  for (let key of result) {
    const citiesIncludeLand = key.Name;
    console.log(
      'Names of countries that have “land” in their names: ',
      citiesIncludeLand,
    );
  }
});

// What are the names of the cities with population in between 500,000 and 1 million?
connection.query(
  'SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000',
  function (err, result, field) {
    if (err) throw err;
    for (let key of result) {
      const citiesBetweenRange = key.Name;
      console.log(
        'names of the cities with population in between 500,000 and 1 million: ',
        citiesBetweenRange,
      );
    }
  },
);

// What's the name of all the countries on the continent ‘Europe’?
connection.query(
  'SELECT Name FROM country WHERE Continent = "Europe"',
  function (err, result) {
    if (err) throw err;
    for (let key of result) {
      const europeCountries = key.Name;
      console.log(
        'Name of all the countries on the continent ‘Europe’: ',
        europeCountries,
      );
    }
  },
);

// List all the countries in the descending order of their surface areas.
connection.query(
  'SELECT Name FROM country ORDER BY SurfaceArea DESC',
  function (err, result) {
    if (err) throw err;
    for (let key of result) {
      const sortedCountriesByDesc = key.Name;
      console.log(
        'All the countries in the descending order of their surface areas: ',
        sortedCountriesByDesc,
      );
    }
  },
);

// What are the names of all the cities in the Netherlands?
connection.query('SELECT Name FROM city WHERE CountryCode = "NLD"', function (
  err,
  result,
) {
  if (err) throw err;
  for (let key of result) {
    const netherlandCities = key.Name;
    console.log(
      'Names of all the cities in the Netherlands: ',
      netherlandCities,
    );
  }
});

// What is the population of Rotterdam?
connection.query(
  'SELECT Population FROM city WHERE name = "Rotterdam"',
  function (err, result) {
    if (err) throw err;
    for (let key of result) {
      const rotterdamPopulation = key.Population;
      console.log('Population of Rotterdam: ', rotterdamPopulation);
    }
  },
);

// What's the top 10 countries by Surface Area?
connection.query(
  'SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10',
  function (err, result, field) {
    if (err) throw err;
    for (let key of result) {
      const topTenBigSurfaces = key.Name;
      console.log('Top 10 countries by Surface Area: ', topTenBigSurfaces);
    }
  },
);

// What's the top 10 most populated cities?
connection.query(
  'SELECT Name FROM city ORDER BY Population DESC LIMIT 10',
  function (err, result, field) {
    if (err) throw err;
    for (let key of result) {
      const topTenCrowdedCities = key.Name;
      console.log('Top 10 most populated cities: ', topTenCrowdedCities);
    }
  },
);

// What is the population number of the world?
connection.query(
  'SELECT SUM(population) as PopulationOfWorld FROM country',
  function (err, result, field) {
    if (err) throw err;
    console.log(
      'Population Number of the World: ',
      result[0].PopulationOfWorld,
    );
  },
);

connection.end();
