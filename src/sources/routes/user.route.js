const express = require('express');
const route = express.Router();
const controller = require('../../app/controllers/user.controller');


// show all
route.get('/showAll', controller.showAll);
// find by id
route.get('/findById/:id', controller.findById);
// find by id deleted
route.get('/findById-deleted/:id', controller.findByIdDeleted);
// find one with deleted and not deleted
route.get('/find-one-with-deleted/:id', controller.findOneWithDeleted)
// find page
route.get('/findByPage',  controller.findByPage);

// create
route.post('/add-user', controller.addUser);

//update
route.patch('/updateById/:id', controller.updateById);

// deleted
route.delete('/deleteById/:id', controller.deleteById);

// restore 
route.get('/restoreById/:id', controller.restoreById);

// pemaneterly delete
route.delete('/pemaneterly-delete-by-id/:id', controller.pemaneterlyDelete);


module.exports = route;