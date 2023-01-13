import express from "express";

import ProductManager from "./ProductManager.mjs";

const app = express();
const productManager = new ProductManager("./assets/data/products.json");

app.use(express.urlencoded({ extended: true }));

app.get("/productos", (req, res) => {
    let products = productManager.getProducts();
    if(req.query.limit){
        products = products.slice(0, req.query.limit);
    }
    res.json(products);
});

app.get("/productos/:id", (req, res) => {
    res.json(productManager.getProductById(parseInt(req.params.id)));
});

app.listen(8080, () => console.log("Servidor iniciado"));