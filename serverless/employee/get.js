'use strict';

var mysql = require('mysql');
const config = require('../config/config');
var pool = mysql.createPool({
    connectionLimit: config.connectionLimit,
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    connectTimeout: 20000
});

module.exports.get = (event, context, callback) => {

    context.callbackWaitsForEmptyEventLoop = false;
    pool.getConnection((err, connection) => {
        if (err) {
            console.log('rds connection err', err);
            throw err;
        }
        connection.query(`select * from employee`, (error, results, field) => {
            connection.release();
            if (error) {
                callback(error);
            }
            console.log('db results', results);
            const response = {
                statusCode: 200,
                body: JSON.stringify({
                    employees: results
                })
            };
            callback(null, response);
        })
    })
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};