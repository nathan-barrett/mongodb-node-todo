require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
//POST /todos request
app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });
  todo.save().then(
    (doc) => {
      res.send(doc);
    },
    (e) => {
      res.status(400).send(e);
    }
  );
});
//POST /users
app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(
      (token) => {
        res.header('x-auth', token).send(user);
      },
      (e) => {
        res.status(400).send(e);
      }
    );
});
// GET /todos
app.get('/todos', (req, res) => {
  Todo.find().then(
    (todos) => {
      res.send({ todos });
    },
    (e) => {
      res.status(400).send(e);
    }
  );
});
// GET /users
app.get('/users', (req, res) => {
  User.find().then(
    (users) => {
      res.send({ users });
    },
    (e) => {
      res.status(400).send(e);
    }
  );
});

// GET /todos:id
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id)
    .then((todo) => {
      if (!todo) {
        res.status(404).send();
      }

      res.send({ todo });
    })
    .catch((e) => {
      res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch((e) => {
      res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  //Body variable so the user can only update two things:
  const body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch((e) => {
      res.status(400).send();
    });
});
//Listen to Port variable
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
