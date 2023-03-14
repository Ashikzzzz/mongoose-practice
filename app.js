const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
// middleware
app.use(express.json());
app.use(cors());

const productSchema= mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name "],
    trim: true,
    unique: [true, "NAme must be unique"],
    minLength:[3,'name must be at least 3 charecters'],
    maxLength: [100, "name is too large"]
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Please Provide a Positive Number"],
  },
  unit:{
    type: String,
    required: true,
    enum: {
      values:['kg','ltr','pcs'],
      message: "Value can't be {VALUE}, must be kg/ltr/pcs"
    }
  },
  quantity:{
    type: Number,
    required: true,
    min: [0, "quantity can't be negative"],
    validate :{
      validator : (value)=>{
        const isInteger = Number.isInteger(value)
        if(isInteger){
          return true ;
        }
        else{
          return false
        }
      },
      message: "please Provide an Integer Number"
    }
  },
  status :{
    type: String,
    required: true,
    enum: {
      values:["inStock",'out of Stock'],
      message: "Status can't be {Value}"
    }

  },
  // supplier:{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Supplier"
  // },

  // categories: [{
  //   name: {
  //     type: String,
  //     required: true
  //   },
  //   _id: mongoose.Schema.Types.ObjectId
  // }]

},
{
  timeStamps: true
})

// model 
const Product = mongoose.model('Product',productSchema)

app.post('/api/v1/product',async(req,res,next)=>{
  try {
const result = await Product.create(req.body)
console.log(result)
    // const product = new Product(req.body)
    if(product.quantity === 0){
      product.status = "out-of-stock"
    }
    // const result = await product.save()
     res.status(200).json({
       status: "success",
       message: "Data Inserted successfully",
       data : result
     })
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "data is not inserted",
      error: error.message
    })
  }
})

app.get("/", (req, res) => {
  res.send("Route is running");
});

module.exports = app;
