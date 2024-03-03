const { Sequelize, DataTypes } = require("sequelize");
const db = require("./db");

const Ordmast = db.define(
  "ordmast",
  {
    //compcode varchar(10),userid varchar(6) , username varchar(16), password varchar(100), userlevel varchar(1)
    compcode: {
      primaryKey: true,
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    ordnum: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    custcode: {
      

      type: DataTypes.STRING(50),
      allowNull: false,
    },
    usercode: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    latlong: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    sysname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
    orddate: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },

    ordtime: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },

    custcode: {
      type: DataTypes.STRING(50),
      
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
      type: DataTypes.STRING(150),
      
      allowNull: false,
    },
    custtype: {
      type: DataTypes.STRING(1),
      allowNull: false,
    },
    trxdiscount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    trxtotal: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    trxnetamount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    statusflag: {
      type: DataTypes.STRING(1),
      defaultValue: "N",
      allowNull: false,
    },
    
  },
  { timestamps: false }
);

// Ordmast.sync({ alter: true });

module.exports = Ordmast;
