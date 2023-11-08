import { Router } from "express";
import { uploader } from "../uploader.js";
import ProductManager from "../manager/product_manager.js";
const router = Router();
const productManager = new ProductManager("./src/files/products.json");

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    const { limit } = req.query;
    if (!limit) {
    } else {
      if (limit < products.length) {
        products.splice(limit - products.length);
      }
    }
    res.send(products);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    const pid = parseInt(req.params.pid);
    const productSelected = products.find((p) => p.id === pid);
    if (!productSelected) {
      res.status(400).send("Product not found");
    } else {
      res.send(productSelected);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = req.body;
    await productManager.addProduct(product);
    res.send({ status: "success", payload: product });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const pid = req.params;
    const updatedProduct = req.body;
    await productManager.updateProduct(pid, updatedProduct);
    res.send({ status: "success", payload: updatedProduct });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const pid = req.params;
    await productManager.deleteProducts(pid);
    res.send({ status: "success deleted" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
