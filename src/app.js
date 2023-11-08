import express from "express";
import ProductManager from "./manager/product_manager.js";

const PORT = 8080;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
