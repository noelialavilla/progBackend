import { Router } from 'express';


const products =[];
const router = Router();



router.get('/', (req, res) =>{
    res.send({products})

});

router.post('/', (req, res) =>{
    const product = req.body;
    products.push(product);
    res.send({status :'success', product});
});


export default router;