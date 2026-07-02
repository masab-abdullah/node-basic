const express = require("express");
const router = express.Router();

const pool = require("../database/postgres-connection");

// 1. PostgreSQL API check
router.get("/postgres-api-check", (req, res) => {
    res.json({
        message: "PostgreSQL API is working"
    });
});

// 2. Get all students from PostgreSQL
router.get("/get-postgres-students", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM student ORDER BY id");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// 3. Add student in PostgreSQL
router.post("/add-postgres-student", async (req, res) => {
    try {
        const { name, age, email, course } = req.body;

        const sql = `
            INSERT INTO student (name, age, email, course)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;

        const result = await pool.query(sql, [name, age, email, course]);

        res.json({
            message: "PostgreSQL student added successfully",
            student: result.rows[0]
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// 4. Update student in PostgreSQL
router.patch("/update-postgres-student/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { name, age, email, course } = req.body;

        const sql = `
            UPDATE student
            SET
                name = COALESCE($1, name),
                age = COALESCE($2, age),
                email = COALESCE($3, email),
                course = COALESCE($4, course)
            WHERE id = $5
            RETURNING *
        `;

        const result = await pool.query(sql, [name, age, email, course, id]);

        res.json({
            message: "PostgreSQL student updated successfully",
            student: result.rows[0]
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;