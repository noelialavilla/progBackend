
class ProductManager {
    constructor(products){
        this.products = products;
        
    }

    static id = 0;

    addProduct = (title, description, price, thumbnail, code, stock) => {
        var prod = new Product(title, description, price, thumbnail, code, stock);
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].code == prod.code) {
                console.log(`No se puede añadir producto ${prod.title}, code repetido.`);
                return;
            }
        }
        this.products.push(prod);
        ProductManager.id++;



    };
    getProducts = () => {
        return this.products;
    };




}

class Product {

    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = ProductManager.id;

    }

}
