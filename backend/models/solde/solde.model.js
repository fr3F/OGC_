module.exports = (sequelize, DataTypes) => {
  const Solde = sequelize.define("soldes", {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },  
    id_collab: { type: DataTypes.INTEGER, allowNull: false },
    id_type_conge: { type: DataTypes.INTEGER, allowNull: false },
    prix: { type: DataTypes.INTEGER },
    nb_jours_total: { type: DataTypes.INTEGER, allowNull: true },
    nb_jours_utilises: { type: DataTypes.INTEGER, defaultValue: 0 },
    nb_jours_restants: { type: DataTypes.INTEGER }
  }, {
    tableName: "soldes",
    timestamps: true
  });

  // Calcul automatique du solde restant avant création
  Solde.beforeCreate((solde) => {
    solde.nb_jours_restants = solde.nb_jours_total - solde.nb_jours_utilises;
  });

  // Calcul automatique avant mise à jour
  Solde.beforeUpdate((solde) => {
    solde.nb_jours_restants = solde.nb_jours_total - solde.nb_jours_utilises;
  });

  return Solde;
};

