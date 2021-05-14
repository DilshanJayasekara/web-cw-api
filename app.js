require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const products = require("./routes/products");
const home = require("./routes/home");
const users = require("./routes/users");
const auth = require("./routes/auth");
const carts = require("./routes/carts");

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
const PORT = 5000;

app.use(cors());
app.use(express.json()); // uses a express inbuilt middleware to parse JSON
app.use("/", home);
app.use("/api/products", products);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/carts", carts);
//listed to port
app.listen(PORT, () => {
  console.log("Starting listening on port " + PORT);
});
