const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

const tables = [
  "CREATE TABLE Invitee (invitee_no int, invitee_name varchar(30), invited_by varchar(30))",
  "CREATE TABLE Room (room_no int, room_name varchar(30), floor_number int)",
  "CREATE TABLE Meeting (meeting_no int, meeting_title varchar(30), starting_time timestamp, ending_time timestamp, room_no INT)",
];

const insert_queries = [
  "INSERT INTO Invitee VALUES (1006, 'Ali', 'Jack')",
  "INSERT INTO Invitee VALUES (1007, 'Veli',  'Daniel')",
  "INSERT INTO Invitee VALUES (1008, 'Kaan', 'John')",
  "INSERT INTO Invitee VALUES (1009, 'Toygun',  'Klara')",
  "INSERT INTO Invitee VALUES (1010, 'Zeynep', 'Claire')",
  "INSERT INTO Room VALUES (113, 'ABC Room', 1)",
  "INSERT INTO Room VALUES (223, 'Team Territory', 2)",
  "INSERT INTO Room VALUES (338, 'Collective IQ Room', 3)",
  "INSERT INTO Room VALUES (313, 'Inspiration Station', 3)",
  "INSERT INTO Room VALUES (513, 'Hospitality Hub', 5)",
  "INSERT INTO Meeting VALUES (1, 'Building for the Future', '2020-11-03 12:00', '2020-12-03 12:00', '1')",
  "INSERT INTO Meeting VALUES (2, 'Customer Focus', '2020-11-03 12:00', '2020-11-04 12:00', '2')",
  "INSERT INTO Meeting VALUES (3, 'Do Great Things', '2020-01-23 08:00', '2020-01-24 12:00', '3')",
  "INSERT INTO Meeting VALUES (4, 'Igniting Team Spirit', '2020-08-13 12:00', '2020-11-13 12:00', '1')",
  "INSERT INTO Meeting VALUES (5, 'Anything is Possible', '2020-03-14 12:00', '2020-04-13 12:00', '2')",
];

connection.connect();

connection.query("DROP DATABASE IF EXISTS meetup", function (err, result) {
  if (err) throw err;
});

connection.query("CREATE DATABASE meetup", function (err, result) {
  if (err) throw err;
  console.log("Database created");
});

connection.query("use meetup", function (err, result) {
  if (err) throw err;
  console.log("Database selected");
});

tables.forEach((item) => {
  connection.query(item, function (err, result) {
    if (err) throw err;
  });
  console.log(`Tables created`);
});

insert_queries.forEach((value) => {
  connection.query(value, function (error, results, fields) {
    if (error) {
      throw error;
    }
  });
  console.log("Values Inserted");
});

connection.end();
