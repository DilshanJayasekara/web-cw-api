const express = require("express");
const Product = require("../models/product");
const router = express.Router();

//Creating schemas
/**
 * @swagger
 *  components:
 *   schemas:
 *    Products:
 *     type:object
 *     required:
 *      - productCode
 *      - title
 *      - description
 *      - price
 *      - category
 *     properties:
 *      id:
 *        type: integer
 *        description: The auto generated id of the product
 *      titel:
 *        type: string
 *        description: The auto name of the product
 *      description:
 *       type: string
 *       description: About the product
 *      price:
 *       type: integer
 *       description: Price of the product
 *      category:
 *       type: integer
 *       description: Which category the product belongs
 *      createdAt:
 *       type: integer
 *       format: date
 *       description: The date of the record creation   
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API to manage your products
 */

//Get all products

/**
* @swagger
* path:
*   /books/:
*     get:
*       summary: Lists all the products
*       tags: [Products]
*       responses:
*         "200":
*           description: The list of products.
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Products'
*/

//get all the product  : Dileesha
router.get("/", async (req, res) => {
  try {
    let products = await Product.find();
    return res.status(200).send(products);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

//Get product by ID
/**
 * @swagger
 * products/{id}:
 *   get:
 *     summary: Get the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       404:
 *         description: The product was not found
 */

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


// Add a new product
/**
 * @swagger
 * post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *     required:true
 *     content:
 *       application/json
 *         schema:
 *           $ref: '#/components/schemas/Products'
 *     responses:
 *       200:
 *         description: The added product
 *         contens:
 *           application/json:
 *         schema:
 *           $ref: '#/components/schemas/Products' 
 */


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

//update product
/**
 * @swagger
 * products/{id}:
 * put:
 *     summary: update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type:integer
 *         required: true
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json
 *           schema:
 *             $ref: '#/components/schemas/Products' 
 *     responses:
 *       204:
 *         description: Update is successful
 *       404:
 *         description: Product not found
 */


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

//Delete a product
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Remove the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       204:
 *         description: The product was deleted
 *       404:
 *         description: The product was not found
 */

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
