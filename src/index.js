import express from "express";
import ProductManager from "../data/productManager.js";

const app = express();
let product = new ProductManager();

app.get("/", (req, res) => {
  res.send("Bienvenido al eccomerce");
});

app.get("/allProducts", async (req, res) => {
  let response = await product.allProducts();
  res.send(response);
});

app.listen(8080, () => {
  console.log("Server run on port 8080");
});
