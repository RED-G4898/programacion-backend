import express from "express";
import handlebars from "express-handlebars";
import cartsRouter from "./routes/cart.router.mjs";
import productsRouter from "./routes/product.router.mjs";
import viewsRouter from "./routes/views.router.mjs";
import { Server } from "socket.io"
import { ProductManager } from "./ProductManager.mjs";
import path from "path";
import __dirname from "./utils.mjs";


const productManager = new ProductManager(path.resolve(__dirname, "./assets/data/products.json"));

const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
const socketServer = new Server(httpServer);


app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views/");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use("/", viewsRouter);


socketServer.on("connection", socket => {
    console.log("Cliente conectado");

    socket.on("add", (data) => {
        try {
            productManager.addProduct(data);
        } catch (err) {
        }
    });

    socket.on("delete", (data) => {
        try {
            const ID = parseInt(data);
            productManager.deleteProduct(ID);
        } catch (err) {
        }
    });
});