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


db.user = require("./users/user.model")(sequelize, Sequelize);
db.role = require("./users/role.model")(sequelize, Sequelize);

// Relation OneToMany Role, Users
db.role.hasMany(db.user, { foreignKey: "idRole", as: "users" });
db.user.belongsTo(db.role, { foreignKey: "idRole", as: "role" });


// Fonctionnalité
db.menu = require("./acces/menu.model")(sequelize, Sequelize)
db.menuRole = require("./acces/menurole.model")(sequelize, Sequelize)
db.module = require("./acces/module.model")(sequelize, Sequelize)
db.fonctionnalite = require("./acces/fonctionnalite.model")(sequelize, Sequelize)
db.fonctionnaliteRole = require("./acces/fonctionnaliteRole.model")(sequelize, Sequelize)

db.module.hasMany(db.menu, { foreignKey: 'moduleId' , as: "menus" });
db.menu.belongsTo(db.module, { foreignKey: 'moduleId', as: "module"});

// Relation one to many menu
db.menu.hasMany(db.menu, { foreignKey: "parentId", as: "subItems"});
db.menu.belongsTo(db.menu, { foreignKey: "parentId", as: "parent"});

// Relation many to many menu/roles

db.role.belongsToMany(db.menu, { foreignKey: "roleId", as: "menus", through: db.menuRole, timestamps: false});
db.menu.belongsToMany(db.role, { foreignKey: "menuId", as: "roles", through: db.menuRole, timestamps: false});

// Relation one to many module fonctionnalite
db.module.hasMany(db.fonctionnalite, { foreignKey: "moduleId", as: "fonctionnalites"});
db.fonctionnalite.belongsTo(db.module, { foreignKey: "moduleId", as: "module"});

// Relation many to many fonctionnalite/roles
db.role.belongsToMany(db.fonctionnalite, { foreignKey: "roleId", as: "fonctionnalites", through: db.fonctionnaliteRole, timestamps: false});
db.fonctionnalite.belongsToMany(db.role, { foreignKey: "fonctionnaliteId", as: "roles", through: db.fonctionnaliteRole, timestamps: false});


//------------------------------------------------------------------

// Modèles
db.departement = require("./departement/departement.model")(sequelize, DataTypes);
db.typeConge = require("./typeConge/typeConge.model")(sequelize, DataTypes);
db.statusconge = require("./statusConge/statusConge.model")(sequelize, DataTypes);
db.compte = require("./compte/compte.model")(sequelize, DataTypes);
db.manager = require("./manager/manager.model")(sequelize, DataTypes);
db.collaborateur = require("./collaborateur/collaborateur.model")(sequelize, DataTypes);
db.demandeconge = require("./demandeConge/demandeConge.model")(sequelize, DataTypes);
db.solde = require("./solde/solde.model")(sequelize, DataTypes);

// Relations
db.collaborateur.belongsTo(db.manager, { foreignKey: "id_manager", as: "manager" });
db.manager.hasMany(db.collaborateur, { foreignKey: "id_manager", as: "collaborateurs" });

// ----------------- HIÉRARCHIE DES MANAGERS -----------------
db.manager.hasMany(db.manager, { foreignKey: "id_manager_sup", as: "subordinates" });
db.manager.belongsTo(db.manager, { foreignKey: "id_manager_sup", as: "superior" });
// ----------------- Fin HIÉRARCHIE DES MANAGERS -----------------

db.collaborateur.belongsTo(db.compte, { foreignKey: "login"});
db.compte.hasOne(db.collaborateur, { foreignKey: "login" });

db.collaborateur.belongsTo(db.departement, { foreignKey: "id_departement" });
db.departement.hasMany(db.collaborateur, { foreignKey: "id_departement" });

db.demandeconge.belongsTo(db.compte, { foreignKey: "login"});
db.compte.hasMany(db.demandeconge, { foreignKey: "login" });

db.demandeconge.belongsTo(db.statusconge, { foreignKey: "id_status_conge" });
db.statusconge.hasMany(db.demandeconge, { foreignKey: "id_status_conge" });

db.demandeconge.belongsTo(db.manager, { foreignKey: "id_manager", as: "manager_valide" });
db.manager.hasMany(db.demandeconge, { foreignKey: "id_manager", as: "demandes_validees" });

db.demandeconge.belongsTo(db.typeConge, { foreignKey: "id_type_conge" });
db.typeConge.hasMany(db.demandeconge, { foreignKey: "id_type_conge" });

db.solde.belongsTo(db.typeConge, { foreignKey: "id_type_conge" });
db.typeConge.hasMany(db.solde, { foreignKey: "id_type_conge" });

db.solde.belongsTo(db.collaborateur, { foreignKey: "id_collab" });
db.collaborateur.hasMany(db.solde, { foreignKey: "id_collab" });


module.exports = db;

