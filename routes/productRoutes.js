import express from "express";
import ProductManager from "../models/productManager";

const productsRouter = express.Router();
const productManager = new ProductManager();

productsRouter.get("/", async (req, res) => {
  const allProducts = await productManager.allProducts();
  res.json(allProducts);
});

productsRouter.get("/:pid", async (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = await productManager.getProductById(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "No se encuentra el producto" });
  }
});

productsRouter.post("/", async (req, res) => {
  const newProductData = req.body;
  await productManager.addProduct(newProductData);
  res.json({ message: "El producto fue agregado correctamente" });
});

productsRouter.put("/:pid", async (req, res) => {
  const productId = parseInt(req.params.pid);
  const updatedFields = req.body;
  await productManager.updateProduct(productId, updatedFields);
  res.json({
    message: `El producto con el ID ${productId} se actualizó correctamente`,
  });
});

productsRouter.delete("/:pid", async (req, res) => {
  const productId = parseInt(req.params.pid);
  await productManager.deleteProduct(productId);
  res.json({
    message: `El producto con el ID ${productId} se ha eliminado correctamente`,
  });
});

export { productsRouter };
