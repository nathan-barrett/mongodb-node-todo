const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const password = '123abc';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});

const hashedPassword = '$2a$10$WGxR9rgGd3mMVg5C2HAUSu8oi/eTQD8J2ZrrqKHra9ZM9oLfWRAgO';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});

// const data = {
//   id: 10
// };

// const token = jwt.sign(data, '123abc');

// const decoded = jwt.verify(token, '123abc');

// console.log('decoded *****', decoded);
