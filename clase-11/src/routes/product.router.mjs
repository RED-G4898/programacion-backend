import Router from 'express';
import path from 'path';
import ProductManager from "../ProductManager.mjs";
import __dirname from '../utils.mjs';

const productRouter = Router();
const productManager = new ProductManager(path.resolve(__dirname, './assets/data/products.json'));

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

export default productRouter;
