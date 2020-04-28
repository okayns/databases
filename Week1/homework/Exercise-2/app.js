const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

connection.connect();

// What are the names of countries with population greater than 8 million?
connection.query("SELECT * FROM city WHERE Population > 8000000", function (
  err,
  result
) {
  if (err) throw err;
  for (let key of result) {
    const greaterThan8Million = key.Name;
    // console.log(greaterThan8Million);
  }
});

// What are the names of countries that have “land” in their names?
connection.query('SELECT * FROM country WHERE name LIKE "%land%"', function (
  err,
  result
) {
  if (err) throw err;
  for (let key of result) {
    const citiesIncludeLand = key.Name;
    // console.log(citiesIncludeLand);
  }
});

// What are the names of the cities with population in between 500,000 and 1 million?
connection.query(
  "SELECT * FROM city WHERE Population BETWEEN 500000 AND 1000000",
  function (err, result, field) {
    if (err) throw err;
    for (let key of result) {
      const citiesBetweenRange = key.Name;
      // console.log(citiesBetweenRange);
    }
  }
);

// What's the name of all the countries on the continent ‘Europe’?
connection.query('SELECT * FROM country WHERE Continent = "Europe"', function (
  err,
  result
) {
  if (err) throw err;
  for (let key of result) {
    const europeCountries = key.Name;
    // console.log(europeCountries);
  }
});

// List all the countries in the descending order of their surface areas.
connection.query("SELECT * FROM country ORDER BY SurfaceArea DESC", function (
  err,
  result
) {
  if (err) throw err;
  for (let key of result) {
    const sortedCountriesByDesc = key.Name;
    // console.log(sortedCountriesByDesc);
  }
});

// What are the names of all the cities in the Netherlands?
connection.query('SELECT * FROM city WHERE CountryCode = "NLD"', function (
  err,
  result
) {
  if (err) throw err;
  for (let key of result) {
    const netherlandCities = key.Name;
    // console.log(netherlandCities);
  }
});

// What is the population of Rotterdam?
connection.query('SELECT * FROM city WHERE name = "Rotterdam"', function (
  err,
  result
) {
  if (err) throw err;
  for (let key of result) {
    const rotterdamPopulation = key.Population;
    // console.log(rotterdamPopulation);
  }
});

// What's the top 10 countries by Surface Area?
connection.query(
  "SELECT * FROM country ORDER BY SurfaceArea DESC LIMIT 10",
  function (err, result, field) {
    if (err) throw err;
    for (let key of result) {
      const topTenBigSurfaces = key.Name;
      // console.log(topTenBigSurfaces);
    }
  }
);

// What's the top 10 most populated cities?
connection.query(
  "SELECT * FROM city ORDER BY Population DESC LIMIT 10",
  function (err, result, field) {
    if (err) throw err;
    for (let key of result) {
      const topTenCrowdedCities = key.Name;
      // console.log(topTenCrowdedCities);
    }
  }
);

// What is the population number of the world?
connection.query("SELECT * FROM country", function (err, result, field) {
  if (err) throw err;
  let sum = 0;
  for (let key of result) {
    sum += key.Population;
  }
  console.log(sum);
});

// What is the population number of the world?
connection.query(
  "SELECT SUM(population) as PopulationOfWorld FROM country",
  function (err, result, field) {
    if (err) throw err;
    console.log(result);
  }
);

connection.end();
