const express = require('express');
const fs = require('fs');
const pg = require('pg-promise')();
const dbConfig = 'postgres://clint@localhost:5432/pukenko';
const db = pg(dbConfig);

let server = express();

let generateRandomScore = (min, max) => Math.floor(Math.random() * (max - min) + min);

let loadHomePage = (req, res) => {
  fs.readFile('index.html', (err, data) => {
      res.end(data);
  })
};

let loadCSS = (req, res) => {
  fs.readFile('index.css', (err, data) => {
      res.end(data);
  })
};

let loadJavaScript = (req, res) => {
  fs.readFile('index.js', (err, data) => {
      res.end(data);
  })
};

let createNewUser = (req, res) => {
    let userName = 'Test3';
    let userPassword = '34567';
    db.query(`INSERT INTO users (username, password) 
              VALUES             ('${userName}', '${userPassword}');`
            ).then(res.end('New User added to db - I hope'));
};

// Create new Pukenko
let createNewPukenko = (req, res) => {
  let userId = 1;  // This is going to need to received from req?
  let pukenkoName = 'pukenkoPostMan1';  // this will have to be received from the input box
  let happinessScore = generateRandomScore(2,8);
  let hungerScore = generateRandomScore(2,8);
  let conductScore = generateRandomScore(2,8);
  db.query(`INSERT INTO pukenkos (name, hunger, happiness, conduct, created_by)
            VALUES ('${pukenkoName}', ${hungerScore}, ${happinessScore},
                    ${conductScore}, ${userId});`
          ).then(res.end('New Pukenko added - I hope'));
};

// Need to update this query to move userId and p_ID to users_pukenkos table

// Gets specific Pukenko info (returns an object with name and pukenko stats)
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

server.get('/', loadHomePage);
server.get('/index.css', loadCSS);
server.get('/index.js', loadJavaScript);
server.get('/pukenkos/:id', getPukenko);
server.post('/pukenkos', createNewPukenko);
server.post('/users', createNewUser);

server.listen(3000);