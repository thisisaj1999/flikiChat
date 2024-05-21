const { Client } = require("pg");
const fs = require("fs");

const databaseMigration = {
	user: "postgres",
	host: "localhost",
	password: "password",
	port: 5432,
};

const dbMigration = new Client(databaseMigration);

const create_users_table = fs.readFileSync("./sql/create/create_users_table.sql").toString();
const create_groups_table = fs.readFileSync("./sql/create/create_groups_table.sql").toString();
const create_messages_table = fs.readFileSync("./sql/create/create_messages_table.sql").toString();


dbMigration.connect((err) => {
	if (err) {
		console.log(`🔴  Connection Failed : \n`, err);
		return;
	}

	dbMigration.query(
		"SELECT 1 FROM pg_database WHERE datname = 'fliki_chat'",
		(err, res) => {
			if (err) {
				console.log(`🔴  Could not check DB existence : \n`, err);
                dbMigration.end();
				return;
			}

			if (res.rowCount === 0) {
				dbMigration.query("CREATE DATABASE fliki_chat", (err, res) => {
					if (err) {
						console.log(`🔴  Could not create DB : \n`, err);
                        dbMigration,end();
						return;
					}
					console.log(`🟢  DB Created Successfully`);
                    dbMigration.end();
				});
			} else {
                console.log(`🟢  DB already exists`);
                dbMigration.end();
			}
		}
	);

    const dbClient = {
        ...databaseMigration,
        database: "fliki_chat"
    }

    const db = new Client(dbClient);

	db.connect((err) => {
		if (err) {
			console.log(`🔴  Connection Failed : \n`, err);
			return;
		}

		db.query(create_users_table, (err, res) => {
			if (err) {
				console.log(`🔴  Unable to create Users Table : \n`, err);
				return;
			}
			console.log(`🟢  Users Table Created`);
		});
		
		db.query(create_groups_table, (err, res) => {
			if (err) {
				console.log(`🔴  Unable to create Groups Table : \n`, err);
				return;
			}
			console.log(`🟢  Groups Table Created`);
		});
		
		db.query(create_messages_table, (err, res) => {
			if (err) {
				console.log(`🔴  Unable to create Messages Table : \n`, err);
				return;
			}
			console.log(`🟢  Messages Table Created`);
		});

	});
});
