const express = require('express')
const cors = require('cors')
const login = require('./models/user')
const db = require('./models/db')
const items = require('./models/itemmast')
const app = express()
const cust = require('./models/custmast')


app.use(cors())
app.use(express.json({limit : "10mb"}))
app.post('/login',async (req,res)=>{
try{
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

  }
  catch (err) {
    return res.status(404).json({message:err,status:"false"})
  }
})

app.post("/cust", async (req, res) => {
    const { compcode } = req.body;
    const result = await cust.findAll({where : {compcode: compcode}});
    
    if(!result){
    return res.status(404).json({ status: "failed" });

    }
    else{
      return res.status(200).json({ status: "success",result });
    }
    
  });
  


  app.post("/shopdetailed", async (req, res) => {
    const {compcode,custcode} = req.body;
  
  
    console.log('items route ',compcode,req.body);
    const itemlist = await items.findAll({where : {compcode: compcode}});
    const custinfo = await cust.findOne({where : {custcode: custcode}});

    if(!result){
      return res.status(404).json({ status: "failed" });
  
      }
      else{
        return res.status(200).json({ status: "success",result:itemlist,custinfo:custinfo });
      }
    

  });

  
  




app.post('/query',async (req,res)=>{
    let response = await db.query(req.body.query)
    if(response){
    return res.json({response:"success"})
    }
    else{
      return res.json({response: "error"})
    }
})


app.post("/order", async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const ordNumberResult = await Ordmast.findOne({
      attributes: [[Sequelize.fn('MAX', Sequelize.col('ordnum')), 'ord_number']],
      where: { compcode: req.body[0].comp_code },
      transaction: t
    });

    let ordNumber = 1;
    if (ordNumberResult && ordNumberResult.ord_number) {
      ordNumber = ordNumberResult.ord_number + 1;
    }

    const ordMastCreateResult = await Ordmast.create({
      compcode: req.body[0].comp_code,
      ordnum: ordNumber,
      orddate: req.body[0].ord_date.split(" ")[0],
      ordtime: req.body[0].ord_time.split(" ")[1].split(".")[0],
      custcode: req.body[0].cust_code,
      usercode: req.body[0].user_code,
      username: req.body[0].user_name,
      latlong: req.body[0].lat_long,
      sysname: req.body[0].system_name,
      custaddress: req.body[0].cust_address,
      custphone: req.body[0].cust_phone,
      custarea: req.body[0].cust_area,
      custtype: req.body[0].cust_type,
      trxdiscount: req.body[0].trx_discount,
      trxtotal: req.body[0].trx_total,
      trxnetamount: req.body[0].trx_netamount,
      statusflag: req.body[0].status_flag,
    }, { transaction: t });

    for (const orderItem of req.body) {
      await Ordertrxfile.create({
        compcode: orderItem.comp_code,
        ordnum: ordNumber,
        linenum: orderItem.line_num,
        orddate: orderItem.ord_date.split(" ")[0],
        itemcode: orderItem.item_code,
        itemname: orderItem.item_name,
        itemqty: orderItem.item_qty,
        itemfreeqty: orderItem.item_free_qty,
        itemmrp: orderItem.item_mrp,
        itemprice: orderItem.item_price,
        itemtax: orderItem.item_tax,
        itemdiscount: orderItem.item_discount,
        itemcess: orderItem.item_cess,
        itemcost: orderItem.item_cost,
        itemnetcost: orderItem.item_net_cost,
        trxtotal: orderItem.trx_total,
        statusflag: orderItem.status_flag,
        remarks: orderItem.remarks,
      }, { transaction: t });
    }

    const ordMastResult = await Ordmast.findOne({
      where: { ordnum: ordNumber },
      transaction: t
    });

    const ordTrxFileResult = await Ordertrxfile.findAll({
      where: { ordnum: ordNumber },
      transaction: t
    });

    await t.commit();

    res.json({ status: "success", ord_mast: ordMastResult, ord_trxfile: ordTrxFileResult });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.json({ status: "failed", message: "An error occurred" });
  }
});
app.listen(7000)


