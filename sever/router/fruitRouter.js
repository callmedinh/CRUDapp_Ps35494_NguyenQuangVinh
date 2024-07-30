const express = require('express');
const fruitmodel = require('../model/fruit');
const app = express.Router();

// đổ dữ liệu lên 
app.get('/fruit',async(req,res)=>{
    const fruits = await(fruitmodel.find({}));
    try {
        res.send(fruits);
    } 
    catch (error) {
        res.status(500).send(error);
    }
})

// thêm user
    app.post('/fruit',async(req,res)=>{
        try {
            const { name,quantity,price,status,id_distributor} = req.body;
            const f = new fruitmodel({name,quantity,price,status,id_distributor});
            const result =  await f.save();
       

            if(result){
                res.json({
                    "status":200,
                    "message": "them thanh cong",
                    "data":result
                })
            }
        } 
  
  
   catch (error) {
       res.status(500).send(error);
   }
})


// tìm một f
app.get('/fruit/:id',async(req,res)=>{
    const user =await(fruitmodel.findById(req.params.id,req.body));
    try{
        res.send(user)
    }
    catch (error){
        res.status(500).send(error);
    }
});

 //update 1 f
 app.put('/fruit/:id',async(req,res)=>{
    try {
        await fruitmodel.findByIdAndUpdate(req.params.id,req.body);
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});


// xoa fruit
app.delete('/fruit/:id',async(req,res)=>{
    try {
        await fruitmodel.findByIdAndDelete(req.params.id,req.body);
        res.send();

    } catch (error) {
        res.status(500).send(error);   
    }
})


module.exports = app;