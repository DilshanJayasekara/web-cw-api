const express = require("express");
const Product = require("../models/product");
const router = express.Router();

//get all the product  : Dileesha
router.get("/", async (req, res) => {
  try {
    let products = await Product.find();
    return res.status(200).send(products);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

//get a one product with id : Dileesha
router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("The product you request does not exist");
    }
    return res.status(200).send(product);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

//add a new product
router.post("/", async (req, res) => {
  if (
    !req.body.productCode ||
    req.body.productCode == "" ||
    !req.body.title ||
    !req.body.description ||
    !req.body.price ||
    !req.body.category
  ) {
    return res.status(400).send("Please fill the all values");
  }
  let newproduct = new Product({
    productCode: req.body.productCode,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    manufacturer: req.body.manufacturer,
    imagePath: req.body.imagePath,
    available: req.body.available,
  });
  try {
    newproduct = await newproduct.save();
    return res.status(200).send(newproduct);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

//update a product upeksha
router.put("/:id", async (req, res) => {
  console.log(req.body.imagePath);
  let requestedID = req.params.id;
  let product = await Product.findById(requestedID);
  if (!product) {
    return res
      .status(404)
      .send("Product you are looking to update does not exist on the MCU");
  }
  product.set({
    productCode: req.body.productCode,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    manufacturer: req.body.manufacturer,
    imagePath: req.body.imagePath,
    available: req.body.available,
  });
  try {
    product = await product.save();
    return res.status(200).send(product);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    let product = await Product.findOneAndDelete({ _id: req.params.id });
    console.log(product);
    if (!product)
      return res
        .status(404)
        .send("The Product you request to delete does not exist in DB");

    return res.status(200).send(product);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
module.exports = router;
