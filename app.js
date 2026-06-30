const express = require("express");
const swaggerUi = require("swagger-ui-express");

const studentRoutes = require("./routes/student");
require("./database/connection");

const app = express();

app.use(express.json());

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Student API",
    version: "1.0.0",
    description: "Node.js Express MySQL Student API"
  },
  servers: [
    {
      url: "http://localhost:8000"
    }
  ],
  paths: {
    "/student-api-check": {
      get: {
        summary: "Check API is working",
        responses: {
          200: {
            description: "API working"
          }
        }
      }
    },
    "/get-all-students": {
      get: {
        summary: "Get all students from database",
        responses: {
          200: {
            description: "List of students"
          }
        }
      }
    },
    "/add-student": {
      post: {
        summary: "Add new student",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  age: { type: "integer" },
                  course: { type: "string" }
                }
              },
              example: {
  name: "Masab",
  age: 19,
  email: "masab@gmail.com",
  course: "BSCS"
}
            }
          }
        },
        responses: {
          200: {
            description: "Student added"
          }
        }
      }
    },
    "/update-student/{id}": {
      patch: {
        summary: "Update student by id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer"
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  age: { type: "integer" },
                  course: { type: "string" }
                }
              },
              example: {
                name: "Masab Abdullah",
                age: 20,
                course: "Software Engineering"
              }
            }
          }
        },
        responses: {
          200: {
            description: "Student updated"
          }
        }
      }
    }
  }
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", studentRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Express API");
});

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});