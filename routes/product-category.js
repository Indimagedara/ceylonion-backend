var express = require('express');
var router = express.Router();
var conn = require('../database/db');

router.get('/all',(req,res)=>{
    conn.query("SELECT * FROM productcategory",(err,rows)=>{
        if(!err) {
            res.send(rows);
        }else{
            res.send({success: false});
            console.log(err);
        }
    })
})

router.get('/:id',(req,res)=>{
    let id = req.params.id
    conn.query("SELECT * FROM productcategory WHERE CategoryId = ?",id,(err,rows)=>{
        if(!err) {
            res.send(rows);
        }else{
            res.send({success: false});
            console.log(err);
        }
    })
})

router.post('/',(req,res)=>{
    let Category	= req.body.Category;
    let Status	= req.body.Status;

    var errors;
    if(Category.length === 0 || Status.length === 0){
        errors = true;
        res.send({
            success: false,
            payload: {
                message: 'cannot insert empty values'
            }
        });
    }
    
    if(!errors){
        var formData = {
            Category: Category,
            Status: Status
        }
        conn.query("SELECT CategoryId from productcategory WHERE Category=?",Category,(err,rows)=>{
            var isExists = rows.length;
            if(isExists === 0){
                conn.query("INSERT INTO productcategory SET ?",formData,(err,result)=>{
                    if(!err){
                        res.send({success: true})
                    }else{
                        res.send({success: false});
                        console.log(err);
                    }
                })
            }else{
                res.send({
                    success:false, 
                    payload:{
                        message: 'Already exists!'
                    }
                });
            }
        })
    }
})

router.post('/update',(req,res)=>{
    let CategoryId = req.body.CategoryId;
    let Category = req.body.Category;
    let Status	= req.body.Status;
    
    var errors;
    if(CategoryId.length === 0 || Category.length === 0 || Status.length === 0){
        errors = true;
        res.send({
            success: false,
            payload: {
                message: 'cannot insert empty values'
            }
        });
    }
    
    if(!errors){
        var formData = {
            Category: Category,
            Status: Status
        }
        conn.query("UPDATE productcategory SET ? WHERE CategoryId = ?",[formData,CategoryId],(err,result)=>{
            if(!err){
                res.send({success: true})
            }else{
                res.send({success: false, err: err});
                console.log(err);
            }
        })
    }
})

module.exports = router;