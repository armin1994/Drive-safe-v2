var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('node-mongoose-validator');
mongoose.connect('mongodb://root:root@ds117829.mlab.com:17829/armindb');
var userSchema = new Schema({
    user_name: {type: String, unique: true},
    email: {type: String, unique: true, validate: validator.$isEmail()},
    password: {type: String, required: true},
    first_name: {type: String},
    last_name: {type: String},
    address: {type: String},
    registration_date: {type: Date, default: new Date()},
    about: {type: String},
    image: String,
    fb_id: String
});
module.exports.user = mongoose.model('User', userSchema);

var reservationSchema = new Schema({
    user: {type: Schema.ObjectId, ref: 'User'},
    date: {type: Date, default: new Date()},
    status: {type: Boolean, default: false},
    scenarios: [
        {
            scenario: {type: Schema.ObjectId, ref: 'Scenario'},
            skills: [{skill: {type: Schema.ObjectId, ref: 'Skill'}, score:{ type: Number, default: 0}}],
            status: {type: Number , default: 0}
        }]
});
module.exports.reservation = mongoose.model('Reservation', reservationSchema);

var reviewSchema = new Schema({
    user: {type: Schema.ObjectId, ref: 'User'},
    scenario: {type: Schema.ObjectId, ref: 'Scenario' },
    description: {type: String},
    date: {type: Date, default: new Date()},
    rate: {type: Boolean}
});
module.exports.review = mongoose.model('Review', reviewSchema);

var scenarioSchema = new Schema({
    name: {type: String},
    description: {type: String},
    difficulty: Number,
    skills: [{type: Schema.ObjectId, ref: 'Skill'}],
    category: {type: Schema.ObjectId, ref: 'Category'},
    image: String
});
module.exports.scenario = mongoose.model('Scenario', scenarioSchema);

var categorySchema = new Schema({
    name: {type: String}
});
module.exports.category = mongoose.model('Category', categorySchema);

var skillSchema = new Schema({
    name: {type: String},
    description: {type: String}
});
module.exports.skill = mongoose.model('Skill', skillSchema);