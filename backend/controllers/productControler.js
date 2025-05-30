
const productModel = require("../model/productModel")
exports.getProduct = async (req, res, next) => {
    try {
        const productList = await productModel.find();
        res.status(200).json({
            status: 'success',
            data: {
                productList
            }
        })
    }
    catch (error) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}


exports.createProduct = async (req, res, next) => {
    try {
        const newCategory = await productModel.create(req.body);
        res.status(201).json({
            status: "success",
            data: newCategory
        })
    } catch (error) {
        res.status(500).json({
            staus: error
        })
    }
}

exports.updateProducr = async (req, res, next) => {
    try {
       
     const updateProduct=   await productModel.findByIdAndUpdate(req.params.id, {
            productName: req.body.productName
        }, {
            new: true
        })
        res.status(200).json({
            status: "success",
            data: updateProduct
        })
    }
    catch (error) {
        res.status(500).json({
            status: "fail",
            data: null
        })

    }

}