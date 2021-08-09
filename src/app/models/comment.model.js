const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const mongoose_delete = require('mongoose-delete');

const comment = new Schema({
    idUser: {type: ObjectId, ref: 'user'},
    idTinTuc: {type: ObjectId, ref: 'tintuc'},
    NoiDung: String,
}
,{
    timestamps: true,
});

comment.plugin(mongoose_delete, { overrideMethods: 'all' });

module.exports = mongoose.model('comment', comment);