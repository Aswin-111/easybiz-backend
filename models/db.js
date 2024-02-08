const Sequelize = require('sequelize');

const sequelize = new Sequelize('ezbizdb', 'root', 'pass@123', {
    host: 'localhost',
    dialect: "mysql",
    logging: false
  });

  sequelize.authenticate().then((res)=>{
    console.log('connected')
  })

  module.exports = sequelize