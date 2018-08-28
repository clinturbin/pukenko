CREATE DATABASE pukenkosDB;

CREATE TABLE users (
    id serial PRIMARY KEY,
    userName character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);

CREATE TABLE pukenkos (
    id serial PRIMARY KEY,
    name character varying(255) NOT NULL,
    hunger INTEGER NOT NULL,
    happiness INTEGER NOT NULL,
    discipline INTEGER NOT NULL
);

CREATE TABLE actions (
    id serial PRIMARY KEY,
    userID character varying(255) NOT NULL,
    pID character varying(255) NOT NULL,
    action character varying(255) NOT NULL
);