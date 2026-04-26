const express = require('express');
const cors = require('cors');
const {Pool}= require('pg')
require ('dotenv').config()

const app = express();
const PORT = process.env.PORT||5000;

app.use(cors());
app.use(express.json());

const pool=new Pool({
    connectionString:process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized:false
    }
});

app.get('/',async(req,res)=>{

    try{
        res.json({message:"mubarak"});

    }catch(err)
    {
        console.log(err);
        res.status(500).json({error:err.message});
    }
});

app.get('/regions',async(req,res)=>{

    try{
        const result=await pool.query('select *from regions');
        res.json(result.rows);

    }catch(err)
    {
        console.log(err);
        res.status(500).json({error:err.message});
    }
});

app.get('/countries',async(req,res)=>{

    try{
        const result=await pool.query('select *from countries');
        res.json(result.rows);

    }catch(err)
    {
        console.log(err);
        res.status(500).json({error:err.message});
    }
});

app.get('/departments',async(req,res)=>{

    try{
        const result=await pool.query('select *from departments');
        res.json(result.rows);

    }catch(err)
    {
        console.log(err);
        res.status(500).json({error:err.message});
    }
});

app.listen(PORT,()=>{
    console.log(`server is running on PORT: ${PORT}`);
});