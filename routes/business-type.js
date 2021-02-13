var express = require('express');
var router = express.Router();
var conn = require('../database/db');

router.get('/all',(req,res)=>{
    conn.query("SELECT * FROM businesstypes",(err,rows)=>{
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
    conn.query("SELECT * FROM businesstypes WHERE BusinessTypeId = ?",id,(err,rows)=>{
        if(!err) {
            res.send(rows);
        }else{
            res.send({success: false});
            console.log(err);
        }
    })
})

router.post('/',(req,res)=>{
    let BusinessType	= req.body.BusinessType;

    var errors;
    if(BusinessType.length === 0){
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
            BusinessType: BusinessType,
        }
        conn.query("SELECT BusinessTypeId from businesstypes WHERE BusinessType=?",BusinessType,(err,rows)=>{
            var isExists = rows.length;
            if(isExists === 0){
                conn.query("INSERT INTO businesstypes SET ?",formData,(err,result)=>{
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
    let BusinessTypeId	= req.body.BusinessTypeId;
    let BusinessType	= req.body.BusinessType;
    
    var errors;
    if(BusinessTypeId.length === 0 || BusinessType.length === 0){
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
            BusinessType: BusinessType
        }
        conn.query("UPDATE businesstypes SET ? WHERE BusinessTypeId = ?",[formData,BusinessTypeId],(err,result)=>{
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