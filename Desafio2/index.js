import ProductManager from './managers/ProductManager.js';
const manager = new ProductManager('./files/products.json');
const env = async() =>{
    const productos = await manager.getProducts();
   /*  const producto ={
        title: 'Harina',
        description: 'Harina leudante',
        price: 220,
        thumbnail: '/imager.jpg',
        code: 'ABC4',
        stock: 5
    };
    const producto2 ={
        title: 'Carbon',
        description: 'Carboncito',
        price: 500,
        thumbnail: '/imagenC.jpg',
        code: 'ABC5',
        stock: 6
    };
    const producto3 ={
        title: 'Pan',
        description: 'Pancito',
        price: 100,
        thumbnail: '/imagenP.jpg',
        code: 'ABC7',
        stock: 6
    };

    await manager.addProduct(producto);
    await manager.addProduct(producto2);
    await manager.addProduct(producto3); 

    const productsResult = await manager.getProducts();
    const prodsById = await manager.getProductById(2);
    console.log(prodsById); 
    const producto4 ={
        title: 'Pan Frances',
        description: 'Pancito fran',
        price: 100,
        thumbnail: '/imagenP.jpg',
        code: 'ABC7',
        stock: 7
    };
    const product= await manager.updateProduct(2,producto4 );
    
    const productsDelete = await manager.deleteProduct(3);*/


    
}

env();
