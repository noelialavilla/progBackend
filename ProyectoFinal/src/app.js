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
const productManager = new ProductManager('./files/products.json');


const app = express();

app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use("/", viewsRouter);
app.use('/realtimeproducts', viewsRouter)

app.use('/api/products', productRouter);

app.use('/api/carts', cartRouter);


const server = app.listen(8080, () => console.log('Listening server on port 8080'))

const io = new Server(server)

io.on('connection', async socket=>{
    console.log('Conectado');
    const products = await productManager.getProducts(0);
    socket.emit('showProducts', products)
});
app.set('socketio', io);
