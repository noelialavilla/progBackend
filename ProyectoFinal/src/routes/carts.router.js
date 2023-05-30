import { Router } from 'express';
import CartManager from '../managers/carts.manager.js' 

const cartManager = new CartManager('./files/carts.json');

const cartRouter = Router();

cartRouter.get('/:cid', async (req, res) => {
    const cid = Number(req.params.cid);
    res.status(200).send(JSON.stringify(await cartManager.getCartById(cid)));
})

cartRouter.post('/', async (req, res) =>{
    const cart = req.body;
    res.status(200).send(JSON.stringify(await cartManager.addCart(cart)));
    
});

cartRouter.post('/:cid/product/:pid', async (req, res) =>{
    const cid = Number(req.params.cid);
    const pid = Number(req.params.pid);
    res.status(200).send(JSON.stringify(await cartManager.addProdToCart(cid,pid)));
    
});


export default cartRouter;