const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "college",
    password: "kawasaki",
    port: 5432
});

pool.connect((err) => {
    if (err) {
        console.log("❌ PostgreSQL Connection Failed");
        console.log(err);
    } else {
        console.log("✅ PostgreSQL Connected Successfully");
    }
});

module.exports = pool;