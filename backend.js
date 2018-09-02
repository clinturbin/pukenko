const express = require('express');
const fs = require('fs');
const pg = require('pg-promise')();
const dbConfig = 'postgres://clint@localhost:5432/pukenko';
const db = pg(dbConfig);
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

let server = express();

let generateRandomScore = (min, max) => Math.floor(Math.random() * (max - min) + min);

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
  .then( () => {
    res.send(req.body)
  })
};

let getUserInfoQuery = (userName, userPassword) => {
  return `SELECT *
          FROM users
          WHERE username = '${userName}' AND password = '${userPassword}';`;
};


let userLogin = (req, res) => {
  let userName = req.params.name;
  let userPassword = req.params.password;
  db.one(getUserInfoQuery(userName, userPassword))
  .then( (data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send({id: "error"});
  })
};

let createPukenkoQuery = (name, hunger, happiness, conduct, createdBy) => {
  return `INSERT INTO pukenkos (name, hunger, happiness, conduct, created_by) 
          VALUES ('${name}', ${hunger}, ${happiness}, ${conduct}, ${createdBy});`; 
};

let createNewPukenko = (req, res) => {
  let pukenkoName = req.body.name;
  let hunger = generateRandomScore(2, 8);
  let happiness = generateRandomScore(2, 8);
  let conduct = generateRandomScore(2, 8);
  let createdBy = req.body.userid;
  db.query(createPukenkoQuery(pukenkoName, hunger, happiness, conduct, createdBy))
  .then( () => {
    res.send(req.body);
  })
};

server.use(bodyParser.json());
server.use(express.static('./public'))
server.post('/signup', newUserSignUp);
server.get('/login/:name&:password', userLogin);
server.post('/pukenkos', createNewPukenko);

server.listen(3000);