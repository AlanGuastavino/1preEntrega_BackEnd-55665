import express from "express";
import cartManager from "../models/cartManager";

const cartsRouter = express.Router();

cartsRouter.post("/", async (req, res) => {
  const newCart = await cartManager.createCart();
  res.json(newCart);
});

cartsRouter.get("/:cid", (req, res) => {
  const cartId = parseInt(req.params.cid);
  const cart = cartManager.getCartById(cartId);
  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ error: "Carrito no encontrado" });
  }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);

  await cartManager.addProductToCart(cartId, productId);
  res.json({ message: "El producto fue agregado correctamente" });
});

export { cartsRouter };
