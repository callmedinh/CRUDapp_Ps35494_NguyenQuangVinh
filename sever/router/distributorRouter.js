const express = require('express');
const distributormodel = require('../model/distributor');
const app = express.Router();

// đổ dữ liệu lên 
app.get('/distributor',async(req,res)=>{
    const Distributor = await(distributormodel.find({}));
    try {
        res.send(Distributor);
    } 
    catch (error) {
        res.status(500).send(error);
    }
})



// thêm dis
app.post('/distributor',async(req,res)=>{

    try {
        const { name} = req.body;
        const u = new distributormodel({name});
        const result =  await u.save();
     
        if(result){
         res.json({
             "startus": 200,
             "message": "them thanh cong",
             "data": result
         })
        }
    } 
   catch (error) {
       res.status(500).send(error);
   }
})

// tìm một dis
app.get('/distributor/:id',async(req,res)=>{
    const distributor =await(distributormodel.findById(req.params.id,req.body));
    try{
        res.send(distributor)
    }
    catch (error){
        res.status(500).send(error);
    }
});

 //update dis
 app.put('/distributor/:id',async(req,res)=>{
    try {
        await distributormodel.findByIdAndUpdate(req.params.id,req.body);
        await distributormodel.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

// xoa dis
app.delete('/distributor/:id',async(req,res)=>{
    try {
        await distributormodel.findByIdAndDelete(req.params.id,req.body);
        res.send();

    } catch (error) {
        res.status(500).send(error);   
    }
})



module.exports = app;

