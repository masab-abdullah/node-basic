const express = require("express");
const router = express.Router();

const db = require("../database/connection");

// =========================
// 1. API CHECK
// =========================
router.get("/student-api-check", (req, res) => {
    res.json({
        message: "Student API is working"
    });
});

// =========================
// 2. GET ALL STUDENTS
// =========================
router.get("/get-all-students", (req, res) => {

    const sql = "SELECT * FROM student";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err
            });
        }

        res.json(result);

    });

});

// =========================
// 3. ADD STUDENT
// =========================
router.post("/add-student", (req, res) => {

    const { name, age, email, course } = req.body;

    const sql = "INSERT INTO student (name, age, email, course) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, age, email, course], (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err
            });
        }

        res.json({
            message: "Student added successfully",
            studentId: result.insertId
        });

    });

});

// =========================
// 4. UPDATE STUDENT
// =========================
router.patch("/update-student/:id", (req, res) => {

    const id = req.params.id;

    const { name, age, course } = req.body;

    const sql = "UPDATE student SET name = ?, age = ?, course = ? WHERE id = ?";

    db.query(sql, [name, age, course, id], (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err
            });
        }

        res.json({
            message: "Student updated successfully"
        });

    });

});

module.exports = router;