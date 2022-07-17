/**
    * @description      : 
    * @author           : manojyadav
    * @group            : 
    * @created          : 15/07/2022 - 12:38:14
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/07/2022
    * - Author          : manojyadav
    * - Modification    : 
**/
const express = require('express');
const router = express.Router();

var Controller = require('../manager/controller');
const { postValidate } = require('../../restaurant/middleware/validator')

router.get('/allrestaurant', Controller.allRestaurant)
router.get('/allrestaurant/:id', Controller.allRestaurant_ById)
router.post('/addrestaurant', postValidate, Controller.addRestaurant)
router.get('/allvegrestaurant', Controller.allVeg_restro);
router.post('/updaterestaurant/:id', Controller.updateRestaurant);
router.post('/deleterestaurant/:id', Controller.deleteRestaurant)


module.exports = router;

// {
//     "restaurant_name": "Holiday Inn",
//     "address": "Andheri",
//     "vegonly": false,
//     "cost": "high",
//     "cusinetypes": "[“south indian”,”italian”,“french”,“north indian”]",
//     "isopen":true
// }