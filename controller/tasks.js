import express from 'express';
import Product from '../models/product.js';
import Category from '../models/category.js';
const router = express.Router();


router.post('/add_category', async (req, res) => {
    const { categoryName, categoryImage } = req.body;
    Category.create({
        categoryName: categoryName,
        categoryImage: categoryImage
    })
        .then(result => {
            console.log(result);
            return res.redirect('/dashboard');
        })
        .catch(error => {
            console.log(error.message);
            return res.redirect('/dashboard');
        })
});

router.post('/edit_category/:id', async (req, res) => {
    const { categoryName, categoryImage } = req.body;
    const id = req.params.id;
    Category.update({ categoryName: categoryName, categoryImage: categoryImage },
        { where: { id: id } })
        .then(result => {
            console.log(result);
            return res.redirect('/products/' + id);
        })
        .catch(error => {
            console.log(error.message);
            return res.redirect('/products' + id);
        })
});

router.post('/delete_category/:id', async (req, res) => {
    const id = req.params.id;
    Category.destroy({ where: { id: id } })
        .then(result => {
            Product.destroy({ where: { categoryId: id } })
            console.log(result)
            return res.redirect('/dashboard')
        })
        .catch(error => {
            console.log(error.message)
            return res.redirect('/dashboard')
        })
});


router.post('/add_product/:id', async (req, res) => {
    const { productName, productPrice, productMainImage, productDescription, isAvailable, unitInStock } = req.body;
    const categoryId = req.params.id;
    Product.create({
        productName: productName,
        productPrice: productPrice,
        productMainImage: productMainImage,
        productDescription: productDescription,
        isAvailable: isAvailable,
        unitInStock: unitInStock,
        categoryId: categoryId
    })
        .then(result => {
            console.log(result);
            return res.redirect('/products/' + categoryId)
        })
        .catch(error => {
            console.log(error.message);
            return res.redirect('/products/' + categoryId)
        })
});



router.post('/edit_product/:id', async (req, res) => {
    const { productName, productPrice, productMainImage, productDescription, isAvailable, unitInStock, categoryId } = req.body;
    const id = req.params.id;
    Product.update({
        productName: productName,
        productPrice: productPrice,
        productMainImage: productMainImage,
        productDescription: productDescription,
        isAvailable: isAvailable,
        unitInStock: unitInStock,
        categoryId: categoryId
    },
        { where: { id: id } })
        .then(result => {
            console.log(result);
            return res.redirect('/products/' + categoryId);
        })
        .catch(error => {
            console.log(error.message);
            return res.redirect('/products/' + categoryId);
        })
});

router.post('/delete_product/:id', async (req, res) => {
    const id = req.params.id;
    Product.destroy({ where: { id: id } }).then(result => {
        console.log(result)
        return res.redirect('/dashboard')
    })
        .catch(error => {
            console.log(error.message)
            return res.redirect('/dashboard')
        })
});


export default router;