const mongoose = require('mongoose');
mongoose.Schema.Types.Boolean.convertToFalse.add('');
const Schema = mongoose.Schema;

let attachmentSchema = new Schema({
	originalname: {
		type: String
	},
	filename: {
		type: String
	},
	size: {
		type: Number
	},
	contentType: {
		type: String
	},
	lastModifiedDate: {
		type: String
	},
	uploaddDate: {
		type: String
	},
	percent: {
		type: Number
	},
	id: {
		type: String
	},
	status: {
		type: String
	},
	previewUrl: {
		type: String
	},
	bucketName: {
		type: String
	},
	width: {
		type: Number
	},
	height: {
		type: Number
	},
});

// collection and schema for Registration
let Forms = new Schema({
	id: {
		type: String
	},
	entity_type: {
		type: String,
		default: ''
	},
	date: {
		type: Date,
		default: Date.now
	},
	username: {
		type: String,
		default: ''
	},
	email: {
		type: String,
		default: ''
	},
	attachments: [attachmentSchema]
}, {
	collection: 'Forms'
});

module.exports = mongoose.model('Forms', Forms);
