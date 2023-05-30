import mongoose from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        default: []
    }
});

cartSchema.pre("find", function () {
    this.populate("products.product");
  });
  
  cartSchema.pre("findOne", function () {
    this.populate("products.product");
  });
  
export const cartModel = mongoose.model(cartCollection, cartSchema)