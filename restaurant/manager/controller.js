/**
    * @description      : 
    * @author           : manojyadav
    * @group            : 
    * @created          : 15/07/2022 - 12:34:38
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/07/2022
    * - Author          : manojyadav
    * - Modification    : 
**/
const db = require('../../dbconnection');
const service = require('./service');

var ManagerController = {

    allRestaurant: async function (req, res) {

        try {
            let resp = await service.allRestaurant(req, res)
            if (resp && resp.length) {
                res.status(200).json(resp);
            } else {
                res.status(201).json([{ msg: "NO Restraurant Available" }])
            }

        } catch (ex) {
            console.log(ex);
            res.status(500).json(ex);
        }
    },
    allRestaurant_ById: async function (req, res) {

        try {
            let resp = {};
            // console.log(req.params, req.params.id);
            if (req.params.id) {
                resp = await service.allRestaurant_ById(req, res)
            }
            return resp;
        } catch (ex) {
            console.log(ex);
            res.status(500).json(ex);
        }
    },
    addRestaurant: async function (req, res) {

        try {

            let resp = await service.addRestaurant(req, res);
            return resp;

        } catch (ex) {
            console.log(ex);
            res.status(500).json(ex);
        }
    },
    allVeg_restro: async function (req, res) {

        try {
            let resp = service.allVeg_Restro(req, res);
            return resp;
        } catch (ex) {
            console.log(ex);
            res.status(500).json(ex);
        }
    },
    updateRestaurant: async function (req, res) {
        try {
            let resp = {};
            if (req.params.id) {
                resp = await service.updateRestaurant(req, res);
            }
            console.log(resp);
            return resp;
        } catch (error) {
            console.log(error);
        }
    },
    deleteRestaurant: async function (req, res) {
        try {
            let resp = {};
            if (req.params.id) { 
                resp = await service.deleteRestaurant(req, res);
             }
            return resp;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ManagerController;