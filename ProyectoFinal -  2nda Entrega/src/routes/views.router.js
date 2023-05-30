import { Router } from 'express'
import ProductManager from '../managers/products.manager.js';
import { productModel } from '../models/products.model.js';
import CartManager from '../managers/carts.manager.js';

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

router.get("/", async (req, res) => {
  const { limit = 10, page = 1, sort = 0, category } = req.query;

  let filter = {};

  if (category) {
    filter.category = category;
  }

  // Sort options
  let sortType;
  if (sort === "asc") {
    sortType = 1;
  } else if (sort === "desc") {
    sortType = -1;
  }

  const {
    docs,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    prevLink,
    nextLink,
  } = await productModel.paginate(filter, {
    limit,
    page,
    sort: sortType,
    lean: true,
  });

  let productsList = docs.slice(0, limit);

  res.render("home", {
    productsList: productsList,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    prevLink,
    nextLink,
    currentSort: sort,
  });
});

router.get("/carts/:cid", async (req, res) => {
  let { cid } = req.params;
  let { products, _id } = await cartManager.getCart(cid);
  res.render("cart", { title: "Products", products, _id });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts(0);
  res.render("realTimeProducts", { products });

});


export default router;