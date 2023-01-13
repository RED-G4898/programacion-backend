import Product from './Product.mjs';
import fs from 'fs';

export class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
        this.fs = fs;

        // If the file doesn't exist, create it and add an empty array, otherwise, read the file and add the products to the array
        if (!this.fs.existsSync(this.path)) {
            this.fs.promises.writeFile(this.path, JSON.stringify(this.products));
        } else {
            this.products = JSON.parse(this.fs.readFileSync(this.path, 'utf-8'));
        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (this.products.map(product => product.code).includes(code)) {
            console.log('Product code already exists, please insert a different code to add the product');
            return;
        }

        if (title === undefined || description === undefined || price === undefined || thumbnail === undefined || code === undefined || stock === undefined) {
            console.log('Please fill all the fields');
            return;
        }

        if (this.products.length < 1) {
            this.products.push(new Product(1, title, description, price, thumbnail, code, stock));
            this.fs.promises.writeFile(this.path, JSON.stringify(this.products));
            console.log('Product added');
            return;
        }

        this.products.push(new Product(this.products.at(-1).id + 1, title, description, price, thumbnail, code, stock));
        this.fs.promises.writeFile(this.path, JSON.stringify(this.products));
        console.log('Product added');
    }

    getProducts() {
        if (this.products.length === 0) {
            console.log('There are no products');
            return;
        }

        return this.products;
    }

    getProductById(id) {
        if (this.products.length === 0) {
            console.log('There are no products');
            return;
        }

        if (this.products.find(product => product.id === id) === undefined) {
            console.log('Not found');
            return;
        }

        return this.products.find(product => product.id === id);
    }

    /* updateProduct(id, property, value) {
        this.getProductById(id)[property] = value;
        this.fs.promises.writeFile(this.path, JSON.stringify(this.products));

        console.log('Product updated');
    } */

    updateProduct(id, updates) {
        const product = this.getProductById(id);
        for (let property in updates) {
            product[property] = updates[property];
        }
        this.fs.promises.writeFile(this.path, JSON.stringify(this.products));
        console.log('Product updated');
    }

    deleteProduct(id) {
        if (this.products.length === 0) {
            console.log('There are no products');
            return;
        }

        if (this.products.find(product => product.id === id) === undefined) {
            console.log('Not found');
            return;
        }

        this.products = this.products.filter(product => product.id !== id);
        this.fs.promises.writeFile(this.path, JSON.stringify(this.products));

        console.log('Product deleted');
    }
}

export default ProductManager;