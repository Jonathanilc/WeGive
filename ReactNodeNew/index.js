const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_PRODUCTS_QUERY =  'SELECT * FROM products';

const pool = mysql.createPool({
    connectionLimit : 100,
    waitForConnections : true,
    queueLimit :0,
    host    : 'sql12.freemysqlhosting.net',
    user    : 'sql12250913',
    password: '2xGmuiZblZ',
    database: 'sql12250913',
    debug    :  true,
    wait_timeout : 28800,
    connect_timeout :10
});

pool.getConnection(err=>{
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
    pool.query(INSERT_PRODUCTS_QUERY,(err,results)=>{
        if(err){
            return res.send(err);
        }else{
            return res.send('successfully added product');
        }
    })
})

app.get('/products/delete/:id',(req,res)=>{
    
    const DELETE_ROW_QUERY = `DELETE FROM products WHERE product_id = ?`;
    pool.query(DELETE_ROW_QUERY,[req.params.id],(err,results)=>{
        if(err){
            return res.send(err);
        }else{
            return res.send('delete successfully product');
        }
    })
})

app.get('/products',(req,res)=>{
    pool.query(SELECT_ALL_PRODUCTS_QUERY,(err,results)=>{
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