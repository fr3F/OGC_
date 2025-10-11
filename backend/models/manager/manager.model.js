module.exports = (sequelize, DataTypes) => {
  const Manager = sequelize.define("manager", {
    id_manager: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom_manager: { type: DataTypes.STRING(50), allowNull: false }
  });
  return Manager;
};
