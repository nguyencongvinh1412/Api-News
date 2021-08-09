const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const mongoose_delete = require('mongoose-delete');

const loaitin = new Schema({
    idTheLoai: {type: ObjectId, ref: 'theloai'},
    Ten: String,
    TenKhongDau: String,
}
,{
    timestamps: true,
});

loaitin.plugin(mongoose_delete, { overrideMethods: 'all' });

module.exports = mongoose.model('loaitin', loaitin);