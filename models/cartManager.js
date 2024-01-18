import fs from "fs";

class CartManager {
  constructor() {
    this.path = "./cart.json";
    this.carts = this.loadCarts();
  }

  async loadCarts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data) || [];
    } catch (error) {
      return [];
    }
  }

  async saveCarts() {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.carts, null, 2),
        "utf-8"
      );
    } catch (error) {
      console.error("Error al guardar carritos:", error);
    }
  }

  generateId() {
    return this.carts.length > 0
      ? Math.max(...this.carts.map((cart) => cart.id)) + 1
      : 1;
  }

  async createCart() {
    const cartId = this.generateId();
    const newCart = { id: cartId, products: [] };

    this.carts.push(newCart);
    await this.saveCarts();
    console.log(`Nuevo carrito creado con ID ${cartId}`);
    return newCart;
  }

  getCartById(id) {
    const cart = this.carts.find((cart) => cart.id === id);
    return cart || null;
  }

  async addProductToCart(cartId, productId) {
    const cart = this.getCartById(cartId);
    if (!cart) {
      console.log(`No existe el carrito con ID ${cartId}`);
      return;
    }

    const existingProduct = cart.products.find(
      (product) => product.id === productId
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ id: productId, quantity: 1 });
    }

    await this.saveCarts();
    console.log(`Producto agregado al carrito con ID ${cartId}`);
  }
}

const cartManager = new CartManager();

export default cartManager;
