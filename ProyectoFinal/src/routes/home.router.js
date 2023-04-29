import {
    Router
} from 'express'

import ProductManager from '../managers/ProductManager.js';
const router = Router();
const productManager = new ProductManager('./files/products.json');

const products =  await productManager.getProducts(0);

router.get("/", (req, res) => {
  console.log(products);
  res.render("home", { products: products });
});

export default router;