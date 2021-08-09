const express = require('express');
const route = express.Router();
const controller = require('../../app/controllers/theloai.controller');

// crud, create, read, update, deleted

// read: read all, read by id, read by id which is deleted, read by id, which is deleted and not deleted
route.get('/showAll', controller.showAll);
route.get('/findById/:id', controller.findById);
route.get('/findById-deleted/:id', controller.findByIdDeleted);
route.get('/find-one-with-deleted/:id', controller.findOneWithDeleted);
route.get('/findByPage', controller.findByPage);

// create
route.post('/add-the-loai', controller.add);

// update
route.patch('/updateById/:id', controller.updateById);

// deleted
route.delete('/deleteById/:id', controller.deleteById);

// restore 
route.get('/restoreById/:id', controller.restoreById);

// pemaneterly delete
route.get('/pemaneterly-delete-by-id/:id', controller.pemaneterlyDelete);

route.get('/addAll', controller.addAll);

module.exports = route;