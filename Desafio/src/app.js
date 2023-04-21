import express from 'express';
import ProductManager from '../managers/ProductManager.js';

const app = express();

app.use(express.json());

const productManager = new ProductManager('./files/products.json');

app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {

    const { limit } = req.query;
    if (limit) {
        const products = await productManager.getProducts(limit);
        res.status(200).send(json(products));
        
    } else {
        const products = await productManager.getProducts(0);
        res.status(200).send(json(products));

    }


})
app.get('/products/:pid', async (req, res) => {
    const pid = Number(req.params.pid);
    res.status(200).send(json(await productManager.getProductById(pid)));
})

app.listen(8080, () => console.log("Listening on 8080"))