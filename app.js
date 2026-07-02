const express = require("express");
const postgresStudentRoutes = require("./routes/postgres-student");
require("./database/postgres-connection");
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
    description: "Node.js Express API with MySQL and PostgreSQL"
  },
  servers: [
    {
      url: "http://localhost:8000"
    }
  ],
  paths: {
    "/student-api-check": {
      get: {
        summary: "Check MySQL API is working",
        responses: {
          200: {
            description: "MySQL API working"
          }
        }
      }
    },

    "/get-all-students": {
      get: {
        summary: "Get all students from MySQL",
        responses: {
          200: {
            description: "MySQL students list"
          }
        }
      }
    },

    "/add-student": {
      post: {
        summary: "Add student in MySQL",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  age: { type: "integer" },
                  email: { type: "string" },
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
            description: "Student added in MySQL"
          }
        }
      }
    },

    "/update-student/{id}": {
      patch: {
        summary: "Update student in MySQL by id",
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
                  email: { type: "string" },
                  course: { type: "string" }
                }
              },
              example: {
                name: "Masab Abdullah",
                age: 20,
                email: "newemail@gmail.com",
                course: "Software Engineering"
              }
            }
          }
        },
        responses: {
          200: {
            description: "Student updated in MySQL"
          }
        }
      }
    },

    "/postgres-api-check": {
      get: {
        summary: "Check PostgreSQL API is working",
        responses: {
          200: {
            description: "PostgreSQL API working"
          }
        }
      }
    },

    "/get-postgres-students": {
      get: {
        summary: "Get all students from PostgreSQL",
        responses: {
          200: {
            description: "PostgreSQL students list"
          }
        }
      }
    },

    "/add-postgres-student": {
      post: {
        summary: "Add student in PostgreSQL",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  age: { type: "integer" },
                  email: { type: "string" },
                  course: { type: "string" }
                }
              },
              example: {
                name: "David",
                age: 19,
                email: "david@gmail.com",
                course: "BSCS"
              }
            }
          }
        },
        responses: {
          200: {
            description: "Student added in PostgreSQL"
          }
        }
      }
    },

    "/update-postgres-student/{id}": {
      patch: {
        summary: "Update student in PostgreSQL by id",
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
                  email: { type: "string" },
                  course: { type: "string" }
                }
              },
              example: {
                name: "David Updated",
                age: 20,
                email: "updated@gmail.com",
                course: "Software Engineering"
              }
            }
          }
        },
        responses: {
          200: {
            description: "Student updated in PostgreSQL"
          }
        }
      }
    }
  }
};
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", studentRoutes);
app.use("/", postgresStudentRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Express API");
});

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});