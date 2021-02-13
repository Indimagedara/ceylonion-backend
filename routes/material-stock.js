var express = require('express');
var router = express.Router();
var conn = require('../database/db');

router.get('/all',(req,res)=>{
    conn.query("SELECT * FROM materialstock m INNER JOIN suppliers s ON m.SupplierId=s.SupplierId INNER JOIN materials mat ON m.MaterialId=mat.MaterialId",(err,rows)=>{
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
    conn.query("SELECT * FROM materialstock m INNER JOIN suppliers s ON m.SupplierId=s.SupplierId INNER JOIN materials mat ON m.MaterialId=mat.MaterialId WHERE m.MaterialStockId = ?",id,(err,rows)=>{
        if(!err) {
            res.send(rows);
        }else{
            res.send({success: false});
            console.log(err);
        }
    })
})

router.post('/',(req,res)=>{
    let SupplierId	= req.body.SupplierId;
    let MaterialId = req.body.MaterialId;
    let Quantity = req.body.Quantity;
    let Price = req.body.Price;
    let PaymentType	= req.body.PaymentType;
    let InvoiceNumber = req.body.InvoiceNumber;
    let ReceiveStatus = req.body.ReceiveStatus;
    let DatePurchased = req.body.DatePurchased;

    var errors;
    if(SupplierId.length === 0 || MaterialId.length === 0 ||Quantity.length === 0 || Price.length === 0 || PaymentType.length === 0 || InvoiceNumber.length === 0 || ReceiveStatus.length === 0 || DatePurchased.length === 0){
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
            SupplierId: SupplierId,
            MaterialId: MaterialId,
            Quantity: Quantity,
            Price: Price,
            PaymentType: PaymentType,
            InvoiceNumber: InvoiceNumber,
            ReceiveStatus: ReceiveStatus,
            DatePurchased: DatePurchased
        }
        conn.query("INSERT INTO materialstock SET ?",formData,(err,result)=>{
            if(!err){
                res.send({success: true})
            }else{
                res.send({success: false});
                console.log(err);
            }
        })
    }
})

router.post('/update',(req,res)=>{
    let MaterialStockId	= req.body.MaterialStockId;
    let SupplierId	= req.body.SupplierId;
    let MaterialId = req.body.MaterialId;
    let Quantity = req.body.Quantity;
    let Price = req.body.Price;
    let PaymentType	= req.body.PaymentType;
    let InvoiceNumber = req.body.InvoiceNumber;
    let ReceiveStatus = req.body.ReceiveStatus;
    let DatePurchased = req.body.DatePurchased;
    
    var errors;
    if(MaterialStockId.length === 0 || SupplierId.length === 0 || MaterialId.length === 0 ||Quantity.length === 0 || Price.length === 0 || PaymentType.length === 0 || InvoiceNumber.length === 0 || ReceiveStatus.length === 0 || DatePurchased.length === 0){
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
            SupplierId: SupplierId,
            MaterialId: MaterialId,
            Quantity: Quantity,
            Price: Price,
            PaymentType: PaymentType,
            InvoiceNumber: InvoiceNumber,
            ReceiveStatus: ReceiveStatus,
            DatePurchased: DatePurchased
        }
        conn.query("UPDATE materialstock SET ? WHERE MaterialStockId = ?",[formData,MaterialStockId],(err,result)=>{
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