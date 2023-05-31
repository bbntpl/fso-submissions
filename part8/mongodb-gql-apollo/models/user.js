const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
	username: {
		required: true,
		type: String,
		unique: true,
		minlength: 3,
		maxlength: 20
	},
	favoriteGenre: String
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
	transform: (doc, ret) => {
		ret.id = ret._id
		delete ret._id
		delete ret.__v
		delete ret.passwordHash
	}
})

module.exports = mongoose.model('User', userSchema)