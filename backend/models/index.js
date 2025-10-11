const dbConfig = require("../app/config/db.config");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  timezone: '+03:00',
  pool: dbConfig.pool,
  port: dbConfig.PORT,
  logging: false
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modèles
db.departement = require("./departement/departement.model")(sequelize, DataTypes);
db.typeConge = require("./typeConge/typeConge.model")(sequelize, DataTypes);
db.statusconge = require("./statusConge/statusConge.model")(sequelize, DataTypes);
db.compte = require("./compte/compte.model")(sequelize, DataTypes);
db.manager = require("./manager/manager.model")(sequelize, DataTypes);
db.collaborateur = require("./collaborateur/collaborateur.model")(sequelize, DataTypes);
db.demandeconge = require("./demandeConge/demandeConge.model")(sequelize, DataTypes);
db.Solde = require("./solde/solde.model")(sequelize, DataTypes);

// Relations
db.collaborateur.belongsTo(db.manager, { foreignKey: "id_manager" });
db.manager.hasMany(db.collaborateur, { foreignKey: "id_manager" });

db.collaborateur.belongsTo(db.compte, { foreignKey: "login" });
db.compte.hasOne(db.collaborateur, { foreignKey: "login" });

db.collaborateur.belongsTo(db.departement, { foreignKey: "id_departement" });
db.departement.hasMany(db.collaborateur, { foreignKey: "id_departement" });

db.demandeconge.belongsTo(db.compte, { foreignKey: "login" });
db.compte.hasMany(db.demandeconge, { foreignKey: "login" });

db.demandeconge.belongsTo(db.statusconge, { foreignKey: "id_status_conge" });
db.statusconge.hasMany(db.demandeconge, { foreignKey: "id_status_conge" });

db.demandeconge.belongsTo(db.typeConge, { foreignKey: "id_type_conge" });
db.typeConge.hasMany(db.demandeconge, { foreignKey: "id_type_conge" });

db.Solde.belongsTo(db.typeConge, { foreignKey: "id_type_conge" });
db.typeConge.hasMany(db.Solde, { foreignKey: "id_type_conge" });

db.Solde.belongsTo(db.collaborateur, { foreignKey: "id_collab" });
db.collaborateur.hasMany(db.Solde, { foreignKey: "id_collab" });

module.exports = db;
