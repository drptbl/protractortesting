function ConnectDatabase (){
var mysql = require('mysql');

this.connection = mysql.createConnection({
host : 'mysql.stgwaw.opigram',
user : 'monad',
password : 'monad',
database: 'monad'
});
};
module.exports = ConnectDatabase;