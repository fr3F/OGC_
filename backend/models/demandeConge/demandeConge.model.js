module.exports = (sequelize, DataTypes) => {
  const DemandeConge = sequelize.define("demande_conge", {
    id_demande_conge: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date_debut_conge: { type: DataTypes.DATE },
    date_fin_conge: { type: DataTypes.DATE },
    motifs_conge: { type: DataTypes.STRING(50) },
    login: { type: DataTypes.STRING(50), allowNull: false },
    id_status_conge: { type: DataTypes.INTEGER, allowNull: false },
    id_type_conge: { type: DataTypes.INTEGER, allowNull: false }
  });

  return DemandeConge;
};
