import express from "express";
import { productsRouter } from "../routes/productRoutes.js";
import { cartsRouter } from "../routes/cartRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bienvenido al eccomerce");
});

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(8080, () => {
  console.log("Server run on port 8080");
});
