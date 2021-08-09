const userModel = require('../models/user.model');
const md5 = require('md5');
const functions = require('../../helpers/functions');

module.exports.addUser = (req, res, next) => {
    if(req.body) {
        req.body.pass = md5(req.body.pass);
        const data = new userModel(req.body);

        data.save()
        .then(user=> {
            return res.json(user);
        })
        .catch(err => {
            return res.json({
                message: err,
            })
        })
    }
    else {
        res.json({
            message: 'the data for summited is invalid',
        })
    }
}

// /user/showAll   [get]
module.exports.showAll = (req, res, next) => {
    userModel.findWithDeleted({})
    .then(users => {
        users = users.map(user => user.toObject());
        return res.json({
            total: parseInt(users.length),
            data: users
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

// /user/findById/id  [get]
module.exports.findById = (req, res, next) => {
    const id = req.params.id;
    if(id) {
        userModel.findOne({_id: id})
        .then(user => {
            if(user == null) {
                return res.json({
                    message: "Not found Object"
                })
            }
            else {
                user = user.toObject();
                return res.json({
                    data: user
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

// /user/findById-deleted/id  [get]
module.exports.findByIdDeleted = (req, res, next) => {
    if(req.params.id) {
        const id = req.params.id;
        userModel.findOneDeleted({_id: id})
        .then(user => {
            if(user == null) {
                return res.json({message: "Not found Object"});
            }
            return res.json(user.toObject());
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

// /user/find-one-with-deleted/id  [get]
module.exports.findOneWithDeleted = (req, res, next) => {
    if(req.params.id) {
        const id = req.params.id;
        userModel.findOneWithDeleted({_id: id})
        .then(user => {
            if(user == null) {
                return res.json({message: "Not found Object"});
            }
            else {
                return res.json(user.toObject());
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

// /user/findByPage  [get]
module.exports.findByPage = (req, res, next) => {
    let page = parseInt(req.query.page) || 1;
    let size = parseInt(req.query.size) || 3;

    userModel.find({})
    .then(users => {
        users = users.map(user => user.toObject());
        const data = functions.paperSlice(users, page, size);
        return res.json({
            page,
            size,
            totalPage: Math.round(users.length/size),
            data
        })
    })
    .catch(err => {
        return res.json({message: `err: ${err}`});
    })
}

// /user/updateById  [patch]
module.exports.updateById = (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    if(data.email && data.ten && data.tuoi && data.pass && data.level) {

        if(data.email.trim().length > 0 && data.pass.trim().length > 0 
            && data.ten.trim().length > 0 && data.level.trim().length > 0) {

            userModel.findOneAndUpdate({_id: id}, data, {new: true})
            .then(user => {
                return res.json({
                    NewData: user,
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

// /user/deleteById/:id  [delete]
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
        userModel.delete({_id: id})
        .then(user => userModel.findDeleted({_id: id}))
        .then(user => {
            return res.json({
                Deldata: user
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

// /user/restoreById/id    [get]
module.exports.restoreById = (req, res, next) => {
    const id = req.params.id;
    if(id) {
        userModel.restore({_id: id})
        .then(user => userModel.findOne({_id: id}))
        .then(user => {
            return res.json({data: user})
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

// /user/pemaneterly-delete-by-id   [delete]
module.exports.pemaneterlyDelete = (req, res, next) => {
    const id = req.params.id;
    if(id) {
        userModel.findOneWithDeleted({_id: id})
        .then(() => userModel.findByIdAndDelete({_id: id}))
        .then(user => {
            return res.json({
                message: "the data was deleted successfully",
                data: user,
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