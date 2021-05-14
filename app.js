require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const products = require("./routes/products");
const home = require("./routes/home");
const users = require("./routes/users");
const auth = require("./routes/auth");
const carts = require("./routes/carts");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");


const address = require("./routes/addreses");
mongoose
  .connect("mongodb://localhost/webcwdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to db Successfuly...!"))
  .catch((err) =>
    console.log("Error has occurred while connecting to DB : ", err)
  );

const app = express();
const specs = swaggerJsDoc(options);

const PORT = 5000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: " Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
     
      contact: {
        name: "Group 16",
        email: "upekshad123@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000/books",
      },
    ],
  },
  apis: ["./routes/product.js"],
};



app.use(cors());
app.use(express.json()); // uses a express inbuilt middleware to parse JSON
app.use("/", home);
app.use("/api/products", products);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/carts", carts);
app.use(
  "/api/products",
  swaggerUI.serve,
  swaggerUI.setup(specs, { explorer: true })
);

app.use("/api/address", address);
//listed to port
app.listen(PORT, () => {
  console.log("Starting listening on port " + PORT);
});
