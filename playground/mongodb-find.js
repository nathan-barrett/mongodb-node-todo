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

    db.collection('Todos').find({
        _id: new ObjectID('5b3cee2e1d389aef4656cfb7')
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2))
    }, (err) => {
        console.log('Unable to fetch todos: ', err)
    })

    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos Count: ${count}`);
    }, (err) => {
        console.log('Unable to fetch todos: ', err)
    })
    db.collection('Users').find({name: "Angela Francisco"}).toArray().then((docs) => {
         console.log('User found: ');
         console.log(JSON.stringify(docs, undefined, 2))
    }, (err) => {
        console.log('Unable to fetch todos: ', err)
    })

	client.close();
})