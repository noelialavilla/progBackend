import express from 'express';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import {
    Server
} from 'socket.io';
import viewsRouter from './routes/views.router.js';
import ProductManager from './managers/products.manager.js';
import { productModel } from './models/products.model.js';
import mongoose from 'mongoose';

//Configuraciones
const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/", viewsRouter);
app.use('/realtimeproducts', viewsRouter)
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

// Conexión a Mongooose 
const uri =
    "mongodb+srv://noeliamlavilla:Coder19@clustercoderhouse.uic3b7u.mongodb.net/ecommerce?retryWrites=true&w=majority";

try {
    await mongoose.connect(uri);
} catch (error) {
    console.log(error);
}
const httpServer = app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});

// Configuración Handlebars 
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

//Archivos estaticos
app.use(express.static(`${__dirname}/public`));

//Instancio un manager de productos
const productManager = new ProductManager();

//Socket IO
const io = new Server(httpServer)

io.on('connection', async socket => {
    console.log('Conectado');
    socket.on("newProduct", async (product) => {
        await productManager.addProduct(product);

        io.emit("updateProducts", await productManager.getProducts());
    });

    socket.on("deleteProduct", async (id) => {
        await productManager.deleteProduct(id);

        io.emit("updateProducts", await productManager.getProducts());
    });
    const products = await productManager.getProducts(0);
    socket.emit('showProducts', products)
});
app.set('socketio', io);
