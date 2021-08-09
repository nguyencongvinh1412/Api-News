const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const mongoose_delete = require('mongoose-delete');

const user = new Schema({
    email: String,
    pass: String, 
    ten: String,
    tuoi: String,
    level: String,
}
,{
    timestamps: true,
});

user.plugin(mongoose_delete, { overrideMethods: 'all' });

module.exports = mongoose.model('user', user);