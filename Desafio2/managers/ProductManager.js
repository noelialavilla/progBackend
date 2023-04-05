import fs from 'fs';

export default class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];

    }
    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            return products;
        }
        return [];

    }

    addProduct = async (product) => {
        const products = await this.getProducts();
        try {
            if (products.length === 0) {
                product.id = 1;

            } else {
                product.id = products[products.length - 1].id + 1;
            }
            products.push(product);

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            return product;
        } catch (error) {
            console.log(error);
        }

    };

    getProductById = async(idBuscado) => {
        const products = await this.getProducts();
        const productIndex = products.findIndex(prod => prod.id === idBuscado);
        if (productIndex === -1) {
            console.log('Not found');
            return;
        } else {
            return products[productIndex];
        }

    }

    updateProduct = async(idProd, actualizacion) =>{
        const products = await this.getProducts();
        const productIndex = products.findIndex(prod => prod.id === idProd);
        if (productIndex === -1) {
            console.log('Not found');
            return;
        } else {
            products[productIndex].title =actualizacion.title;
            products[productIndex].description =actualizacion.description;
            products[productIndex].price =actualizacion.price;
            products[productIndex].thumbnail =actualizacion.thumbnail;
            products[productIndex].code =actualizacion.code;
            products[productIndex].stock =actualizacion.stock;
            
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            return products[productIndex];
        }


    }
    deleteProduct = async (idProd) =>{
        const products = await this.getProducts();
        const productIndex = products.findIndex(prod => prod.id === idProd);
        if (productIndex === -1) {
            console.log('Not found');
            return;
        } else {
            products.splice(productIndex,1);
            
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            
        }
    }

}