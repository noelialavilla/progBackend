import express from 'express';
import router from './routes/products.router.js';
import {__dirname} from './utils.js';

const app = express();

//Parametros de configuración
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//Configuracion para agregar funcionalidad de archivos estaticos
app.use(express.static(`${__dirname}/public`));


app.use('/api/products', router);





app.listen(8080, () =>console.log('Server running on port 8080'));
