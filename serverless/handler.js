'use strict';
const EMPLOYEES = [{
  name: 'Foo', age: 30, email: 'foo@gmail.com', salary: 55000,
  address: '35, dy street, chicago', expertise: 'Nodejs',
},
{
  name: 'John', age: 25, email: 'john@gmail.com', salary: 45000,
  address: '35, dy street, chicago', expertise: 'Reactjs',
}];

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };
};

module.exports.getEmployees = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      employees: EMPLOYEES
    }),
  };
  callback(null, response);
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};


module.exports.addEmployee = (event, context, callback) => {
  console.log('event --->', event);
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'user added finally'
    })
  }
  callback(null, response);
}