const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const mongoose_delete = require('mongoose-delete');

const theloai = new Schema({
    Ten: {type: String, default: null},
    TenKhongDau: {type: String, default: null},
}
,{
    timestamps: true,
});

theloai.plugin(mongoose_delete, { overrideMethods: 'all' });

module.exports = mongoose.model('theloai', theloai);