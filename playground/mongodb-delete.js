const {
	MongoClient,
	ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if (err) {
		return console.log(`Unable to connect to MongoDB server`);
	}
	console.log(`connected to MongoDB server`);

	const db = client.db('TodoApp')


    // db.collection('Users').deleteMany({name: 'Nathan Barrett'}).then((result) => {
    //     console.log(result)
    // });
    // deleteOne
    // db.collection('Users').deleteOne({
    // 		_id: new ObjectID("5b3bb0f9dae310bf6aaa56a5")
    // 	}).then((result) => {
    //     console.log(result);
    // }) 
    // findOneAndDelete
    //   db.collection('Todos').findOneAndDelete({
    //   	completed: false
    //   }).then((result) => {
    //   	console.log(result);
    //   });

	client.close();
})