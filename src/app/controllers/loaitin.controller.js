const loaitinModel = require('../models/loaitin.model');
const ObjectId = require('mongoose').Types.ObjectId;
const fs = require('fs');
const path = require('path');
const functions = require('../../helpers/functions');

// /loaitin/addAll  [get]
module.exports.addAll = (req, res, next) => {
    let loaitinList = [];
    fs.readFile(path.join(__dirname, '../../../../', 'databaseSQL/loaitin.json')
        , (err, data) => {
            loaitinList = JSON.parse(data);
            loaitinList.forEach(loaitin => {
                loaitin.idloaitin = ObjectId(loaitin.idloaitin);
                loaitin = new loaitinModel(loaitin);
                loaitin.save()
                .catch((err) => {
                    res.json({
                        message: 'failed to save loaitin'
                    })
                    next(err);
                });
            })
        
            res.json({
                message: 'successfully',
            })
        });

}

// /loaitin/showAll   [get]
module.exports.showAll = (req, res, next) => {
    loaitinModel.findWithDeleted({})
    .populate('idTheLoai')
    .then(loaitins => {
        loaitins = loaitins.map(loaitin => loaitin.toObject());
        return res.json({
            total: parseInt(loaitins.length),
            data: loaitins
        })
    })
    .catch(err => {
        res.status(500);
        return res.json({
            status: res.statusCode,
            message: `err: ${err}`
        })
    })
}

// /loaitin/findById/id  [get]
module.exports.findById = (req, res, next) => {
    const id = req.params.id;
    if(id) {
        loaitinModel.findOne({_id: id})
        .populate('idTheLoai')
        .then(loaitin => {
            if(loaitin == null) {
                return res.json({
                    message: "Not found Object"
                })
            }
            else {
                loaitin = loaitin.toObject();
                return res.json({
                    data: loaitin
                })
            }
        })
    }
    else {
        res.status(404);
        return res.json({
            status: res.statusCode,
            message: "you must submit id of an Object to find"
        })
    }
}

// /loaitin/findById-deleted/id  [get]
module.exports.findByIdDeleted = (req, res, next) => {
    if(req.params.id) {
        const id = req.params.id;
        loaitinModel.findOneDeleted({_id: id})
        .populate('idTheLoai')
        .then(loaitin => {
            if(loaitin == null) {
                return res.json({message: "Not found Object"});
            }
            return res.json(loaitin.toObject());
        })
        .catch(err => {
            return res.json({message: `err: ${err}`});
        })
    }
    else {
        res.status(404);
        return res.json({
            status: res.statusCode,
            message: "you must submit id of an Object to find"
        })
    }
}

// /loaitin/find-one-with-deleted/id  [get]
module.exports.findOneWithDeleted = (req, res, next) => {
    if(req.params.id) {
        const id = req.params.id;
        loaitinModel.findOneWithDeleted({_id: id})
        .populate('idTheLoai')
        .then(loaitin => {
            if(loaitin == null) {
                return res.json({message: "Not found Object"});
            }
            else {
                return res.json(loaitin.toObject());
            }
        })
        .catch(err => {
            return res.json({message: `err: ${err}`});
        })
    }
    else {
        res.status(404);
        return res.json({
            status: res.statusCode,
            message: "you must submit id of an Object to find"
        })
    }
}

// /loaitin/findByPage  [get]
module.exports.findByPage = (req, res, next) => {
    let page = parseInt(req.query.page) || 1;
    let size = parseInt(req.query.size) || 3;

    loaitinModel.find({})
    .populate('idTheLoai')
    .then(loaitins => {
        loaitins = loaitins.map(loaitin => loaitin.toObject());
        const data = functions.paperSlice(loaitins, page, size);
        return res.json({
            page,
            size,
            totalPage: Math.round(loaitins.length/size),
            data
        })
    })
    .catch(err => {
        return res.json({message: `err: ${err}`});
    })
}

// /loaitin/add  [post]
module.exports.add = (req, res, next) => {
    let data = req.body;

    // check tha the input data has the correct syntax
    if(data.Ten && data.TenKhongDau && data.idTheLoai) {

        if(data.Ten.trim().length > 0 && data.TenKhongDau.trim().length > 0 && data.idTheLoai.trim().length > 0) {
            data = new loaitinModel(data);
            data.save()
            .then(loaitin => {
                return res.json(loaitin.toObject());
            }) 
            .catch(err => {
                return next(err);
            })
         }
         else {
             res.status(500);
             return res.json({
                 message: "the data input hasn't correct syntax",
                 status: res.statusCode,
                 data,
             });
         }
    }
    else {
        res.status(500);
        return res.json({
            status: res.statusCode,
            message: "the data input hasn't exists",
        })
    }

}

// /loaitin/updateById  [patch]
module.exports.updateById = (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    if(data.Ten && data.TenKhongDau && data.idloaitin && id) {
        if(data.Ten.trim().length > 0 && data.TenKhongDau.trim().length > 0 
            && data.idloaitin.trim().length > 0 && id.trim().length > 0) {
            loaitinModel.findOneAndUpdate({_id: id}, data, {new: true})
            .then(loaitin => {
                return res.json({
                    NewData: loaitin,
                })
            })
            .catch(err => {
                res.status(500);
                return res.json({
                    status: res.status,
                    message: `err: ${err}`
                })
            })
        }
        else {
            res.status(500);
            return res.json({
                status: res.status,
                message: "the data input hasn't correct syntax"
            })
        }
    }
    else {
        res.status(500);
        return res.json({
            stauts: res.status,
            message: "the data input hasn't exists"
        })
    }
}

// /loaitin/deleteById/:id  [delete]
module.exports.deleteById = (req, res, next) => {
    const id = req.params.id;
    if(id == "undefined" || id == "null") {
        res.status(404);
        return res.json({
            status: res.statusCode,
            message: "id hasn't exists"
        })
    }
    else {
        loaitinModel.delete({_id: id})
        .then(loaitin => loaitinModel.findDeleted({_id: id}).populate('idTheLoai'))
        .then(loaitin => {
            return res.json({
                Deldata: loaitin
            })
        })
        .catch(err => {
            res.status(500);
            return res.json({
                status: res.statusCode,
                message: `err: ${err}`,
            })
        })
    }
}

// /loaitin/restoreById/id    [get]
module.exports.restoreById = (req, res, next) => {
    const id = req.params.id;
    if(id) {
        loaitinModel.restore({_id: id})
        .then(loaitin => loaitinModel.findOne({_id: id}).populate('idTheLoai'))
        .then(loaitin => {
            return res.json({data: loaitin})
        })
        .catch(err => {
            res.status(500);
            return res.json({
                status: res.statusCode,
                message: `err: ${err}`
            })
        })
    }
    else {
        res.status(500);
        return res.json({
            status: res.statusCode,
            message: "you must submit an id of the object to restore",
        })
    }

}

// /loaitin/pemaneterly-delete-by-id   [get]
module.exports.pemaneterlyDelete = (req, res, next) => {
    const id = req.params.id;
    if(id) {
        loaitinModel.findOneWithDeleted({_id: id})
        .then(() => loaitinModel.findByIdAndDelete({_id: id}).populate('idTheLoai'))
        .then(loaitin => {
            return res.json({
                message: "the data was deleted successfully",
                data: loaitin,
            })
        })
        .catch(err => {
            res.status(500);
            return res.json({
                status: res.statusCode,
                message: `err: ${err}`
            })
        })
    }
    else {
        res.status(500);
        return res.json({ 
            status: res.statusCode,
            message: "you must submit an id of the object to delete"
        })
    }
}