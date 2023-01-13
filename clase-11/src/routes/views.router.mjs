import { Router } from "express";
import path from "path";
import { ProductManager } from "../ProductManager.mjs";
import __dirname from "../utils.mjs";

const viewsRouter = Router();
const productManager = new ProductManager(path.resolve(__dirname, './assets/data/products.json'));


viewsRouter.get("/", async (req, res) => {
    try {
        const PRODUCTS = await productManager.getProducts();
        res.render("home", {
            PRODUCTS
        });
    } catch (err) {
        res.status(404).send(err);
    }
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
    try {
        const PRODUCTS = await productManager.getProducts();
        res.render("realTimeProducts", {
            PRODUCTS
        });
    } catch (err) {
        res.status(404).send(err);
    }
});


export default viewsRouter;