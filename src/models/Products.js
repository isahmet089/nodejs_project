const mongoose= require("mongoose");
const productsSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        require:true,
    },
    stock:{
        type:Number,
        default:0,
        min:0
    },
},
    {timestamps:true},

);
module.exports=mongoose.model("Product",productsSchema);