const { Sequelize, DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemons",
    {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        /*type: DataTypes.INTEGER,
        autoIncrement: true,*/
        allowNull: false,
        primaryKey: true, //not null aut
        unique: true,
      },
      name: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
      },
      attack: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: true,
        /*validate: {
          min: 1,
          max: 100,
        },
        defaultValue: 0,*/
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: true,
        /*validate: {
          min: 1,
          max: 100,
        },
        defaultValue: 0,*/
      },
      life: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      defending: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      speed: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      // If don't want createdAt
      createdAt: false,
      // If don't want updatedAt
      updatedAt: false,
      // your other configuration here
    }
  );
};
