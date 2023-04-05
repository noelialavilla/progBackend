
class ProductManager {
    constructor() {
        this.products = [];

    }

    getProducts = () => {
        return this.products;
    };

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const prod = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        if (title === null || description === null || price === null || thumbnail === null ||
            code === null || stock === null) {
            console.log('No puede crearse el producto con un valor nulo');
            return;
        }
        if (this.products.length === 0) {
            prod.id = 1;

        } else {
            prod.id = this.products[this.products.length - 1].id + 1; //accedemos al ultimo elemento de nuestro arreglo
        }

        const productsIndex = this.products.findIndex(product => product.code === code);
        if (productsIndex != -1) {
            console.log('Ya existe un producto con este codigo');
            return;
        }

        this.products.push(prod);


    };

    getProductById = (idBuscado) => {
        const productIndex = this.products.findIndex(prod => prod.id === idBuscado);
        if (productIndex === -1) {
            console.log('Not found');
            return;
        } else {
            console.log(this.products[productIndex]);
        }

    }

}

/* Pruebas.
const manejadorProductos = new ProductManager();
console.log(manejadorProductos.getProducts());
manejadorProductos.addProduct('harina', 'harina1', 55, 'sdad', 1, 5);
manejadorProductos.addProduct('carbon', 'carbon2', 78, 'sdadffd', 6, 7);
console.log(manejadorProductos.getProducts());
manejadorProductos.getProductById(3); */