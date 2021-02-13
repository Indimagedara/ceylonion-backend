var express = require('express');
var router = express.Router();
var conn = require('../database/db');

router.post('/',(req,res)=>{
    let MaterialName = req.body.MaterialName;
    let UnitOfMeasure = req.body.UnitOfMeasure;
    
    var errors;
    
    if(MaterialName.length === 0 || UnitOfMeasure.length === 0){
        errors = true;
        res.send({
            success: false,
            payload: {
                message: 'cannot insert empty values'
            }
        });
    }
    if(!errors){
        conn.query("SELECT MaterialName FROM materials WHERE MaterialName = ?",MaterialName,(err,rows)=>{
            var isExists = rows.length;
            if(isExists === 0){
                var formData = {
                    MaterialName: MaterialName,
                    UnitOfMeasure: UnitOfMeasure
                }
                conn.query("INSERT INTO materials SET ?", formData,(err,result)=>{
                    if(!err){
                        res.send({
                            success:true, 
                            payload:{
                                message: 'Successfully added!'
                            }
                        });
                    }else{
                        res.send({success:false});
                        console.log(err);
                    }
                });
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
});

router.get('/all',(req,res)=>{
    conn.query("SELECT * FROM materials",(err,rows)=>{
        if(!err){
            res.send(rows)
        }else{
            res.send({success:false});
            console.log(err);
        }
    })
})

router.post('/edit',(req,res)=>{
    let MaterialId = req.body.MaterialId;
    let MaterialName = req.body.MaterialName;
    let UnitOfMeasure = req.body.UnitOfMeasure;
    var errors;
    if(MaterialId.length === 0 || MaterialName.length === 0 || UnitOfMeasure.length === 0){
        errors = true;
        res.send({
            success: false,
            payload: {
                message: 'cannot insert empty values'
            }
        })
    }
    if(!errors){
        var formData = {
            MaterialName: MaterialName,
            UnitOfMeasure: UnitOfMeasure
        }
        conn.query("UPDATE materials SET ? WHERE materialId = ?",[formData,MaterialId],(err,result) => {
            if(!err){
                res.send({success: true})
            }else{
                res.send({success: false})
                console.log(err);
            }
        })
    }
    
})


module.exports = router;