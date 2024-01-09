var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'kelid');
console.log('token', token)
var decoded = jwt.verify(token, 'kelid');
console.log('decoded', decoded);


console.log('Date.now()', Date.now())