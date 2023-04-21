import { Router } from 'express';
import express from 'express';
import ProductManager from '../../managers/ProductManager.js' 


const productManager = new ProductManager('../files/products.json');

const productRouter = Router();


productRouter.get('/', async (req, res) =>{
    const { limit } = req.query;
    if (limit) {
        const products = await productManager.getProducts(limit);
        res.status(200).send(JSON.stringify(products));
        
    } else {
        const products =  await productManager.getProducts(0);
        res.status(200).send(JSON.stringify(products));

    }


});

productRouter.get('/:pid', async (req, res) => {
    const pid = Number(req.params.pid);
    res.status(200).send(JSON.stringify(await productManager.getProductById(pid)));
})


productRouter.post('/', async (req, res) =>{
    const product = req.body;
    res.status(200).send(JSON.stringify(await productManager.addProduct(product)));
    
});

productRouter.put('/:pid', async (req, res) =>{
    const pid = Number(req.params.pid);
    const product = req.body;
    res.status(200).send(JSON.stringify(await productManager.updateProduct(pid,product)));
    
});

productRouter.delete('/:pid', async (req, res) =>{
    const pid = Number(req.params.pid);
    res.status(200).send(JSON.stringify(await productManager.deleteProduct(pid)));
    
});


export default productRouter;