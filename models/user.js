const { Sequelize, DataTypes } = require("sequelize");
const db = require("./db");

const User = db.define("User", {
  //compcode varchar(10),userid varchar(6) , username varchar(16), password varchar(100), userlevel varchar(1)
  compcode: {
    primaryKey: true,
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  userid: {
    primaryKey: true,
    
    type: DataTypes.STRING(6),
    allowNull: false,
  },

  username: {
    type: DataTypes.STRING(16),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
 
} , {timestamps : false});

// User.sync({alter : true})

module.exports = User