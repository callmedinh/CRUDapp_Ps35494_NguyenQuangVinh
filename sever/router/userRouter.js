const express = require('express');
const bcryptjs = require ('bcryptjs');
const UserModel = require('../model/user');
const app = express.Router();

// đổ dữ liệu lên 
app.get('/user',async(req,res)=>{
    const users = await(UserModel.find({}));
    try {
        res.send(users);
    } 
    catch (error) {
        res.status(500).send(error);
    }
})


// thêm user
app.post('/user',async(req,res)=>{
     const { fullname,email,password,phone,address} = req.body;
   console.log (password);
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(password,salt)
    console.log(hashPassword);
    //
    const u = new UserModel({fullname,email,password:hashPassword,phone,address});

    try {
        await u.save();
        res.send(u);

    } 
    catch (error) {
        res.status(500).send(error);
    }
})

// // hàm login
// app.post('/users/login',async(req,res)=>{
//     const { email,password} = req.body;
//     const user = await( UserModel.findOne({email}));
//     if(user){
//         const isMatsh = bcryptjs.compareSync(password,user.password);
//         if(!isMatsh) return res.sendStatus(401);
//          delete user._doc.password

//         res.send(user);
//     }
// });



// hàm login
app.post('/user/login',async(req,res)=>{
    const {email,password} = req.body;
    const user = await(UserModel.findOne({email}));
    if(user){
        const isMatsh = bcryptjs.compareSync(password,user.password);
        if(!isMatsh) return res.sendStatus(401);
        res.send(user);
    }
})

// tìm một user
app.get('/user/:id',async(req,res)=>{
    const user =await(UserModel.findById(req.params.id,req.body));
    try{
        res.send(user)
    }
    catch (error){
        res.status(500).send(error);
    }
});


 //update 1 user
app.put('/edituser/:id',async(req,res)=>{
    try {
        const updateUser = await UserModel.findByIdAndUpdate(req.params.id,req.body, {new:true});
        res.send(updateUser);
    } catch (error) {
        res.status(500).send(error);
    }
});



// xoa user
app.delete('/user/:id',async(req,res)=>{
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.send();

    } catch (error) {
        res.status(500).send(error);   
    }
})

module.exports = app;