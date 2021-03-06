const {MongoClient, ObjectID} = require('mongodb'); 


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log(`Unable to connect to MongoDB server`);
    }
    console.log(`connected to MongoDB server`);
    
    const db = client.db('TodoApp')
    
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log(`Unable to insert Todo. Error: ${err}`)
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection('Users').insertOne(({
        name: 'Nathan Barrett',
        age: 29,
        location: 'Portland, Oregon',
    }), (err, result) => {
        if (err) {
            return console.log(`Unable to insert User. I'm sorry. Error: ${err}`)
        }
        console.log(result.ops[0]._id.getTimestamp());
    });


    client.close();
})