import { Router } from 'express';
import ProductManager from '../managers/products.manager.js'
import { productModel } from '../models/products.model.js';

const router = Router();
const productManager = new ProductManager();


router.get('/', async (req, res) => {
    const { limit = 10, page = 1, sort = 0, query } = req.query;
    const sortOrder = sort === "desc" ? -1 : 1;

    try {
        const filterQuery = query ? { category: query } : {};

        const {
            docs,
            totalPages,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage
        } = await productModel.paginate(filterQuery, { sortOrder, limit, page, lean: true });


        const response = {
            status: "success",
            payload: docs,
            totalPages,
            page,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            prevLink:
                hasPrevPage
                    ? `${req.baseUrl}?limit=${limit}&page=${prevPage
                    }&sort=${sort}&query=${query}`
                    : null,
            nextLink:
                hasNextPage
                    ? `${req.baseUrl}?limit=${limit}&page=${nextPage
                    }&sort=${sort}&query=${query}`
                    : null,

        };
        

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({
            status: "error",
            error,
        });
    }
});


router.get('/:pid', async (req, res) => {
    const pid = Number(req.params.pid);
    res.status(200).send(JSON.stringify(await productManager.getProductById(pid)));
})



router.post("/", async (req, res) => {
    const { title, description, category, price, thumbnail, code, stock } =
        req.body;

    const product = {
        title,
        description,
        category,
        price,
        thumbnail,
        code,
        stock,
    };

    try {
        const createProduct = await productManager.addProduct(product);
        res.status(201).json({ status: "Success", payload: createProduct });
    } catch (error) {
        res.status(406).json({ info: "Product already present in list", error });
    }
});

router.put('/:pid', async (req, res) => {
    const pid = Number(req.params.pid);
    const product = req.body;
    res.status(200).send(JSON.stringify(await productManager.updateProduct(pid, product)));

});

router.delete('/:pid', async (req, res) => {
    const pid = Number(req.params.pid);
    const io = req.app.get('socketio');
    io.emit("showProducts", await productManager.getProducts(0));
    res.status(200).send(JSON.stringify(await productManager.deleteProduct(pid)));

});


export default router;