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

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b3f94041d389aef4656d6ec')
    // }, {
	// 	$set: {
	// 		completed: false
	// 	}
	// }, {
	// 	returnOriginal: false 
	// }).then((result) => {
	// 	console.log(result);
	// });
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b3e9092280357d1967a11aa')
    }, {
		$inc: {
			age: 5
		},
		$set: {
			name: 'Nathan Barrett'
		}
	}, {
		returnOriginal: false 
	}).then((result) => {
		console.log(result);
	});
	

	client.close();
})