const { DataTypes, Sequelize } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "types",
    {
      id: {
        /* type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4, */
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, //not null aut
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
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
