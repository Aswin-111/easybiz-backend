const user = require('./user')
const itemmast = require('./itemmast')
const custmast = require('./custmast')


const ordermast = require('./ordermast')

const order = require('./ordertrxfile')


user.sync()
itemmast.sync()
custmast.sync()


ordermast.sync()


order.sync()
