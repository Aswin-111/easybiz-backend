const user = require('./user')
const itemmast = require('./itemmast')
const custmast = require('./custmast')


const ordermast = require('./ordermast')

const order = require('./ordertrxfile')



user.sync({alter:true})
itemmast.sync({alter:true})
custmast.sync({alter:true})


ordermast.sync({alter:true})


order.sync({alter:true})

