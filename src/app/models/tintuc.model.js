const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const mongoose_delete = require('mongoose-delete');

const tintuc = new Schema({
    TieuDe: String,
    TieuDeKhongDau: String,
    TomTat: String,
    NoiDung: String,
    Hinh: String,
    NoiBat: String,
    SoLuotXem: String,
    idLoaiTin: {type: ObjectId, ref: 'loaitin'}
}
,{
    timestamps: true,
});

tintuc.plugin(mongoose_delete, { overrideMethods: 'all' });

module.exports = mongoose.model('tintuc', tintuc);