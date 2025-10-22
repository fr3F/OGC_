module.exports = (sequelize, DataTypes) => {
  const StatusConge = sequelize.define("status_conge", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom_status_conge: { type: DataTypes.STRING(50), allowNull: false }
  });
  return StatusConge;
};
