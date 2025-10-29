
// Dev
module.exports = {
    HOST: " ",
    USER: "root",
    PASSWORD: "Admin*25",

    // PASSWORD: "",

    // PASSWORD: "",
    DB: "ogc",  
    dialect: "mysql",
    PORT: 3306,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
