import express from "express";

import ProductManager from "./ProductManager.mjs";

const app = express();
const productManager = new ProductManager("./assets/data/products.json");

app.use(express.urlencoded({ extended: true }));

app.get("/productos", (req, res) => {
    res.json(productManager.getProducts());
});

app.get("/productos/:id", (req, res) => {
    res.json(productManager.getProductById(parseInt(req.params.id)));
});

app.listen(8080, () => console.log("Servidor iniciado"));