const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//To remove everything
Todo.remove({}).then((result) => {
    console.log(result)
})


// Todo.findOneAndRemove()


Todo.findByIdAndRemove('5b4e7c39274208dffadd8aaf').then((todo) => {
    console.log(todo)
})