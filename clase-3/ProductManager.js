class Product {
    constructor(id, title, description, price, thumbnail, code, stock) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

class ProductManager {
    constructor() {
        this.products = [];
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        if (this.products.map(product => product.code).includes(code)) {
            console.log('Product code already exists, please insert a different code to add the product');
            return;
        }

        if (this.products.length < 1) {
            this.products.push(new Product(1, title, description, price, thumbnail, code, stock));
            console.log('Product added');
            return;
        }

        this.products.push(new Product(this.products.at(-1).id + 1, title, description, price, thumbnail, code, stock));
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
}

let productManager = new ProductManager();

console.log("Test 1: Print empty products array");
console.log(productManager.getProducts());

console.log("Test 2: Add product");
productManager.addProduct("producto prueba", "este es un producto prueba", 200, "Sin imagen", "abc123", 25);

console.log("Test 3: Print products array");
console.log(productManager.getProducts());

console.log("Test 4: Add product with same code");
productManager.addProduct("producto prueba", "este es un producto prueba", 200, "Sin imagen", "abc123", 25);

console.log("Test 5: Print products array");
console.log(productManager.getProducts());

console.log("Test 6: Add product with different code");
productManager.addProduct("producto prueba", "este es un producto prueba", 200, "Sin imagen", "def123", 25);

console.log("Test 7: Print products array");
console.log(productManager.getProducts());

console.log("Test 8: Get product by id");
console.log(productManager.getProductById(1));

console.log("Test 9: Get product by id");
console.log(productManager.getProductById(3));