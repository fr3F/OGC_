module.exports = (sequelize, DataTypes) => {
  const Solde = sequelize.define("solde", {
    id_solde: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    prix: { type: DataTypes.INTEGER },
    nb_jours_total: { type: DataTypes.INTEGER },
    nb_jours_utilises: { type: DataTypes.INTEGER },
    nb_jours_restants: { type: DataTypes.INTEGER }
  });
  return Solde;
};
