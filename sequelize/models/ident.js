'use strict';
module.exports = function(sequelize, DataTypes) {
  var Ident = sequelize.define('Ident', {
    pat_id1: DataTypes.INTEGER,
    ida: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Ident;
};