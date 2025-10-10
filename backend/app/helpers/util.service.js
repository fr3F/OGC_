const { selectSql } = require("./db.helper");

const TABLE_GIFI = "tcxlvsp1"; // Table GIFI(via sftp)

const STATUT_RECEPTION = {
    NOUVELLE: {
        value: "NOUVELLE",
        label: "Nouvelle"
    },
    ATTENTE_LIVRAISON: {
        value: "ATTENTE_LIVRAISON",
        label: "Attente livraison"
    },
    LIVREE: {
        value: "LIVREE",
        label: "Livrée"
    },
    LIVREE_PARTIELLE: {
        value: "LIVREE_PARTIELLE",
        label: "Livrée partiellement"
    },
}

const STATUT_LIVRABLES = [
    STATUT_RECEPTION.ATTENTE_LIVRAISON.value,
    STATUT_RECEPTION.LIVREE_PARTIELLE.value,
]

// Recuperer les numeros factures qui sont utilisables
async function getNumFactureUtilisables(){
    const sql = `SELECT DISTINCT t.C3
                FROM ${TABLE_GIFI} t
                    LEFT JOIN receptions r ON t.C3 = r.numFacture
                    WHERE r.numFacture IS NULL;
                `;
    const resp = await selectSql(sql);
    return resp.map((r)=> r.C3);
}

function setStatutReception(reception){
    reception.statutObj = STATUT_RECEPTION[reception.statut];
}


module.exports = {
    getNumFactureUtilisables,
    TABLE_GIFI,
    STATUT_RECEPTION,
    setStatutReception,
    STATUT_LIVRABLES
}