const { Sequelize, DataTypes } = require("sequelize");
const db = require("./db");


const Itemmast = db.define(
  "Itemmast",
  {
    //compcode varchar(10),userid varchar(6) , username varchar(16), password varchar(100), userlevel varchar(1)
    compcode: {
      primaryKey: true,
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    itemcode: {
      primaryKey: true,

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

    itemprice1: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    itemprice2: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    itemprice3: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    itemprice4: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    itemprice5: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    itemmrp: {
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

    hsncode: {
      type: DataTypes.STRING(8),
      allowNull: false,
    },
    itemuom: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
  },
  { timestamps: false }
);

// Itemmast.sync({ alter: true });

module.exports = Itemmast;
