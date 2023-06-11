import express from "express";
import Product from '../models/product.js';
import Category from '../models/category.js';
const router = express.Router();

router.get('/dashboard', async (req, res) => {
    Category.findAll()
        .then(categories => {
            res.render('index', {
                pageTitle: 'Welcome to Admin',
                categories: categories
            })
        })
        .catch(error => {
            res.render('index', {
                pageTitle: 'Welcome to Admin'
            })
        })
})

router.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    Category.findByPk(id)
        .then(category => {
            if (category === null) {
                res.redirect('/dashboard');
                return;
            }
            Product.findAll({ where: { categoryId: id } })
                .then(products => {
                    res.render('products', {
                        pageTitle: 'Edit ' + category.categoryName,
                        category: category,
                        products: products
                    })
                })
        })
        .catch(error => {
            res.render('index', {
                pageTitle: 'Welcome to Admin'
            })
        })
})


router.get('/product/:id', async (req, res) => {
    const id = req.params.id;
    Product.findByPk(id)
        .then(product => {
            Category.findAll()
                .then(categories => {
                    if (product == null) {
                        res.redirect('/dashboard');
                        return;
                    }
                    res.render('product', {
                        pageTitle: 'Edit ' + product.productName,
                        product: product,
                        categories: categories
                    });
                })
        })
        .catch(error => {
            res.render('index', {
                pageTitle: 'Welcome to Admin'
            })
        })
});





export default router;