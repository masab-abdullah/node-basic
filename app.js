const express = require("express");
const studentRoutes = require("./routes/student");

const app = express();

app.use(express.json());

app.use("/", studentRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to Express API");
});

app.listen(8000, () => {
    console.log("Server is running on http://localhost:8000");
});
