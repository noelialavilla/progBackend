import fs from 'fs';

export default class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];

    }
    getCarts = async () => {
        if (fs.existsSync(this.path)) {

            const data = await fs.promises.readFile(this.path, 'utf-8');
            if (data) {
                const carts = JSON.parse(data);

                return carts;

            } else {
                await fs.promises.writeFile(this.path, JSON.stringify([]), null, '\t');
                return [];
            }
        }

        return [];

    }

    addCart = async (cart) => {
        const carts = await this.getCarts();
        try {
            if (carts.length === 0) {
                cart.id = 1;

            } else {
                cart.id = carts[carts.length - 1].id + 1;
            }
            if (cart.products === null) {
                return 'No puede crearse el carrito sin productos';

            }

            carts.push(cart);

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
            return 'Se agregó el carrito con éxito.';
        } catch (error) {
            return error;
        }

    };

    getCartById = async (cid) => {
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex(cart => cart.id === cid);
        if (cartIndex === -1) {
            return 'El carrito buscado no existe.';
        } else {
            return carts[cartIndex];
        }

    }

    addProdToCart = async (cid, pid) => {
        const carts = await this.getCarts();
        const cart = await this.getCartById(cid);
        const products = cart.products;
        const productIndex = products.findIndex(prod => prod.id === pid);
        if (productIndex === -1) {
            const nuevoProd = {
                id: pid,
                quantity: 1
            };
            products.push(nuevoProd);
        } else {
            products[productIndex].quantity++;
            
        }
        
        carts[cid].products = products;
        
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        return 'Se agregó el producto al carrito con éxito.';

    };

    

}