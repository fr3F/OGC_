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
        }
      },
      email_manager: {
        type: DataTypes.STRING(100),
        allowNull: true
      }
    },
    { 
      freezeTableName: true,
      timestamps: false 
    }
  );

  return Manager;
};
