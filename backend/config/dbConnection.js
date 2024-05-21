const { Client } = require("pg");

const databaseClient = {
	user: "postgres",
	host: "localhost",
	password: "password",
	database: "fliki_chat",
	PORT: 5432,
};

const db = new Client(databaseClient);

db.connect();

module.exports = db;
