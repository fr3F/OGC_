module.exports = (sequelize, DataTypes) => {
  const DemandeConge = sequelize.define(
    "demande_conges",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      date_debut_conge: { type: DataTypes.DATE, allowNull: false },
      date_fin_conge: { type: DataTypes.DATE, allowNull: false },
      motifs_conge: { type: DataTypes.STRING(255), allowNull: true },
      is_valide: { type: DataTypes.BOOLEAN, allowNull: true }, // TRUE = validé, FALSE = rejeté, NULL = en attente
      id_status_conge: { type: DataTypes.INTEGER, allowNull: false },
      id_type_conge: { type: DataTypes.INTEGER, allowNull: false },
      id_manager: { type: DataTypes.INTEGER, allowNull: true } 
    },
    {
      freezeTableName: true,
      timestamps: true
    }
  );

  return DemandeConge;
};
