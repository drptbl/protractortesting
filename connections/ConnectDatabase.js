function ConnectDatabase (){
var mysql = require('mysql');

this.connection = mysql.createConnection({
host : 'x',
user : 'x',
password : 'x',
database: 'x'
});
};
module.exports = ConnectDatabase;