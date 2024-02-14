const { Sequelize, DataTypes } = require("sequelize");
const db = require("./db");

const Ordertrxfile = db.define(
  "ordertrxfile",
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
    linenum: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    orddate: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    itemocode: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    itemname: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    itemqty: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    itemfreeqty: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    itemmrp: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    itemprice: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    itemtax: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    
    itemdiscount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    itemcess: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    itemcost: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    itemnetcost: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    trxtotal: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    
    statusflag: {
      type: DataTypes.STRING(1),
      allowNull: false,
    },

    remarks:{
      type: DataTypes.STRING(20),
      allowNull: false,
    }
  },
  { timestamps: false }
);

// Ordertrxfile.sync({ alter: true });

module.exports = Ordertrxfile;
