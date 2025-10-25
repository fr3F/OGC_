module.exports = (sequelize, DataTypes) => {
  const Manager = sequelize.define(
    "manager",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nom_manager: { type: DataTypes.STRING(50), allowNull: false },
      id_manager_sup: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "manager",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      email_manager: { type: DataTypes.STRING(100), allowNull: true },
      login: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  // Associations à définir dans le fichier index.js
  return Manager;
};
