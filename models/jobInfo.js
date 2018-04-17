module.exports = (sequelize, DataTypes) => {
    var jobinfo = sequelize.define('jobinfo', {
      date:{
        type: DataTypes.STRING,
              allowNull: false
      },
      title: {
        type: DataTypes.STRING,
              allowNull: false
      },
      company:{
        type: DataTypes.STRING,
              allowNull: false
      },
      status:{
        type: DataTypes.STRING,
        allowNull: false
      },
      owner: DataTypes.INTEGER
    });
    return jobinfo;
  };