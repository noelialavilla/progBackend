import fs from 'fs';

export default class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];

    }
    getProducts = async (limit) => {
        if (fs.existsSync(this.path)) {
            
            const data = await fs.promises.readFile(this.path, 'utf-8');
            if (data) {
                const products = JSON.parse(data);
                if (limit ===0){
                    return products;
                }
                return products.slice(0,limit);
                
            } else {
                await fs.promises.writeFile(this.path, JSON.stringify([]), null, '\t');
                return [];
            }
        }
        console.log(this.path);
        return [];

    }

    addProduct = async (product) => {
        const products = await this.getProducts(0);
        try {
            if (products.length === 0) {
                product.id = 1;

            } else {
                product.id = products[products.length - 1].id + 1;
            }
            
            if (product.title === null || product.description === null || product.price === null || 
                product.code === null || product.category === null || product.stock === null) {
                return 'No puede crearse el producto con un valor nulo';
                
            }
            
            if (!product.status)
            {
                product.status=true;
            }
            const productsIndex = products.findIndex(prod => prod.code === product.code);
            if (productsIndex != -1) {
                return 'Ya existe un producto con este codigo';
                
            }
            products.push(product);

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            return 'Se agregó el producto con éxito.';
        } catch (error) {
            return error;
        }

    };

    getProductById = async (idBuscado) => {
        const products = await this.getProducts(0);
        const productIndex = products.findIndex(prod => prod.id === idBuscado);
        if (productIndex === -1) {
            return 'Not found';
        } else {
            return products[productIndex];
        }

    }

    updateProduct = async (idProd, actualizacion) => {
        const products = await this.getProducts(0);
        const productIndex = products.findIndex(prod => prod.id === idProd);
        if (productIndex === -1) {
            return 'Not found';
        } else {
            products[productIndex].title = actualizacion.title;
            products[productIndex].description = actualizacion.description;
            products[productIndex].price = actualizacion.price;
            products[productIndex].thumbnail = actualizacion.thumbnail;
            products[productIndex].code = actualizacion.code;
            products[productIndex].stock = actualizacion.stock;

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            return products[productIndex];
        }


    }
    deleteProduct = async (idProd) => {
        const products = await this.getProducts(0);
        const productIndex = products.findIndex(prod => prod.id === idProd);
        if (productIndex === -1) {
            return 'Not found';
        } else {
            products.splice(productIndex, 1);

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            return 'Producto borrado exitosamente';

        }
    }

}