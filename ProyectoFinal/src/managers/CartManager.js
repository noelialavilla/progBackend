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
        let carts = await this.getCarts();
        try {
            if (carts.length === 0) {
                cart.idCart = 1;

            } else {
                cart.idCart = carts[carts.length - 1].id + 1;
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

    getCartId = async (cid) => {
        let carts = await this.getCarts();
        const cartIndex = carts.findIndex(cart => cart.idCart === cid);
        return cartIndex;

    }
    getCartById = async (cid) => {
        let carts = await this.getCarts();
        let idCart = await this.getCartId(cid);
        
        return carts[idCart];

    }

    addProdToCart = async (cid, pid) => {
        let carts = await this.getCarts();

        let cartIndex = await this.getCartId(cid);
        if (cartIndex ===-1){
            return "No se puede agregar el producto ya que el carrito indicado no existe."
        }

        let products = carts[cartIndex].products;
        const productIndex = products.findIndex(prod => prod.idProd === pid);
        if (productIndex === -1) {
            const nuevoProd = {
                idProd: pid,
                quantity: 1
            };
            products.push(nuevoProd);
        } else {
            products[productIndex].quantity++;

        }

        carts[cartIndex].products = products;

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        return 'Se agregó el producto al carrito con éxito.';

    };



}