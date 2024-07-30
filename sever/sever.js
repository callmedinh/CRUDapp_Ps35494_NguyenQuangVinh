const express = require('express');
const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/luan123";
// // public
// app.use(express.static('public'));
// app.use('/css',express.static(__dirname+'public/css'));
// app.use('/img',express.static(__dirname+'public/img'));

const cors = require('cors');

// app.use(express.static('Image'));
const useRouter = require('./router/userRouter');
const FruitRouter = require('./router/fruitRouter');
const DistributorRouter = require('./router/distributorRouter');


const port = 3001;
const app = express();
app.use(cors());
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
})


mongoose.connect(url);

app.use(express.json()); 

app.use(useRouter); 
app.use(FruitRouter);
app.use(DistributorRouter);


mongoose.connection.once('open', () => {
  app.listen(port, () => console.log(`Ứng dụng ví dụ đang lắng nghe trên cổng ${port}!`));

});
