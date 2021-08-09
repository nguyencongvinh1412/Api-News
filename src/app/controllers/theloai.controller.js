const theloaiModel = require('../models/theloai.model');
const fs = require('fs');
const path = require('path');
const functions = require('../../helpers/functions');

// /theloai/addAll [get]
module.exports.addAll = (req, res, next) => {
    let theloaiList = [];
    fs.readFile(path.join(__dirname, '../../../../', 'databaseSQL/theloai.json')
        , (err, data) => {
            theloaiList = JSON.parse(data);
            theloaiList.forEach(theloai => {

                const theloaiNew = new theloaiModel(theloai);
                theloaiNew.save()
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

// /theloai/showAll [get]
module.exports.showAll = (req, res, next) => {
    theloaiModel.findWithDeleted({})
    .then(theloais => {
        theloais = theloais.map(theloai => theloai.toObject());
        return res.json(theloais);
    })
    .catch(err => {
        return res.json({message: err});
    })
}

// /theloai/findById/id     [get]
module.exports.findById = (req, res, next) => {
    if(req.params.id) {
        const id = req.params.id;
        theloaiModel.findOne({_id: id})
        .then(theloai => {
            return res.json(theloai.toObject());
        })
        .catch(err => {
            return res.json({message: err});
        })
    }
}

// /theloai/findById-deleted/id     [get]
module.exports.findByIdDeleted = (req, res, next) => {
    if(req.params.id) {
        const id = req.params.id;
        theloaiModel.findOneDeleted({_id: id})
        .then(theloai => {
            if(theloai == null) {
                return res.json({message: "Not found Object"});
            }
            return res.json(theloai.toObject());
        })
        .catch(err => {
            return res.json({message: `err: ${err}`});
        })
    }
}

// /theloai/find-one-with-deleted/id     [get]
module.exports.findOneWithDeleted = (req, res, next) => {
    if(req.params.id) {
        const id = req.params.id;
        theloaiModel.findOneWithDeleted({_id: id})
        .then(theloai => {
            if(theloai == null) {
                return res.json({message: "Not found Object"});
            }
            else {
                return res.json(theloai.toObject());
            }
        })
        .catch(err => {
            return res.json({message: `err: ${err}`});
        })
    }
}

// /theloai/findByPage   [get]
module.exports.findByPage = (req, res, next) => {
    let page = parseInt(req.query.page) || 1;
    let size = parseInt(req.query.size) || 3;

    theloaiModel.find({})
    .then(theloais => {
        theloais = theloais.map(theloai => theloai.toObject());
        const data = functions.paperSlice(theloais, page, size);
        return res.json({
            page,
            size,
            totalPage: Math.round(theloais.length/size),
            data
        })
    })
    .catch(err => {
        return res.json({message: `err: ${err}`});
    })
    
}

// /theloai/add-the-loai  [post]
module.exports.add = (req, res, next) => {
    let data = req.body;

    // check tha the input data has the correct syntax
    if(data.Ten && data.TenKhongDau) {

        if(data.Ten.trim().length > 0 && data.TenKhongDau.trim().length > 0) {
            data = new theloaiModel(data);
            data.save()
            .then(theloai => {
                return res.json(theloai.toObject());
            }) 
            .catch(err => {
                return next(err);
            })
         }
         else {
             res.status(500);
             return res.json({
                 message: "the data input hasn't correct syntax",
                 status: res.status,
                 data,
             });
         }
    }
    else {
        res.status(500);
        return res.json({
            message: "the data input hasn't exists",
            status: res.status,
        })
    }

}

// /theloai/updateById  [patch]
module.exports.updateById = (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    if(data.Ten && data.TenKhongDau && id) {
        if(data.Ten.trim().length > 0 && data.TenKhongDau.trim().length > 0 && id.trim().length > 0) {
            theloaiModel.findOneAndUpdate({_id: id}, data, {new: true})
            .then(theloai => {
                return res.json({
                    NewData: theloai,
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

// /theloai/deleteById/:id  [delete]
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
        theloaiModel.delete({_id: id})
        .then(theloai => theloaiModel.findDeleted({_id: id}))
        .then(theloai => {
            return res.json({
                Deldata: theloai
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

// /theloai/restoreById/id    [get]
module.exports.restoreById = (req, res, next) => {
    const id = req.params.id;
    if(id) {
        theloaiModel.restore({_id: id})
        .then(theloai => theloaiModel.findOne({_id: id}))
        .then(theloai => {
            return res.json({data: theloai})
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

// /theloai/pemaneterly-delete-by-id   [get]
module.exports.pemaneterlyDelete = (req, res, next) => {
    const id = req.params.id;
    if(id) {
        theloaiModel.findOneWithDeleted({_id: id})
        .then(() => theloaiModel.findByIdAndDelete({_id: id}))
        .then(theloai => {
            return res.json({
                message: "the data was deleted successfully",
                data: theloai,
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