import fs from "fs";

class ProductManager {
  constructor() {
    this.path = "./products.json";
    this.products = this.loadProducts();
  }

  async allProducts() {
    return this.products;
  }

  async loadProducts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data) || [];
    } catch (error) {
      return [];
    }
  }

  async saveProducts() {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2),
        "utf-8"
      );
    } catch (error) {
      console.error("Error al guardar productos:", error);
    }
  }

  generateId() {
    return this.products.length > 0
      ? Math.max(...this.products.map((product) => product.id)) + 1
      : 1;
  }

  async addProduct(productData) {
    const productId = this.generateId();
    const newProduct = { id: productId, ...productData };

    this.products.push(newProduct);
    await this.saveProducts();
    console.log(
      `El producto ${newProduct.title} fue agregado correctamente con ID ${productId}`
    );
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      console.log(`No existe ningún producto con el ID ${id}`);
      return null;
    }
  }

  async updateProduct(id, updatedFields) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedFields };
      await this.saveProducts();
      console.log(`El producto con ID ${id} fue actualizado correctamente`);
    } else {
      console.log(`No existe ningún producto con el ID ${id}`);
    }
  }

  async deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1)[0];
      await this.saveProducts();
      console.log(
        `El producto con ID ${id} (${deletedProduct.title}) fue eliminado correctamente`
      );
    } else {
      console.log(`No existe ningún producto con el ID ${id}`);
    }
  }
}

const pManager = new ProductManager();

(async () => {
  console.log(await pManager.getProducts());
  await pManager.updateProduct(1, { price: 120 });
  console.log(await pManager.getProductById(1));
  await pManager.deleteProduct(1);
  console.log(await pManager.getProducts());
})();

export default ProductManager;
