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


module.exports.create = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    console.log('event ===> ', event);
    if (!event.body) {
        const response = {
            statusCode: 400,
            headers: {
                "Content-Type": "application/json"
            },
            body: 'no employee provided error'
        }
        return callback(null, response)
    }
    const employee = JSON.parse(event.body);
    pool.getConnection((err, connection) => {
        if (err) {
            console.log('rds connection error');
            callback(err);
        }
        const { name, age, email, salary, address, expertise } = employee;
        const sql = `select email from employee where email = '${email}'`;
        connection.query(sql, (err, results) => {
            console.log('email present results', results);
            if (results.length > 0) {
                const response = {
                    statusCode: 400,
                    body: JSON.stringify({
                        message: 'user already present'
                    })
                };
                callback(null, response);
            } else {
                let sql = `INSERT INTO employee (name, age, email, salary, address, expertise) VALUES (?, ?, ?, ?, ?, ?)`;
                connection.query(sql, [name, age, email, salary, address, expertise], (error, results, field) => {
                    connection.release();
                    if (error) {
                        callback(error);
                    }
                    console.log('db results', results);
                    const response = {
                        statusCode: 200,
                        body: JSON.stringify({
                            message: 'successfully created'
                        })
                    };
                    callback(null, response);
                })
            }
        });

    });
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};