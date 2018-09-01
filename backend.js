const express = require('express');
const fs = require('fs');
const pg = require('pg-promise')();
const dbConfig = 'postgres://clint@localhost:5432/pukenko';
const db = pg(dbConfig);
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

let server = express();

let generateRandomScore = (min, max) => Math.floor(Math.random() * (max - min) + min);

// Create new Pukenko
// let createNewPukenko = (req, res) => {
//   let userId = 1;  // This is going to need to received from req?
//   let pukenkoName = 'pukenkoPostMan1';  // this will have to be received from the input box
//   let happinessScore = generateRandomScore(2,8);
//   let hungerScore = generateRandomScore(2,8);
//   let conductScore = generateRandomScore(2,8);
//   db.query(`INSERT INTO pukenkos (name, hunger, happiness, conduct, created_by)
//             VALUES ('${pukenkoName}', ${hungerScore}, ${happinessScore},
//                     ${conductScore}, ${userId});`
//           ).then(res.end('New Pukenko added - I hope'));
// };

let getPukenko = (req, res) => {
  let pukenkoId = req.params.id;
  db.one(`SELECT * 
          FROM pukenkos 
          WHERE pukenkos.id = '${pukenkoId}';`
        ).then((results) => {
          res.send(results);
        }).catch((e) => {
          res.send('No Such Pukenko');
        });
};

let newUserQuery = (userName, userPassword) => {
  return `INSERT INTO users (username, password)
          VALUES ('${userName}', '${userPassword}');`;
};

let newUserSignUp = (req, res) => {
  let userName = req.body.username;
  let userPassword = req.body.userpassword;
  db.query(newUserQuery(userName, userPassword))
  .then(res.end())
};

server.use(bodyParser.json());
server.use(express.static('./public'))
server.post('/signup', newUserSignUp);
server.get('/pukenkos/:id', getPukenko);
server.post('/users', createNewUser);

server.listen(3000);