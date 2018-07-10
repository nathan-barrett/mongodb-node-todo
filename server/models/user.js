const mongoose = require('mongoose')

const User = mongoose.model('Users', {
	email: {
		type: String,
		required: [true, "Must contain email"],
		minLength: 1,
		trim: true,
	}
})

module.exports = { User }