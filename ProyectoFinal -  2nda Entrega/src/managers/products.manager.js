import { productModel } from '../models/products.model.js';

export default class ProductManager {
    getProducts = async () => {
        const products = await productModel.find().lean();
        return products;
    };

    getProductById = async (id) => {
        const findById = await productModel.findOne({ _id: id }).lean();
        return findById;
    };

    addProduct = async (product) => {
        const createProduct = await productModel.create(product);
        return createProduct;
    };

    updateProduct = async (productId, newProduct) => {
        const findAndUpdate = await productModel.findByIdAndUpdate(
            productId,
            newProduct
        );
        return findAndUpdate;
    };

    deleteProduct = async (id) => {
        // Borrado Fisico
        let findAndDelete = await productModel.deleteOne({ _id: id });
        return findAndDelete;
    };
}

