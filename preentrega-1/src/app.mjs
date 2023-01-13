import express from "express";
import { Router } from 'express';
import ProductManager from "./ProductManager.mjs";
import CartManager from "./CartManager.mjs";
import bodyParser from 'body-parser';

const app = express();
const productManager = new ProductManager("./assets/data/products.json");
const cartManager = new CartManager("./assets/data/carts.json");
const productRouter = Router();
const cartRouter = Router();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

productRouter.get('/', (req, res) => {
    let products = productManager.getProducts();
    if(req.query.limit){
        products = products.slice(0, req.query.limit);
    }
    res.json(products);
});

productRouter.get('/:id', (req, res) => {
    res.json(productManager.getProductById(parseInt(req.params.id)));
});

productRouter.post('/', (req, res) => {
    // Obtener los datos del producto a partir del cuerpo de la solicitud
    const { title, description, price, thumbnail, code, stock } = req.body;

    // Agregar el producto utilizando el método addProduct de la clase ProductManager
    productManager.addProduct(title, description, price, thumbnail, code, stock);

    // Enviar una respuesta de éxito al cliente
    res.status(201).send({ message: 'Product added successfully' });
});

productRouter.put('/:pid', (req, res) => {
    // Obtener el id del producto a partir del parámetro pid de la ruta
    const id = parseInt(req.params.pid);
    // Obtener los datos del producto a partir del cuerpo de la solicitud
    const updatedProduct = req.body;
    // Actualizar el producto con el id especificado en el parámetro pid
    productManager.updateProduct(id, updatedProduct);
    // Enviar una respuesta de éxito al cliente
    res.send({ message: 'Product updated successfully' });
});

productRouter.delete('/:pid', (req, res) => {
    productManager.deleteProduct(parseInt(req.params.pid));
    res.send({ message: 'Product deleted successfully' });
});

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

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.listen(8080, () => console.log("Servidor iniciado"));