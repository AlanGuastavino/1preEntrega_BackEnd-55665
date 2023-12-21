class ProductManager {
  constructor() {
    this.products = [];
  }
  getProduct() {
    return this.products;
  }

  addProduct(title, price, description, thumbnail, code, stock) {
    if (!title || !price || !description || !thumbnail || !code || !stock) {
      console.log("Todos los campos son obligatorios");
    }

    if (!this.products.some((p) => p.code === code)) {
      let newProduct = { title, price, description, thumbnail, code, stock };

      this.products.push(newProduct);
      console.log(`El producto ${title} fue agregado correctamente`);
    } else {
      console.log(`Ya existe un producto con el código ${code}`);
    }
  }

  getProductsByCode(code) {
    let product = this.products.find((p) => p.code === code);

    if (product !== undefined) {
      return product;
    } else {
      console.log(`No existe ningun producto con el código ${code}`);
    }
  }
}

const product = new ProductManager();

product.addProduct(
  "GeForce RTX 4070",
  2500000,
  "Nvidia GeForce RTX 4070, PCI-Express 4.0, 12GB GDDR6X, OC 2580 MHz, 21Gbps, HDMI 2.1 nativo x1, DisplayPort 1.4a nativo x3, 800W",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQelmfj3v-YCTUzcesm_bobvG3r8-XunuN1hVloAuUZ1lyJjzuC9rV9zqpyUlqpLUPSNWU&usqp=CAU",
  10,
  25
);
product.addProduct(
  "GeForce RTX 3060 Ti",
  970350,
  "Nvidia GeForce RTX 3060, 12 GB RAM, OC 1710 MHz, DisplayPort x3 (v1.4a), HDMI 2.1 x1, 600w",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiv8b8CfssAMwG849KPVR_J8ERU5NBW-PvrA&usqp=CAU",
  20,
  34
);

//verificación de valores
console.log("----------------------------------------------------");
product.addProduct(
  "GeForce RTX 3090",
  1320000,
  "Nvidia GeForce RTX 3090 MSI, 24 GB RAM, 1725 MHz,  DisplayPort x3 (v1.4a), HDMI 2.1 x1, 750w",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTslcdXVEJgj3ny6NgFOBiu-qbpJBGZS8VjN0ZXlHeT6JZCR4j2mgF6tOTmj5l-EeyYvtY&usqp=CAU",
  20,
  13
);

console.log(product.getProduct());

//Busqueda de code
console.log("----------------------------------------------------");
product.getProductsByCode(10);
product.getProductsByCode(45);
