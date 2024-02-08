const express = require('express')
const cors = require('cors')
const login = require('./models/user')
const db = require('./models/db')
const app = express()


app.use(cors())
app.use(express.json())
app.post('/login',async (req,res)=>{

    const {username,password} = req.body
    console.log(username,password)
    const result = await login.findOne({where : {username: username}})
   
    const {compcode} = result.dataValues.compcode
    const {log} = console

    log(result.dataValues.password)
    if(result.dataValues.password === password) {
        console.log('success')
         return res.status(200).json({ status: "success", message: "Login success", result });

    }
    return res.status(400).json({message:"Invalid credentials",status:"false"})
})

app.post("/cust", async (req, res) => {
    const { compcode } = req.body;
    const result = await login.findOne({where : {compcode: compcode}})
  });


app.post('/query',async (req,res)=>{
    let response = await db.query(req.body.query)
})

app.listen(3000)