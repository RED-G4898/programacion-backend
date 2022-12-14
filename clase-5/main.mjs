import { ProductManager } from "./ProductManager.mjs";

const productManager = new ProductManager("./products.json");

console.log("This program simulates a product manager performing several processes of a shopping cart along the execution time.");
console.log("Written by: RED");

console.warn("--- TEST 1: Getting products at starting stage ---");
console.log(productManager.getProducts());

console.warn("--- TEST 2: Adding a product ---");
productManager.addProduct("producto prueba", "este es un producto prueba", 200, "Sin imagen", "abc123", 25);

console.warn("--- TEST 3: Getting products after adding a product ---");
console.log(productManager.getProducts());

console.warn("--- TEST 4: Getting a product by its id, but using a wrong id ---");
console.log(productManager.getProductById(2));

console.warn("--- TEST 5: Getting a product by its id, but using a correct id ---");
console.log(productManager.getProductById(1));

console.warn("--- TEST 6: Updating a product data ---");
productManager.updateProduct(1, "title", "producto prueba actualizado");

console.log(productManager.getProducts());

console.warn("--- TEST 7: Deleting a product, using wrong id ---");
productManager.deleteProduct(2);

console.log(productManager.getProducts());

console.warn("--- TEST 8: Deleting a product, using correct id ---");
productManager.deleteProduct(1);

console.log(productManager.getProducts());