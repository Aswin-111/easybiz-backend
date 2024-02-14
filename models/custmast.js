const { Sequelize, DataTypes } = require("sequelize");
const db = require("./db");

const Custmast = db.define(
  "custmast",
  {
    //compcode varchar(10),userid varchar(6) , username varchar(16), password varchar(100), userlevel varchar(1)
    compcode: {
      primaryKey: true,
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    custcode: {
      primaryKey: true,

      type: DataTypes.STRING(50),
      allowNull: false,
    },

    custname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    custaddress: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    custphone: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },

    custarea: {
      type: DataTypes.STRING(100),
      
      allowNull: false,
    },

    custtype: {
      type: DataTypes.STRING(1),
      defaultValue: 'R',
      allowNull: false,
    },
   
    custgst: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    oldbal: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  { timestamps: false }
);

// Custmast.sync({alter : true});

module.exports = Custmast;
