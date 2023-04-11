import express from 'express';
import ProductManager from '../managers/ProductManager.js';

const app = express();

const productManager = new ProductManager('./files/products.json');

app.use(express.urlencoded({ extended: true }));



//Ruta /products/:pid tipo app.get donde debemos llamar al metodo getById de la clae ProductManager usar la instancia de la clase ya creada

//Ejmplo de async await llamado a la clase ProductMnager
app.get('/products', async (req, res) => {

    const { limit } = req.query;
    if (limit) {
        const products = await productManager.getProducts(limit);
        res.send({ products });
    } else {
        const products = await productManager.getProducts(0);
        res.send({ products });
    }


})
app.get('/products/:pid', async (req, res) => {
    const pid = Number(req.params.pid);
    res.send(await productManager.getProductById(pid));
})

app.listen(8080, () => console.log("Listening on 8080"))