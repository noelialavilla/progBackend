import { cartModel } from '../models/carts.model.js';
import ProductManager from './products.manager.js';

export default class CartManager {
    constructor() {
        console.log('Working carts with DB');
    }

    getCarts = async () => {
        const carts = await cartModel.find().lean();
        return carts;

    }

    addCart = async () => {

        const newCart = new cartModel();
        await newCart.save();
        return newCart;

    };

    getCartId = async (cid) => {
        let carts = await this.getCarts();
        const cartIndex = carts.findIndex(cart => cart.idCart === cid);
        return cartIndex;

    }
    getCartById = async (cid) => {
        const cart = await cartModel.findOne({ _id: id }).lean();

        return cart;

    }
    // Product modification
    updateProducts = async (cid, products) => {
        let result = await cartModel.updateOne(
            { _id: cid },
            { $push: { products: products } }
        );
        return result;
    };
    updateProductQuantity = async (cid, pid, quantity) => {
        let result = await cartModel.updateOne(
            { _id: cid, "products.product": pid },
            { $inc: { "products.$.quantity": quantity } }
        );
        return result;
    };

    deleteProduct = async (cid, pid) => {
        let result = await cartModel.updateOne(
            { _id: cid },
            { $pull: { products: { product: { _id: pid } } } }
        );
        return result;
    };
    deleteCart = async (id) => {
        const result = await cartModel.findByIdAndDelete(id);
        return result;
    };

    checkIfProductExist = async (pid) => {
        let productManager = new ProductManager();
        let product = await productManager.getProductById(pid);
        return product;
    };

    addProdToCart = async (cid, pid) => {
        let product = await this.checkIfProductExist(pid);
        if (product?.error) throw new Error("El producto que intenta agregar no existe");

        let cart = await this.getCart(cid);
        if (cart?.error) throw new Error(`The cart does not exist.`);

        let productExist = cart.products.find(
            ({ product }) => product._id.toString() === pid
        );
        let result;

        if (productExist) {
            result = await cartModel.updateOne(
                { _id: cid, "products.product": pid },
                { $inc: { "products.$.quantity": 1 } }
            );
        } else {
            result = await cartModel.updateOne(
                { _id: cid },
                { $push: { products: { product: pid, quantity: 1 } } }
            );
        }
        return result;
    };
}