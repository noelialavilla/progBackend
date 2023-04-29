import {
    Router
} from 'express'

import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager();

router.get('/', async (req, res) => { 
    res.render('realTimeProducts', { products: productManager.getProducts(0) });
});



export default router;