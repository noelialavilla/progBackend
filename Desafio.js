

class ProductManager {
    constructor(){
        this.products = [];
    }
    constructor(products){
        this.products = products;
        
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        prod = Product(title, description, price, thumbnail, code, stock)

        this.products.push(prod);
    }
    getProducts = () => {
        return this.products;
    }

    


}

class Product{

    constructor(title, description, price, thumbnail, code, stock){
        this.title =title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
         
    }

}