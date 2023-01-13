import { Cart, CartProduct } from './Cart.mjs';
import fs from 'fs';

export class CartManager {
    constructor(path) {
        this.carts = [];
        this.path = path;
        this.fs = fs;

        // If the file doesn't exist, create it and add an empty array, otherwise, read the file and add the carts to the array
        if (!this.fs.existsSync(this.path)) {
            this.fs.promises.writeFile(this.path, JSON.stringify(this.carts));
        } else {
            this.carts = JSON.parse(this.fs.readFileSync(this.path, 'utf-8'));
        }
    }

    addCart() {
        this.carts.push(new Cart((this.carts.length + 1), []));
        this.fs.promises.writeFile(this.path, JSON.stringify(this.carts));
        console.log('Cart added');
    }

    getCartProducts(id) {
        if (this.carts[id] === undefined){
            console.log('Not found');
            return;
        }

        if (this.carts[id].products.length === 0) {
            console.log('There are no products in the cart');
            return;
        }

        return this.carts[id].products;
    }

    addProductToCart(id, productId, quantity) {
        if (this.carts[id] === undefined){
            console.log('Not found');
            return;
        }

        if (this.carts[id].products.find(product => product.id === productId) === undefined) {
            this.carts[id].products.push(new CartProduct(productId, quantity));
            this.fs.promises.writeFile(this.path, JSON.stringify(this.carts));
            console.log('Product added to cart');
            return;
        }

        this.carts[id].products.find(product => product.id === productId).quantity += quantity;
        this.fs.promises.writeFile(this.path, JSON.stringify(this.carts));
        console.log('Product added to cart');
    }

}

export default CartManager;