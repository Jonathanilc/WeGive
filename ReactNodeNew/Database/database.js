const mysql = require('mysql');


const connection = mysql.createPool({
    connectionLimit : 100,
    waitForConnections : true,
    queueLimit :0,
    host    : 'sql12.freemysqlhosting.net',
    user    : 'sql12250913',
    password: '2xGmuiZblZ',
    database: 'sql12250913',
    debug    :  true,
    wait_timeout : 28800,
    connect_timeout :10
});


module.exports.connection = connection;