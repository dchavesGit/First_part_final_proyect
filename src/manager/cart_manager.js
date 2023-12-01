import fs from "fs";

export default class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
  }

  async getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        const carts = JSON.parse(data);
        return carts;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async addCart() {
    try {
      const carts = await this.getCarts();
      const cart = {
        products: [],
      };
      if (carts.length === 0) {
        cart.id = 1;
      } else {
        cart.id = carts[carts.length - 1].id + 1;
      }
      this.carts.push(cart);
      return await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.carts, null, "\t")
      );
    } catch (error) {
      console.error(error.message);
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getCarts();
      const cartsJson = await JSON.parse(carts);
      let cart = cartsJson.find((c) => c.id === id);
      if (cart) return cart;
      console.log("Cart not found.");
    } catch (error) {
      console.error(error.message);
    }
  }

  async updateProductByCart(cid, pid, qty) {
    try {
      const newProduct = {
        id: pid,
        qty: qty,
      };
      const carts = await this.getCarts();
      const cartsJson = await JSON.parse(carts);
      const cartIndex = cartsJson.findIndex((c) => c.id === cid);
      if (cartIndex === -1) {
        console.log("Cart not found");
      } else {
        cartsJson[cartIndex].id = cid;
        if (cartsJson[cartIndex].products.find(pid)) {
        }

        cartsJson[cartIndex].products.push(newProduct);
      }
      return await fs.promises.writeFile(
        this.path,
        JSON.stringify(productsJson, null, "\t")
      );
    } catch (error) {
      console.error(error.message);
    }
  }

  async deleteProducts(id) {
    try {
      const products = await fs.promises.readFile(this.path, "utf-8");
      const productsJson = await JSON.parse(products);
      const productIndex = productsJson.findIndex((p) => p.id === id);
      if (productIndex === -1) {
        console.log("Product not found");
      } else {
        productsJson.splice(productIndex, 1);
      }
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(productsJson, null, "\t")
      );
    } catch (error) {
      console.error(error.message);
    }
  }
}
