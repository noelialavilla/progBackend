import mongoose from 'mongoose';

const productCollection = 'products';

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    teacher:{
        type: String,
        required: true
    },
    students:{
        type: Array,
        default: []
    }
});

export const courseModel = mongoose.model(productCollection, productSchema)