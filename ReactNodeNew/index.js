const express = require('express');

const cors = require('cors');

const database = require('./Database/database');

const app = express();
const SELECT_ALL_PRODUCTS_QUERY =  'SELECT * FROM products';

database.connection.getConnection(err=>{
    if(err){
        return err;
    }else{
        console.log('connected');
    }
})


// const connection = mysql.createConnection({
//     host    : 'localhost',
//     user    : 'jonathan',
//     password: '',
//     database: 'test'
// });

// connection.connect(err=>{
//     if(err){
//         return err;
//     }else{
//         console.log('connected');
//     }
// })

app.use(cors());

app.get('/',(req,res)=>{
    res.send('go to /products to see products');
});

app.get('/products/add',(req,res)=>{
    const{ name, price, image} = req.query;
    const INSERT_PRODUCTS_QUERY = `INSERT INTO products (name, price, image) VALUES ('${name}',${price},'${image}')`;
    database.connection.query(INSERT_PRODUCTS_QUERY,(err,results)=>{
        if(err){
            return res.send(err);
        }else{
            return res.send('successfully added product');
        }
    })
})

app.get('/products/delete/:id',(req,res)=>{
    
    const DELETE_ROW_QUERY = `DELETE FROM products WHERE product_id = ?`;
    database.connection.query(DELETE_ROW_QUERY,[req.params.id],(err,results)=>{
        if(err){
            return res.send(err);
        }else{
            return res.send('delete successfully product');
        }
    })
})

app.get('/products',(req,res)=>{
    database.connection.query(SELECT_ALL_PRODUCTS_QUERY,(err,results)=>{
        if(err){
            return res.send(err);
        }else{
            return res.json({
                data: results
            })
        }
    });
});

app.listen(4000,()=>{
    console.log('Products server listening on port 4000')
})