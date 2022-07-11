const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      allowNull:false,
      type: DataTypes.STRING,
    },
    released:{
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      allowNull: true
    },
    rating: {
      type: DataTypes.STRING
    },
    platforms: {
      allowNull: true,
      type: DataTypes.STRING
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    
  });
};
