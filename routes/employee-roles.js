var express = require('express');
var router = express.Router();
var conn = require('../database/db');

router.get('/all',(req,res)=>{
    conn.query("SELECT * FROM employeeroles",(err,rows)=>{
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
    conn.query("SELECT * FROM employeeroles WHERE EmployeeRoleId = ?",id,(err,rows)=>{
        if(!err) {
            res.send(rows);
        }else{
            res.send({success: false});
            console.log(err);
        }
    })
})

router.post('/',(req,res)=>{
    let EmployeeRole	= req.body.EmployeeRole;

    var errors;
    if(EmployeeRole.length === 0){
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
            EmployeeRole: EmployeeRole,
        }
        conn.query("SELECT EmployeeRoleId from employeeroles WHERE EmployeeRole=?",EmployeeRole,(err,rows)=>{
            var isExists = rows.length;
            if(isExists === 0){
                conn.query("INSERT INTO employeeroles SET ?",formData,(err,result)=>{
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
    let EmployeeRoleId	= req.body.EmployeeRoleId;
    let EmployeeRole	= req.body.EmployeeRole;
    
    var errors;
    if(EmployeeRoleId.length === 0 || EmployeeRole.length === 0){
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
            EmployeeRole: EmployeeRole
        }
        conn.query("UPDATE employeeroles SET ? WHERE EmployeeRoleId = ?",[formData,EmployeeRoleId],(err,result)=>{
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