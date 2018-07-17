const {ObjectID} = require('mongodb')


const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

const id = '5b47e2d20210836b9ed29542';


// if (!ObjectID.isValid(id)) {
//     console.log('ID not found')
// }
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     if (!todo) {
//         return console.log("ID not found in database")
//     }
// 	console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log("ID not found in database")
//     }
//     console.log('Todo by id: ', todo)
// }).catch((e) => console.log(e));

User.findById(id).then((user) => {
    if (!user) {
        return console.log("User iD not found in database")
    }
    console.log('User: ', user)
}).catch((e) => console.log(e));