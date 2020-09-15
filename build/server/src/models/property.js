"use strict";

module.exports = function (sequelize, DataTypes) {
  var Property = sequelize.define('Property', {
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bedroom: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bathroom: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sale_or_rent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    owner_phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    owner_email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Property;
};
//# sourceMappingURL=property.js.map