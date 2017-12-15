const crypt = require('./crypt.js');
const encPassword = crypt.encrypt('myGmailPassword');
console.log(encPassword);
console.log(crypt.decrypt(encPassword));