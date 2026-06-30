const express = require("express");

const router = express.Router();

router.get("/info", (req, res) => {
    res.json({
        message: "Student API is working"
    });
});

router.get("/students", (req, res) => {
    res.json([
        { id: 1, name: "Masab", age: 19, course: "BSCS" },
        { id: 2, name: "Ali", age: 20, course: "BSCS" }
    ]);
});

router.post("/students", (req, res) => {
    res.json({
        message: "Student created successfully"
    });
});

router.patch("/students/:id", (req, res) => {
    res.json({
        message: "Student updated successfully",
        student_id: req.params.id
    });
});

router.delete("/students/:id", (req, res) => {
    res.json({
        message: "Student deleted successfully",
        student_id: req.params.id
    });
});

module.exports = router;