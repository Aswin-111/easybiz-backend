const express = require('express')
const cors = require('cors')
const app = express()
const {Sequelize} = require('sequelize')
const login = require('./models/user')
const db = require('./models/db')
const items = require('./models/itemmast')
const cust = require('./models/custmast')

















const Ordmast = require('./models/ordermast')
const Ordertrxfile = require('./models/ordertrxfile')
const Custmast = require('./models/custmast')
const { log } = require('console')
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
app.post("/addcustomer", async (req, res) => {
  
const {compcode,custname,custaddress,custarea,custphone,custtype} = req.body
// compcode: userdata.compcode,
// custname : `${custname}*`,
// custaddress,
// custarea,
// custphone,
// custtype
try{
  const CustCode = await Custmast.max('custcode');
  const custcode = await Custmast.findAll({
    where: { compcode:compcode },

  });


  
  
  

  
  
  const custcodes = custcode.map(i=>Number(i.custcode))
  console.log()
  const newCustCode = Math.max(...custcodes) + 1;
  console.log(compcode,custname,custaddress,custarea,custphone,custtype,newCustCode);

  const result = await Custmast.create({
    custcode: `${newCustCode}`,
    compcode,
    custname,
    custarea,
    custaddress,
    custphone,
    custtype,
    custgst : 0,
    oldbal:0
  });



  return res.status(200).json({ status: "success",result });

}
  

    
    
    
  
      catch(err){
        

        
        console.log(err);
    return res.status(404).json({ status: "failed" });
        
      }

});


app.post("/getOrders", async (req, res) => {
 
  const { compcode } = req.body;
const result = await Ordmast.findAll({where : {compcode: compcode}});


result.forEach(function (i){

console.log(i.dataValues)

})
if(!result){
return res.status(404).json({ status: "failed" });

}
else{
return res.status(200).json({ status: "success",result });
}

});


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
  
  try{
    const itemlist = await items.findAll({where : {compcode: compcode}});
    const custinfo = await cust.findOne({where : {custcode: custcode}})
    return res.status(200).json({ status: "success",itemlist:itemlist,custinfo:custinfo });

  }
    
  
      
      
      
    
        catch(err){
      return res.status(404).json({ status: "failed" });
          
        }

  });


  
  app.get("/custqwerty", async (req, res) => {


return res.status(200).json({ status: "success" });


});



  app.post("/item", async (req, res) => {
    const { itemcode } = req.body;
    const result = await items.findOne({where : {itemcode: itemcode}});
    
    if(!result){
    return res.status(404).json({ status: "failed" });

    }
    else{
      return res.status(200).json({ status: "success",result });
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
  
// const details = [{
//   compcode: '10000',
//   itemname: 'Bubble Gum',
//   itemcess: 0.01,
//   itemnetcost: 1.99,
//   itemcode: '10001',
//   itemcost: 0.49,
//   itemmrp: 2.49,
//   itemqty: '2',
//   itemtax: 5,
//   itemuom: 'PCS',
//   itemprice: '1.90',
//   itemfreeqty: 0,
//   trxtotal: '3.99',
//   itemdiscount: 0,
//   remarks: ''
// },
// {
//   compcode: '10000',
//   itemname: 'Chocolate Bar',
//   itemcess: 0.03,
//   itemnetcost: 3.99,
//   itemcode: '10003',
//   itemcost: 1.99,
//   itemmrp: 4.49,
//   itemqty: '5',
//   itemtax: 28,
//   itemuom: 'PCS',
//   itemprice: '3.12',
//   itemfreeqty: 0,
//   trxtotal: '19.97',
//   itemdiscount: 0,
//   remarks: ''
// },
// {
//   compcode: '10000',
//   itemname: 'Biscuit',
//   itemcess: 0.04,
//   itemnetcost: 4.49,
//   itemcode: '10005',
//   itemcost: 2.49,
//   itemmrp: 4.99,
//   itemqty: '2',
//   itemtax: 0.12,
//   itemuom: 'PCS',
//   itemprice: '4.48',
//   itemfreeqty: 0,
//   trxtotal: '8.97',
//   itemdiscount: 0,
//   remarks: ''
// }
// ]
// console.log(req.body)
const details = req.body.details
const cust = req.body.cust


// const cust = {
//   compcode: '10000',
//   orddate: '2024-02-25',
//   ordtime: '21:27',
//   custcode: '12',
//   usercode: 1,
//   username: 'albin',
//   latlong: '9.5143374,76.3290963',
//   sysname: 'RMX1827',
//   custaddress: 'Shop 12, Alappuzha',
//   custphone: '1233456782',
//   custarea: 'Alappuzha',
//   custtype: 'R',
//   trxdiscount: '10',
//   trxtotal: 32.93,
//   trxnetamount: 32.93,
//   statusflag: 'N'
// }
  // console.log(cust)
  // console.log(details)

  
  const t = await db.transaction();
  try {

    
    const ordNumberResult = await Ordmast.findOne({
      attributes: [[Sequelize.fn('MAX', Sequelize.col('ordnum')), 'ordnum']],
      where: { compcode:cust.compcode },
      transaction: t
    });

    let ordNumber = 1;
    if (ordNumberResult && ordNumberResult.ordnum) {
      
      // console.log(ordNumberResult.ordnum)
      ordNumber = ordNumberResult.ordnum + 1;
    }

    const ordMastCreateResult = await Ordmast.create({
      compcode:cust.compcode,
      ordnum: ordNumber,
      orddate:cust.orddate,
      ordtime:cust.ordtime,
      custcode:cust.custcode,
      usercode:cust.usercode,
      username:cust.username,
      latlong:cust.latlong,
      sysname:cust.sysname,
      custaddress:cust.custaddress,
      custphone:cust.custphone,
      custarea:cust.custarea,
      custtype:cust.custtype,
      trxdiscount:cust.trxdiscount,
      trxtotal:cust.trxtotal,
      trxnetamount:cust.trxnetamount,
      statusflag:cust.statusflag,
    }, { transaction: t });

    for (const orderItem of details) {
      let lineNumber = 1;

      const lineNumberResult = await Ordertrxfile.findOne({
        attributes: [[Sequelize.fn('MAX', Sequelize.col('linenum')), 'linenum']],
        where: { compcode:cust.compcode,ordnum:ordNumber },
        transaction: t
      });
  
      if (lineNumberResult && lineNumberResult.linenum) {  
        // console.log(lineNumberResult.linenum)
        lineNumber = lineNumberResult.linenum + 1;
      }
      console.log('ordernum',ordNumber,'linenum',lineNumber)
      await Ordertrxfile.create({
        compcode: orderItem.compcode,
        ordnum: ordNumber,
        linenum: lineNumber,
        
        
        
        orddate: cust.orddate,
        itemcode: orderItem.itemcode,
        itemname: orderItem.itemname,
        itemqty: orderItem.itemqty,
        itemfreeqty: orderItem.itemfreeqty,
        itemmrp: orderItem.itemmrp,
        itemprice: orderItem.itemprice,
        itemtax: orderItem.itemtax,
        itemdiscount: orderItem.itemdiscount,
        itemcess: orderItem.itemcess,
        itemcost: orderItem.itemcost,
        itemnetcost: orderItem.itemnetcost,  
        trxtotal: cust.trxtotal,
        statusflag: "N",
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
    const custmastresult = await Custmast.findOne({
      where: { custcode: cust.custcode },
      transaction: t
    });
    await t.commit();


    let custdata = custmastresult.dataValues
    let orddata = ordMastResult.dataValues
    console.log(custdata.custname,custdata.custaddress,custdata.custphone);
    console.log(orddata.ordnum,orddata.orddate,orddata.trxtotal);
const PDFDocument = require('pdfkit');
const fs = require('fs');
const doc = new PDFDocument();

// Buffer to store PDF content
const buffers = [];
doc.on('data', buffers.push.bind(buffers));

// important

// Add content to the PDF document
// doc.fontSize(22).text('Ezbiz', 260, 50)

// doc.fontSize(16).text(custdata.custname, 50, 70)
// doc.fontSize(16).text(custdata.custaddress, 50, 90)

// doc.fontSize(16).text(`Date : ${orddata.orddate}`, 400, 70)

// doc.fontSize(16).text(`Number : ${orddata.ordnum}`, 400, 90)



// doc.fontSize(16).text('Sl num             Item name             Qty             Rate              Amount',40, 120);

// let count = 0;
// ordTrxFileResult.forEach((item, ind) => {
  
//   doc.fontSize(16).text(`${ind+1}         ${item.itemname}          ${item.itemqty}         ${(Number(item.trxtotal)/Number(item.itemqty)).toFixed(2)}        ${(Number(item.trxtotal).toFixed(2))}`, 60, 150 + count);
//   count += 16;
// });
// doc.fontSize(22).text(`subtotal : ${(Number(orddata.trxtotal)).toFixed(2)}`, 360, count + 300)

// // Finalize the PDF document
// doc.end();
// new code


doc.fontSize(22).text('Ezbiz', 260, 50)

doc.fontSize(16).text(custdata.custname, 50, 70)
doc.fontSize(16).text(custdata.custaddress, 50, 90)

doc.fontSize(16).text(`Date : ${orddata.orddate}`, 400, 70)
doc.fontSize(16).text(`Number : ${orddata.ordnum}`, 400, 90)

// Table Header
doc.fontSize(16).text('Sl num', 40, 120);
doc.text('Item name', 140, 120);
doc.text('Qty', 280, 120);
doc.text('Rate', 360, 120);
doc.text('Amount', 460, 120);

let startY = 140; // Initial Y position for table content

// Populate table with order items
ordTrxFileResult.forEach((item, index) => {
    const { itemname, itemqty, trxtotal } = item;
    const rate = (Number(trxtotal) / Number(itemqty)).toFixed(2);
    const amount = Number(trxtotal).toFixed(2);

    doc.fontSize(16).text(`${index + 1}`, 40, startY);
    doc.text(itemname, 140, startY);
    doc.text(itemqty.toString(), 280, startY);
    doc.text(rate.toString(), 360, startY);
    doc.text(amount.toString(), 460, startY);

    startY += 20; // Increment Y position for next row
});

// Calculate subtotal
const subtotal = Number(orddata.trxtotal).toFixed(2);

// Display subtotal
doc.fontSize(22).text(`Subtotal : ${subtotal}`, 360, startY + 40);

// Finalize the PDF document
doc.end();

  








// console.log(ordTrxFileResult)

// custname: 'Premier Supermarket',
//   custaddress: 'Shop 1, Kayamkulam',
//   custphone: '1233456771', product name qty amount
// ordnum orddate
// Send JSON response with PDF content as base64 encoded string
doc.on('end', () => {
  const pdfData = Buffer.concat(buffers);
  const base64Data = pdfData.toString('base64');
  return res.json({ status: "success", ord_mast: ordMastResult, ord_trxfile: ordTrxFileResult, pdf: base64Data });
});

    // res.json({ status: "success", ord_mast: ordMastResult, ord_trxfile: ordTrxFileResult });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.json({ status: "failed", message: "An error occurred" });
  }
});
app.listen(7000)