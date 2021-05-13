const express = require("express");
const Product = require("../models/product");
const router = express.Router();

<<<<<<< HEAD
//add a new product
router.post("/", async (req, res) => {
  if (
    !req.body.productCode || req.body.productCode =="" ||
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
    manufacturer:req.body.manufacturer,
    available: true,
  });
  try {
    newproduct = await newproduct.save();
    return res.send(newproduct);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

=======
>>>>>>> master




//update a product upeksha
router.put("/:id", async (req, res) => {
    let requestedID = req.params.id;
    let product = await Product.findById(requestedID);
    if (!product) {
      return res
        .status(404)
        .send("Product you are looking to update does not exist on the DB");
    }
    product.set({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      available: req.body.available,
    });
    try {
      product = await product.save();
      return res.send(product);
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