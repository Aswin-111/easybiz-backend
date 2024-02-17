const user = require('./user')
const itemmast = require('./itemmast')
const custmast = require('./custmast')


const ordermast = require('./ordermast')

const order = require('./ordertrxfile')



user.sync({force:true})
itemmast.sync({force:true})
custmast.sync({force:true})


ordermast.sync({force:true})


order.sync({force:true})


console.log("created all tables")