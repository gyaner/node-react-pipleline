const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'A Category must have a productName'],
        //unique: true,
        trim: true,
    },
    
    ProductCode: {
        type: String,
        required: [true, 'A Category must have a ProductCode'],
        //unique: true,
        trim: true,
    },

    ProductCatgory: {
        type: String,
        required: [true, 'A Category Category have a ProductCatgory'],
        //unique: true,
        trim: true,
    },
    ProductSpecification: {
        type: String,
        required: [true, 'A Category must have a ProductSpecification'],
        //unique: true,
        trim: true,
    },
    skuNo: {
        type: Number,
        required: [true, 'A Category must have a skuNo'],
        //unique: true,
        trim: true,
    },
    productDescription: {
        type: String,
        required: [true, 'A Category must have a productDescription'],
        //unique: true,
        trim: true,
    },
    status: {

        type: Boolean,
        default: true,
        required: [true, 'A Category must have a status'],

    }
})
const Product = mongoose.model('Products', productSchema);

module.exports = Product;
