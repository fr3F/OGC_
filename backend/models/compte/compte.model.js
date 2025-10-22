module.exports = (sequelize, DataTypes) => {
  const Compte = sequelize.define("compte", {
    login: { type: DataTypes.STRING(50), primaryKey: true, unique:true },
    type: { type: DataTypes.STRING(50), allowNull: false }
  });
  return Compte;
};
