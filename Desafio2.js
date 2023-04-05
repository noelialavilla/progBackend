const fs = require('fs');
const operacionesArchivosAsincrona=async() =>{
    fs.promises.writeFile('.fs-desafio2.txt', 'cadenaprueba');
}