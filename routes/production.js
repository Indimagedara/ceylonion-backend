var express = require('express');
var router = express.Router();
var conn = require('../database/db');

router.get('/all',(req,res)=>{
    conn.query("SELECT * FROM production",(err,rows)=>{
        if(!err) {
            res.send(rows);
        }else {
            res.send({success: false});
            console.log(err);
        }
    })
});

router.get('/:id',(req,res)=>{
    let id = req.params.id;
    var errors;
    if(id.length === 0){
        errors = true;
        res.send({
            success: false,
            payload: {
                message: 'empty values'
            }
        })
    }

    if(!errors){
        conn.query("SELECT * FROM production",(err,rows)=>{
            if(!err) {
                res.send(rows);
            }else {
                res.send({success: false});
                console.log(err);
            }
        })
    }
});

router.post('/',(req,res)=>{
    let ProductId = req.body.ProductId;
    let BatchNumber	= req.body.BatchNumber;
    let Materials = req.body.Materials;
    let QuantityProduced = req.body.QuantityProduced;
    let ExpDate = req.body.ExpDate;
    let ManufacturedDate = req.body.ManufacturedDate;

    var errors;

    if(ProductId.length === 0 || BatchNumber === 0 || Materials.length === 0 || QuantityProduced === 0 || ExpDate.length === 0 || ManufacturedDate === 0){
        errors = true;
        res.send({
            success: false,
            payload: {
                message: 'Empty values'
            }
        })
    }
    
    if(!errors){
        conn.query("SELECT ProductionId FROM production WHERE BatchNumber = ?",BatchNumber,(err,rows)=>{
            if(!err){
                var isExists = rows.length;
                if(isExists === 0){
                    var formData = {
                        ProductId: ProductId,
                        BatchNumber: BatchNumber,
                        Materials: Materials,
                        QuantityProduced: QuantityProduced,
                        ExpDate: ExpDate,
                        ManufacturedDate: ManufacturedDate
                    }
                    conn.query("INSERT INTO production SET ?",formData,(err,result)=>{
                        if(!err){
                            res.send({
                                success:true,
                                payload: {
                                    message: 'Sucess'
                                }
                            })
                        }else{
                            res.send({success: false});
                            console.log(err);
                        }
                    })
                }else{
                    res.send({
                        success: false,
                        payload: {
                            message: 'Record already exists. you may update it.'
                        }
                    })
                }
            }
        })
    }
});

router.post('/update',(req,res)=>{
    let ProductionId = req.body.ProductionId;
    let ProductId = req.body.ProductId;
    let BatchNumber	= req.body.BatchNumber;
    let Materials = req.body.Materials;
    let QuantityProduced = req.body.QuantityProduced;
    let ExpDate = req.body.ExpDate;
    let ManufacturedDate = req.body.ManufacturedDate;
    
    var errors;
    
    if(ProductionId.length === 0|| ProductId.length === 0 || BatchNumber === 0 || Materials.length === 0 || QuantityProduced === 0 || ExpDate.length === 0 || ManufacturedDate === 0){
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
            ProductId: ProductId,
            BatchNumber: BatchNumber,
            Materials: Materials,
            QuantityProduced: QuantityProduced,
            ExpDate: ExpDate,
            ManufacturedDate: ManufacturedDate
        }
        conn.query("UPDATE production SET ? WHERE ProductionId = ? ",[formData,ProductionId],(err,result)=>{
            if(!err){
                res.send({success:true, payload:{message:'Success'}});
            }else{
                res.send({success:false});
                console.log(err);
            }
        })
    }
    
})

module.exports = router;