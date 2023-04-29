import {
    Router
} from 'express'

import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager('./files/products.json');


router.get("/", async (req, res) => {
    const products = await productManager.getProducts(0);
    res.render("home", { products });
  });
  
  router.get("/realtimeproducts", async (req, res) => {
    const products = await productManager.getProducts(0);
    res.render("realTimeProducts", { products });

  });


export default router;