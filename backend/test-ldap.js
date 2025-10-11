var ActiveDirectory = require('activedirectory');
var config = {
    url: 'ldap://172.16.110.2:389',
    baseDN: 'DC=sodim,DC=corp'
};
var ad = new ActiveDirectory(config);
var username = 'user050@sodim.corp';
var password = 'n12#Nd11';
ad.authenticate(username, password, function(err, auth) {
    if (err) {
        console.log('ERROR: '+JSON.stringify(err));
        return;
    }
    if (auth) {
        console.log('Authenticated!');
    }
    else {
        console.log('Authentication failed!');
    }
});