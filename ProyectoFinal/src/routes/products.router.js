import { Router } from 'express';
import express from 'express';
import ProductManager from '../../managers/ProductManager.js' 


const productManager = new ProductManager('../files/products.json');

const products =[];
const router = Router();


router.get('/', async (req, res) =>{
    const { limit } = req.query;
    if (limit) {
        const products = await productManager.getProducts(limit);
        res.status(200).send(JSON.stringify(products));
        
    } else {
        const products =  await productManager.getProducts(0);
        res.status(200).send(JSON.stringify(products));

    }


});

router.get('/:pid', async (req, res) => {
    const pid = Number(req.params.pid);
    res.status(200).send(JSON.stringify(await productManager.getProductById(pid)));
})


router.post('/', (req, res) =>{
    const product = req.body;
    products.push(product);
    res.send({status :'success', product});
});


export default router;