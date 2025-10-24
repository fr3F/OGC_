module.exports = (sequelize, DataTypes) => {
  const Collaborateurs = sequelize.define("collaborateurs", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom_collab: { type: DataTypes.STRING, allowNull: false },
    matricule_collab: { type: DataTypes.STRING(50), allowNull: false },
    prenom_collab: { type: DataTypes.STRING(50), allowNull: false },
    email_collab: { type: DataTypes.STRING(50) },
    date_embauche_collab: { type: DataTypes.STRING(50) },
    id_manager: { type: DataTypes.INTEGER, allowNull: true }, 
    login: { type: DataTypes.STRING(50), allowNull: false},
    id_departement: { type: DataTypes.INTEGER, allowNull: false }
  });
  return Collaborateurs;
};
