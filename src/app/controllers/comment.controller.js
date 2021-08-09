const commentModel = require('../models/comment.model');
const ObjectId = require('mongoose').Types.ObjectId;
const fs = require('fs');
const path = require('path');
const functions = require('../../helpers/functions');

module.exports.addAll = (req, res, next) => {
    let commentList = [];
    fs.readFile(path.join(__dirname, '../../../../', 'databaseSQL/comment.json')
        , (err, data) => {
            commentList = JSON.parse(data);
            commentList.forEach(comment => {
                comment.idTheLoai = ObjectId(comment.idTheLoai);
                comment = new commentModel(comment);
                comment.save()
                .catch((err) => {
                    res.json({
                        message: 'failed to save comment'
                    })
                    next(err);
                });
            })
        
            res.json({
                message: 'successfully',
            })
        });

}

// /comment/showAll   [get]
module.exports.showAll = (req, res, next) => {
    commentModel.findWithDeleted({})
    .populate('idUser')
    .populate('idcomment')
    .then(comments => {
        comments = comments.map(comment => comment.toObject());
        return res.json({
            total: parseInt(comments.length),
            data: comments
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

// /comment/findById/id  [get]
module.exports.findById = (req, res, next) => {
    const id = req.params.id;
    if(id) {
        commentModel.findOne({_id: id})
        .populate('idUser')
        .populate('idcomment')
        .then(comment => {
            if(comment == null) {
                return res.json({
                    message: "Not found Object"
                })
            }
            else {
                comment = comment.toObject();
                return res.json({
                    data: comment
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

// /comment/findById-deleted/id  [get]
module.exports.findByIdDeleted = (req, res, next) => {
    if(req.params.id) {
        const id = req.params.id;
        commentModel.findOneDeleted({_id: id})
        .populate('idUser')
        .populate('idcomment')
        .then(comment => {
            if(comment == null) {
                return res.json({message: "Not found Object"});
            }
            return res.json(comment.toObject());
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

// /comment/find-one-with-deleted/id  [get]
module.exports.findOneWithDeleted = (req, res, next) => {
    if(req.params.id) {
        const id = req.params.id;
        commentModel.findOneWithDeleted({_id: id})
        .populate('idUser')
        .populate('idcomment')
        .then(comment => {
            if(comment == null) {
                return res.json({message: "Not found Object"});
            }
            else {
                return res.json(comment.toObject());
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

// /comment/findByPage  [get]
module.exports.findByPage = (req, res, next) => {
    let page = parseInt(req.query.page) || 1;
    let size = parseInt(req.query.size) || 3;

    commentModel.find({})
    .populate('idUser')
    .populate('idcomment')
    .then(comments => {
        comments = comments.map(comment => comment.toObject());
        const data = functions.paperSlice(comments, page, size);
        return res.json({
            page,
            size,
            totalPage: Math.round(comments.length/size),
            data
        })
    })
    .catch(err => {
        return res.json({message: `err: ${err}`});
    })
}

// /comment/add  [post]
module.exports.add = (req, res, next) => {
    let data = req.body;

    // check that the input data has the correct syntax
    if(data.idUser && data.idcomment && data.NoiDung) {

        if(data.idUser.trim().length > 0 && data.idcomment.trim().length > 0 
            && data.NoiDung.trim().length > 0) {
            data = new commentModel(data);
            data.save()
            .then(comment => {
                return res.json(comment.toObject());
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

// /comment/updateById  [patch]
module.exports.updateById = (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    if(data.idUser && data.idcomment && data.NoiDung) {

        if(data.idUser.trim().length > 0 && data.idcomment.trim().length > 0 
            && data.NoiDung.trim().length > 0) {

            commentModel.findOneAndUpdate({_id: id}, data, {new: true})
            .then(comment => {
                return res.json({
                    NewData: comment,
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

// /comment/deleteById/:id  [delete]
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
        commentModel.delete({_id: id})
        .then(comment => commentModel.findDeleted({_id: id}).populate('idUser').populate('idcomment'))
        .then(comment => {
            return res.json({
                Deldata: comment
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

// /comment/restoreById/id    [get]
module.exports.restoreById = (req, res, next) => {
    const id = req.params.id;
    if(id) {
        commentModel.restore({_id: id})
        .then(comment => commentModel.findOne({_id: id}).populate('idUser').populate('idcomment'))
        .then(comment => {
            return res.json({data: comment})
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

// /comment/pemaneterly-delete-by-id   [delete]
module.exports.pemaneterlyDelete = (req, res, next) => {
    const id = req.params.id;
    if(id) {
        commentModel.findOneWithDeleted({_id: id})
        .then(() => commentModel.findByIdAndDelete({_id: id}).populate('idUser').populate('idTinTuc'))
        .then(comment => {
            return res.json({
                message: "the data was deleted successfully",
                data: comment,
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