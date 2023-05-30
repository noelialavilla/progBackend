import { Router } from 'express';
import CartManager from '../managers/carts.manager.js'


const cartManager = new CartManager();

const router = Router();


router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const cart = await cartManager.getCartById(id);
        res.status(200).json({ status: "Cart Found", payload: cart });
    } catch (error) {
        res.status(400).json({ info: "Error", error });
    }
});


// Add a product to a cart
router.post("/:cid/products/:pid", async (req, res) => {
    const cid = Number(req.params.cid);
    const pid = Number(req.params.pid);
    try {

        res.send(JSON.stringify(await cartManager.addProdToCart(cid, pid)));
    } catch (error) {
        res.status(400).json({ info: "Error", error });
    }
});

router.post("/", async (req, res) => {
    try {
        const newCart = await cartManager.addCart();
        res.status(201).json({ status: "Success", payload: newCart._id });
    } catch (error) {
        res.status(400).json({ info: "Error", error });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const cart = await cartManager.deleteCart(req.params.id);
        res.status(200).json({ status: "Cart Deleted", payload: cart });
    } catch (error) {
        res.status(400).json({ info: "Error", error });
    }
});

// Add a product to a cart
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    try {
        const addProductToCart = await cartManager.updateCart(id, product);
        res
            .status(200)
            .json({ status: "Product added to cart", payload: addProductToCart });
    } catch (error) {
        res.status(400).json({ info: "Error", error });
    }
});


router.delete("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        let delProd = await cartManager.deleteProduct(cid, pid);
        res.send({ ...delProd });
    } catch (error) {
        res.status(400).send({ ...delProd, error });
    }
});

router.put("/:cid", async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    try {
        let uptProd = await cartManager.updateProducts(cid, products);
        res.send({ ...uptProd });
    } catch (error) {
        res.status(400).send({ ...uptProd, error });
    }
});

router.put("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        let uptProdQua = await cartManager.updateProductQuantity(
            cid,
            pid,
            quantity
        );
        res.send({ ...uptProdQua });
    } catch (error) {
        res.status(400).send({ ...uptProdQua });
    }
});

export default router;