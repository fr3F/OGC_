module.exports = (sequelize, DataTypes) => {
  const TypeConge = sequelize.define("type_conge", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom_type_conge: { type: DataTypes.STRING(50), allowNull: false },
    max_jour: { type: DataTypes.INTEGER, allowNull: true }
  });
  return TypeConge;
};

