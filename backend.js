const express = require('express');
const pg = require('pg-promise')();
const dbConfig = 'postgres://clint@localhost:5432/pukenkosDB';
const db = pg(dbConfig);

let server = express();



let createNewUser = (req, res) => {
    let userName = 'Test3';
    let userPassword = '34567';
    db.query(`INSERT INTO users (username, password) 
              VALUES             ('${userName}', '${userPassword}');`
            ).then(res.end('New User added to db - I hope'));
};


server.post('/users', createNewUser);

server.listen(3000);