CREATE DATABASE pukenko;

CREATE TABLE users (
    id serial PRIMARY KEY,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);

CREATE TABLE pukenkos (
    id serial PRIMARY KEY,
    name character varying(255) NOT NULL,
    hunger INTEGER NOT NULL,
    happiness INTEGER NOT NULL,
    conduct INTEGER NOT NULL,
    created_by INTEGER NOT NULL
);

CREATE TABLE actions (
    id serial PRIMARY KEY,
    action character varying(255) NOT NULL
);

CREATE TABLE action_log (
    id serial PRIMARY KEY,
    user_id INTEGER NOT NULL,
    pukenko_id INTEGER NOT NULL,
    action_id INTEGER NOT NULL
);
