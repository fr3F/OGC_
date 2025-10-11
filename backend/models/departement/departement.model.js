module.exports = (sequelize, DataTypes) => {
  const Departement = sequelize.define("departement", {
    id_departement: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom_dep: {
      type: DataTypes.STRING(50),
      allowNull: false,
      // unique: true 
    }
  });
  return Departement;
};
