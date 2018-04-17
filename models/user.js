'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user',  {
    passwordhash: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true
			}
		}
  });
  return user;
};