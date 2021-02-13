var express = require('express');
var router = express.Router();
var conn = require('../database/db');

router.get('/all',(req,res)=>{
    conn.query("SELECT * FROM employee",(err,rows)=>{
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
    conn.query("SELECT * FROM employee WHERE EmployeeId = ?",id,(err,rows)=>{
        if(!err) {
            res.send(rows);
        }else{
            res.send({success: false});
            console.log(err);
        }
    })
})

router.post('/',(req,res)=>{
    let Name	= req.body.Name;
    let Phone	= req.body.Phone;
    let Email	= req.body.Email;
    let Role	= req.body.Role;
    let Status	= req.body.Status;

    var errors;
    if(Name.length === 0 || Phone.length === 0 || Email.length === 0 || Role.length === 0 || Status.length === 0){
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
            Name: Name,
            Phone: Phone,
            Email: Email,
            Role: Role,
            Status: Status
        }
        conn.query("SELECT EmployeeId from employee WHERE Name=?",Name,(err,rows)=>{
            var isExists = rows.length;
            if(isExists === 0){
                conn.query("INSERT INTO employee SET ?",formData,(err,result)=>{
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
    let EmployeeId 	= req.body.EmployeeId;
    let Name	= req.body.Name;
    let Phone	= req.body.Phone;
    let Email	= req.body.Email;
    let Role	= req.body.Role;
    let Status	= req.body.Status;
    
    var errors;
    if(EmployeeId.length ===0 || Name.length === 0 || Phone.length === 0 || Email.length === 0 || Role.length === 0 || Status.length === 0){
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
            Name: Name,
            Phone: Phone,
            Email: Email,
            Role: Role,
            Status: Status
        }
        conn.query("UPDATE employee SET ? WHERE EmployeeId = ?",[formData,EmployeeId],(err,result)=>{
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