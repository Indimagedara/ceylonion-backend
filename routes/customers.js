var express = require('express');
var router = express.Router();
var conn = require('../database/db');

router.get('/all',(req,res)=>{
    conn.query("SELECT * FROM customers c INNER JOIN businesstypes b ON c.BusinessType = b.BusinessTypeId",(err,rows)=>{
        if(!err){
            res.send(rows)
        }else{
            res.send({success: false}),
            console.log(err);
        }
    })
})

router.get('/:id',(req,res)=>{
    let id = req.params.id;
    conn.query("SELECT * FROM customers c INNER JOIN businesstypes b ON c.BusinessType=b.BusinessTypeId WHERE c.CustomerId=?",id,(err,rows)=>{
        if(!err){
            res.send(rows)
        }else{
            res.send({success: false}),
            console.log(err);
        }
    })
})

router.post('/',(req,res)=>{
    let BusinessName = req.body.BusinessName;
    let BusinessType = req.body.BusinessType;
    let ContactName	= req.body.ContactName;
    let Phone = req.body.Phone;
    let Area = req.body.Area;
    let DateAdded = new Date();

    var errors;
    if(BusinessName.length === 0 || BusinessType.length === 0 || ContactName.length === 0 || Phone.length === 0 || Area.length === 0 || DateAdded.length === 0){
        errors = true;
        res.send({
            success: false,
            payload: {
                message: 'Empty values'
            }
        })
    }
    if(!errors){
        var formData = {
            BusinessName: BusinessName,
            BusinessType: BusinessType,
            ContactName: ContactName,
            Phone: Phone,
            Area: Area,
            DateAdded: DateAdded
        }
        conn.query("SELECT BusinessName FROM customers WHERE BusinessName = ? ", BusinessName, (err,rows)=>{
            var isExists = rows.length;
            if(isExists === 0){
                conn.query("INSERT INTO customers SET ?",formData,(err,result)=>{
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
    let CustomerId	= req.body.CustomerId;
    let BusinessName = req.body.BusinessName;
    let BusinessType = req.body.BusinessType;
    let ContactName	= req.body.ContactName;
    let Phone = req.body.Phone;
    let Area = req.body.Area;
    let DateAdded = new Date();
    
    var errors;
    if(CustomerId.length === 0 || BusinessName.length === 0 || BusinessType.length === 0 || ContactName.length === 0 || Phone.length === 0 || Area.length === 0 || DateAdded.length === 0){
        errors = true;
        res.send({
            success: false,
            payload: {
                message: 'Empty values'
            }
        })
    }

    if(!errors){
        var formData = {
            CustomerId : CustomerId,	
            BusinessName: BusinessName,
            BusinessType: BusinessType,
            ContactName: ContactName,
            Phone: Phone,
            Area: Area,
            DateAdded: DateAdded
        }
        conn.query("UPDATE customers SET ? WHERE CustomerId = ?",[formData,CustomerId],(err,result)=>{
            if(!err){
                res.send({success: true})
            }else{
                res.send({success: false})
                console.log(err);
            }
        })
    }else{
        res.send({success: false})
    }

})

module.exports = router;