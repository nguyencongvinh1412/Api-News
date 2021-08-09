const tintucModel = require('../models/tintuc.model');
const ObjectId = require('mongoose').Types.ObjectId;
const fs = require('fs');
const path = require('path');
const functions = require('../../helpers/functions');

module.exports.addAll = (req, res, next) => {
    let tintucList = [];
    fs.readFile(path.join(__dirname, '../../../../', 'databaseSQL/tintuc.json')
        , (err, data) => {
            tintucList = JSON.parse(data);
            tintucList.forEach(tintuc => {

                const tintucNew = new tintucModel(tintuc);
                tintucNew.save()
                .catch(err => {
                    res.json({
                        message: 'failed to save the loai'
                    })
                    next(err);
                });
            })
        
            res.json({
                message: 'successfully',
            })
        });

}

// /tintuc/showAll   [get]
module.exports.showAll = (req, res, next) => {
    tintucModel.findWithDeleted({})
    .populate('idtintuc')
    .then(tintucs => {
        tintucs = tintucs.map(tintuc => tintuc.toObject());
        return res.json({
            total: parseInt(tintucs.length),
            data: tintucs
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

// /tintuc/findById/id  [get]
module.exports.findById = (req, res, next) => {
    const id = req.params.id;
    if(id) {
        tintucModel.findOne({_id: id})
        .populate('idtintuc')
        .then(tintuc => {
            if(tintuc == null) {
                return res.json({
                    message: "Not found Object"
                })
            }
            else {
                tintuc = tintuc.toObject();
                return res.json({
                    data: tintuc
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

// /tintuc/findById-deleted/id  [get]
module.exports.findByIdDeleted = (req, res, next) => {
    if(req.params.id) {
        const id = req.params.id;
        tintucModel.findOneDeleted({_id: id})
        .populate('idtintuc')
        .then(tintuc => {
            if(tintuc == null) {
                return res.json({message: "Not found Object"});
            }
            return res.json(tintuc.toObject());
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

// /tintuc/find-one-with-deleted/id  [get]
module.exports.findOneWithDeleted = (req, res, next) => {
    if(req.params.id) {
        const id = req.params.id;
        tintucModel.findOneWithDeleted({_id: id})
        .populate('idtintuc')
        .then(tintuc => {
            if(tintuc == null) {
                return res.json({message: "Not found Object"});
            }
            else {
                return res.json(tintuc.toObject());
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

// /tintuc/findByPage  [get]
module.exports.findByPage = (req, res, next) => {
    let page = parseInt(req.query.page) || 1;
    let size = parseInt(req.query.size) || 3;

    tintucModel.find({})
    .populate('idTheLoai')
    .then(tintucs => {
        tintucs = tintucs.map(tintuc => tintuc.toObject());
        const data = functions.paperSlice(tintucs, page, size);
        return res.json({
            page,
            size,
            totalPage: Math.round(tintucs.length/size),
            data
        })
    })
    .catch(err => {
        return res.json({message: `err: ${err}`});
    })
}

// /tintuc/add  [post]
module.exports.add = (req, res, next) => {
    let data = req.body;

    // check that the input data has the correct syntax
    if(data.TieuDe && data.TieuDeKhongDau && data.TomTat && data.NoiDung && data.Hinh && data.NoiBat
        && data.SoLuotXem && data.idtintuc) {

        if(data.TieuDe.trim().length > 0 && data.TieuDeKhongDau.trim().length > 0 
            && data.TomTat.trim().length > 0 && data.NoiDung.trim().length > 0
            && data.Hinh.trim().length > 0 && data.NoiBat.trim().length > 0
            && data.SoLuotXem.trim().length > 0 && data.idtintuc.trim().length > 0) {
            data = new tintucModel(data);
            data.save()
            .then(tintuc => {
                return res.json(tintuc.toObject());
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

// /tintuc/updateById  [patch]
module.exports.updateById = (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    if(data.TieuDe && data.TieuDeKhongDau && data.TomTat && data.NoiDung && data.Hinh && data.NoiBat
        && data.SoLuotXem && data.idtintuc) {

        if(data.TieuDe.trim().length > 0 && data.TieuDeKhongDau.trim().length > 0 
            && data.TomTat.trim().length > 0 && data.NoiDung.trim().length > 0
            && data.Hinh.trim().length > 0 && data.NoiBat.trim().length > 0
            && data.SoLuotXem.trim().length > 0 && data.idtintuc.trim().length > 0) {

            tintucModel.findOneAndUpdate({_id: id}, data, {new: true})
            .then(tintuc => {
                return res.json({
                    NewData: tintuc,
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

// /tintuc/deleteById/:id  [delete]
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
        tintucModel.delete({_id: id})
        .then(tintuc => tintucModel.findDeleted({_id: id}).populate('idtintuc'))
        .then(tintuc => {
            return res.json({
                Deldata: tintuc
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

// /tintuc/restoreById/id    [get]
module.exports.restoreById = (req, res, next) => {
    const id = req.params.id;
    if(id) {
        tintucModel.restore({_id: id})
        .then(tintuc => tintucModel.findOne({_id: id}).populate('idtintuc'))
        .then(tintuc => {
            return res.json({data: tintuc})
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

// /tintuc/pemaneterly-delete-by-id   [delete]
module.exports.pemaneterlyDelete = (req, res, next) => {
    const id = req.params.id;
    if(id) {
        tintucModel.findOneWithDeleted({_id: id})
        .then(() => tintucModel.findByIdAndDelete({_id: id}).populate('idLoaiTin'))
        .then(tintuc => {
            return res.json({
                message: "the data was deleted successfully",
                data: tintuc,
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