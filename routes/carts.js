const express = require("express");
const Cart = require("../models/cart");
const Product = require("../models/product");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let cart = await Cart.find();
    if (!cart) {
      return res
        .status(404)
        .send({ meesage: "The cart you request does not exist" });
    }
    return res.send(cart);
  } catch (ex) {
    return res.status(500).send({ message: ex.message });
  }
});


//get a cart details for specific user
router.get("/:id", async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.params.id });
    if (!cart) {
      return res.status(404).send({meesage : "The cart you request does not exist"});
    }
    return res.send(cart);
  } catch (ex) {
    return res.status(500).send({message : ex.message});
  }
});

//get all item for specific user
router.get("/items/:id", async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.params.id });
    if (!cart) {
      return res.status(404).send({meesage : "The cart you request does not exist"});
    }
    return res.send(cart.items);
  } catch (ex) {
    return res.status(500).send({message : ex.message});
  }
});
//delete
router.post("/:id/:user", async (req, res) => {
  console.log(req.params.user, req.params.id);
  let cart = await Cart.findOne({ user: req.params.user });
  //{ $pull: { results: { score: 8 , item: "B" } } }
  try {
    cart = await Cart.findOneAndUpdate(
      { user: req.params.user },
      { $pull: { items: { _id: req.params.id } } }
    );
    cart.items.pull({ _id: req.params.id });
    console.log(cart);
    if (!cart)
      return res
        .status(404)
        .send("The Product you request to delete does not exist in DB");
    return res.send(cart);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
module.exports = router;