import { Router } from 'express';
import CartManager from "../CartManager.mjs";
import __dirname from "../utils.mjs";
import path from "path";

const cartRouter = Router();
const cartManager = new CartManager(path.resolve(__dirname, './assets/data/carts.json'));

cartRouter.post('/', (req, res) => {
    cartManager.addCart();
    res.status(201).send({ message: 'Cart added successfully' });
});

cartRouter.get('/:cid', (req, res) => {
    res.json(cartManager.getCartProducts(parseInt(req.params.cid)));
});

cartRouter.post('/:cid/product/:pid', (req, res) => {
    cartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid), 1);
    res.status(201).send({ message: 'Product added to cart successfully' });
});

export default cartRouter;