

const zoomPdf = 1;
const urlBackLocal = "http://localhost:8096/"
const URL_API = "http://192.168.2.41:8096/api/"
 
const PORT = 8096;
// const mysqlPath = "C:/mysql5.7.31/bin/mysql" 

const PATH_FLUX_GIFI = global.__basedir + "/files/flux-gifi";

// const PATH_REGLEMENTS = __basedir + "/files/reglements";
// const PATH_REGLEMENTS = `\\\\192.168.2.253\\scan\\REGLEMENTS CAISSE`;
const PATH_REGLEMENTS = `D:\\projet\\backup\\reglements`;


const SFTP_PATH_GIFI_CLIENT = '/Import';
const SFTP_PATH_CLIENT_GIFI = '/Export';
const urlLogo = urlBackLocal + "../assets/images/logo-transparent.png";

// ******************** Dev ************************
const urlBackOffice = "http://192.168.2.41:8097/#/"
const mysqlPath = "C:/wamp64/bin/mysql/mysql5.7.31/bin/mysql";
const API_LAST_FACTURE = "http://192.168.2.113:5800/lastreference/get/";
const API_REF_FOURNISSEUR = "http://192.168.2.113:5800/get/reffourniss";

const API_SYNCHRO_SAGE = {
    update: "http://192.168.2.113:5900/synchro/update",
    init: "http://192.168.2.113:5800/synchro/init",
    stock: "http://192.168.2.113:5800/init/stock",
    cump: "http://192.168.2.113:5800/init/cump",
    numerodeserie: "http://192.168.2.113:5800/init/numerodeserie",
    emplacement: "http://192.168.2.113:5800/init/emplacement"
}


// Configuration de la base de données source
const sourceDBConfig = {
    // host: '192.168.2.114',
    host: "127.0.0.1",
    user: 'admin',
    password: 'Admin*25',
    database: 'gestion_caisse_dev',
    port: 3306
};

// Configuration de la base de données source(site sodim)
const siteSodimDBConfig = {
    host: '192.168.2.114',
    user: 'admin',
    password: 'Admin*25',
    // database: 'gestion_caisse',
    database: 'sodim',
    port: 3306
};

const urlImageSodim = "http://192.168.2.108:8084/api/images/product/";

const DEVISE = "Ar";
const DEVISE_LONG = "Ariary";
const CODE_DEVISE = 'MUR';

const TEMPLATE_PATH_PROFORMA = global.__basedir + `/app/templates/pdf/proforma/proforma-pdf.html`;
const TEMPLATE_PATH_FACTURE = global.__basedir + `/app/templates/pdf/facture/maurice/`;
// const COUNTRY = "MADA";
const COUNTRY = "MAURICE";

const SOCKET_URL = {
    scanReference: "http://192.168.2.41:3000/scan-reference"
}

const DEPOT_LS = "LS Libre Service";
const MAGASIN_LS = "CLIBSER";
const API_UPDATE_STOCK_SITE = "";

const PRESTASHOP_CONFIG = {
    url: "https://libreservice-sodim.com",
    key: "XFESC6J9V28MBH38PQZNQLMFSL6GC8HB"
};

const API_GET_DEVISE = {
    mada: "https://www.banky-foibe.mg/admin/wp-json/bfm/cours_devises",
    madaHtml: "https://www.banky-foibe.mg/marche_marche-de-change",
    maurice: "https://www.google.com/search?q=euro+roupie+mauricienne"
};

const API_ITEM_FACTURE = "http://192.168.2.108:3000/docuware/edition/facture";

module.exports = {
    urlBackOffice,
    sourceDBConfig,
    mysqlPath,
    zoomPdf,
    urlBackLocal,
    PORT,
    PATH_FLUX_GIFI,
    PATH_REGLEMENTS,
    CODE_DEVISE,
    SFTP_PATH_CLIENT_GIFI,
    SFTP_PATH_GIFI_CLIENT,
    urlLogo,
    API_LAST_FACTURE,
    API_SYNCHRO_SAGE,
    siteSodimDBConfig,
    urlImageSodim,
    DEVISE,
    DEVISE_LONG,
    API_REF_FOURNISSEUR,
    TEMPLATE_PATH_FACTURE,
    COUNTRY,
    URL_API,
    TEMPLATE_PATH_PROFORMA,
    SOCKET_URL,
    DEPOT_LS,
    API_UPDATE_STOCK_SITE,
    MAGASIN_LS,
    PRESTASHOP_CONFIG,
    API_GET_DEVISE,
    API_ITEM_FACTURE
}