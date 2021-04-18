import express from "express";
import data from "./data.js"
import mongoose from "mongoose"
import userRouter from "./routers/userRouter.js";

const app = express();
mongoose.connect("mongodb://localhost/amazona",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
})
const port = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send("server is ready");
})
app.get("/api/products",(req,res)=>{
    res.send(data.products)
})
app.use("/api/users", userRouter);
app.get("/api/products/:id",(req,res)=>{
    const product = data.products.find((x)=>x._id === req.params.id);
    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({message:"Product not Found"})
    }
})
app.listen(port,()=>{
    console.log(`Serve at http://localhost:${port}`)
})