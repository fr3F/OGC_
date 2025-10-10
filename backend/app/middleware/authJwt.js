const jwt = require("jsonwebtoken");
const config = require("../config/environnements/dev/auth.config");
const db = require("../../models/index");
const { dataToJson } = require("../helpers/helpers.helper");
const { setCategorie } = require("../features/user/services/user.service");
const User = db.user;

// Verifier si un utilisateur est connecté(avec status non connecté)
const verifyToken = async (req, res, next) => {
    await verifyTokenPrincipal(req, res);
    next();

};

// Verifier si un utilisateur est connecté, avec include magasins
    // avec un seul magasin et a une catégorie
const verifyUserDemandeVirement = async (req, res, next) => {
    await verifyTokenPrincipal(req, res,  ["magasins"]);
    if(req.user.magasins.length != 1)
        return res.status(403).send({message: "L'utilisateur doit avoir un seul magasin"})
    if(!req.user.categorie.length)
        return res.status(403).send({message: "L'utilisateur doit avoir une catégorie"})
    // Ajout attribut categories à l'objet user
    // req.user.categories = req.user.categorie.split(";");
    req.user.categories = req.user.categorie;
    next();
};

async function verifyTokenPrincipal(req, res, include = []) {
        // let token = req.headers["x-access-token"];
        let token = req.headers["authorization"];

        if (!token) {
            return res.status(401).send({
                message: "Aucun token fourni !",
            });
        }
    
        const bearer = token.split(" ");
        const bearerToken = bearer[1];
    
        await jwt.verify(bearerToken, config.secret,async (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Non autorisé!",
                });
            }
    
            req.userId = decoded.id;
            await User.findByPk(req.userId, {include}).then((user) => {
                req.user = dataToJson(user);
                setCategorie(req.user); // Met les categories en JSON
                req.isAdmin = user.idRole == 1; // Ajouter attribut isAdmin au requete
            });
        });    
}

// ajouter à req un attribut user et userId si un utilisateur est connecté
const setUserConnecte = async (req, res, next) => {
    // let token = req.headers["x-access-token"];
    let token = req.headers["authorization"];

    if (!token) {
        next();
        return;
    }
    const bearer = token.split(" ");
    const bearerToken = bearer[1];
    await jwt.verify(bearerToken, config.secret,async (err, decoded) => {
        if (err) {
            next();
            return;
        }
        req.userId = decoded.id;
        await User.findByPk(req.userId).then((user) => {
            req.user = user;
        })
        next();
    });
};



// isAdministrateur = (req, res, next) => {
//     User.findByPk(req.userId).then((user) => {
//         user.getRole().then((role) => {
//             if (role.name === "administrateur") {
//                 next();
//                 return;
//             }

//             res.status(403).send({
//                 message: "Vous n'êtes pas administrateur!",
//             });
//             return;
//         });
//     });
// };

// isResponsable = (req, res, next) => {
//     User.findByPk(req.userId).then((user) => {
//         user.getRole().then((role) => {
//             if (role.name === "responsable") {
//                 next();
//                 return;
//             }

//             res.status(403).send({
//                 message: "Require Role Responsable!",
//             });
//             return;
//         });
//     });
// };

// isCommercial = (req, res, next) => {
//     User.findByPk(req.userId).then((user) => {
//         user.getRole().then((role) => {
//             if (role.name === "commercial") {
//                 next();
//                 return;
//             }

//             res.status(403).send({
//                 message: "Require Role Commercial!",
//             });
//             return;
//         });
//     });
// };

// isClient = (req, res, next) => {
//     User.findByPk(req.userId).then((user) => {
//         user.getRole().then((role) => {
//             if (role.name === "client") {
//                 next();
//                 return;
//             }

//             res.status(403).send({
//                 message: "Require Role Client!",
//             });
//             return;
//         });
//     });
// };

const authJwt = {
    verifyToken: verifyToken,
    // isAdministrateur: isAdministrateur,
    // isResponsable: isResponsable,
    // isCommercial: isCommercial,
    // isClient: isClient,
    setUserConnecte,
    verifyUserDemandeVirement
};
module.exports = authJwt;
