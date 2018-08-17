const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const todos = [
  {
    _id: new ObjectID(),
    text: 'First test do',
    _creator: userOneId
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 666,
    _creator: userTwoId
  }
];
const users = [
  {
    _id: userOneId,
    email: 'nathan@nathan.com',
    password: 'userOnePass',
    tokens: [
      {
        access: 'auth',
        token: jwt
          .sign(
            {
              _id: userOneId,
              access: 'auth'
            },
            process.env.JWT_SECRET
          )
          .toString()
      }
    ]
  },
  {
    _id: userTwoId,
    email: 'angela@angela.com',
    password: 'userTwoPass',
    tokens: [
      {
        access: 'auth',
        token: jwt
          .sign(
            {
              _id: userTwoId,
              access: 'auth'
            },
            process.env.JWT_SECRET
          )
          .toString()
      }
    ]
  }
];

const popTodos = (done) => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
};
const popUsers = (done) => {
  User.remove({})
    .then(() => {
      const userOne = new User(users[0]).save();
      const userTwo = new User(users[1]).save();
      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};

module.exports = {
  todos,
  popTodos,
  users,
  popUsers
};
