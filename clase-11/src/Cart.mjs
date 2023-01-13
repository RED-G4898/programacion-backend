export class Cart {
    constructor(id, products = []) {
        this.id = id;
        this.products = products;
    }
}

export class CartProduct {
    constructor(id, quantity) {
        this.id = id;
        this.quantity = quantity;
    }
}

export default Cart;