/**
    * @description      : 
    * @author           : manojyadav
    * @group            : 
    * @created          : 17/07/2022 - 12:30:53
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/07/2022
    * - Author          : manojyadav
    * - Modification    : 
**/
const db = require('../../dbconnection');
const uuid = require('uuid');

var ManagerService = {
    allRestaurant: async function (req, res) {
        let resp = [];
        try {

            let val = {};
            let queryArr = await ManagerService.allQuery(req, res);

            if (queryArr && queryArr.length) {
                if (queryArr.includes("cost") || (queryArr.includes("cusinetypes") && queryArr.includes("cost"))) {
                    if (req.query.cost) {
                        val.Cost = req.query.cost;
                        if (val.Cost.includes("|")) {
                            val.Cost = val.Cost.split("|")
                        } else {
                            val.Cost = [req.query.cost]
                        }
                    }
                    resp = await db.getAllVeg_Lowfare_restro(val);
                    if (req.query.cusinetypes && req.query.cusinetypes.length) {
                        resp = await ManagerService.getCusineTpe(req, val, resp, [])
                    }
                } else if (queryArr.includes("cusinetypes")) {
                    resp = await db.getAllVeg_Lowfare_restro(val);
                    if (req.query.cusinetypes && req.query.cusinetypes.length) {
                        resp = await ManagerService.getCusineTpe(req, val, resp, [])
                    }
                }
            } else {
                resp = await db.getAll_restro();
            }
        } catch (err) {
            console.log("error in allRestaurant service", err);
        }
        return resp;
    },

    allRestaurant_ById: async function (req, res) {
        let resp = [];
        try {
            let request = req.body;
            request.Restaurant_id = req.params.id;
            let resp = await db.gatRestro_ById(request);
            return resp;
        } catch (err) {
            res.status(500).send([{ msg: "NO Restraurant Available" }])
            console.log("error in allRestaurant_ById service", err);
        }
        return resp;
    },

    addRestaurant: async function (req, res) {
        try {
            let obj = {};
            obj.Restaurant_id = uuid.v1();
            obj.Restaurant_name = req.body.restaurant_name;
            obj.Address = req.body.address;
            obj.vegOnly = req.body.vegonly;
            obj.Cost = req.body.cost;
            obj.cusineTypes = JSON.stringify(req.body.cusinetypes);
            obj.isOpen = req.body.isopen ? 1 : 0;
            console.log(obj);
            let resp = await db.postData_restro({
                Restaurant_id: obj.Restaurant_id,
                Restaurant_name: obj.Restaurant_name,
                Address: obj.Address,
                vegOnly: obj.vegOnly,
                Cost: obj.Cost,
                cusineTypes: obj.cusineTypes,
                isOpen: obj.isOpen
            }).then(() => res.status(200).json([obj])).catch((err) => res.status(201).send(err));
            return resp;
            //then(() => res.status(200).json(obj)).catch((err) => res.status(201).send(err));
        } catch (error) {
            res.status(500).send(err);
            console.log("error in addRestaurant service", error);
        }
    },

    updateRestaurant: async function (req, res) {
        try {
            let request = req.body;
            request.Restaurant_id = req.params.id;
            let resp = await db.updateRestro(request);
            return resp;
        } catch (error) {
            console.log("error in updateRestaurant service", error);
        }
    },

    deleteRestaurant: async function (req, res) {
        try {
            let request = req.body;
            request.Restaurant_id = req.params.id;
            let resp = await db.deleteRestro(request)
            return resp;
        } catch (error) {
            console.log("error in deleteRestaurant service", error);
        }
    },

    allVeg_Restro: async function (req, res) {
        let val = {};
        val.vegOnly = 1;
        let resp;
        let queryArr = await ManagerService.allQuery(req, res);
        // console.log("query-----", queryArr);
        if (queryArr && queryArr.length) {
            if (queryArr.includes("cost") || (queryArr.includes("cusinetypes") && queryArr.includes("cost"))) {
                val.Cost = req.query.cost;
                if (val.Cost.includes("|")) {
                    val.Cost = val.Cost.split("|")
                } else {
                    val.Cost = [req.query.cost]
                }
                resp = await db.getAllVeg_Lowfare_restro(val);
                if (req.query.cusinetypes && req.query.cusinetypes.length) {
                    resp = await ManagerService.getCusineTpe(req, val, resp, [])
                }
            }
        } else {
            resp = await db.getAllVeg_restro(val)
        }
        if (resp && resp.length) {
            res.status(200).json(resp);
        } else {
            res.status(201).send({ msg: "No Veg Restaurant Available" })
        }
    },

    getCusineTpe: async function (req, val, response, resp) {

        val.cusineTypes = req.query.cusinetypes
        if (val.cusineTypes.includes("|")) {
            val.cusineTypes = val.cusineTypes.split("|")
        } else if (val.cusineTypes.length && Array.isArray(val.cusineTypes)) {
            val.operator = "AND";
            val.cusineTypes = req.query.cusinetypes
        } else {

            val.cusineTypes = [req.query.cusinetypes]
        }
        // console.log(val.cusineTypes)
        if (val.cusineTypes && val.cusineTypes.length) {
            let count = 0;
            if (val.operator == "AND") {
                if (response && response.length) {
                    response.forEach((res, r) => {
                        val.cusineTypes.forEach(elem => {

                            if (!resp.includes(res)) {
                                let cusinetypes = JSON.parse(res.cusineTypes);
                                if (cusinetypes.includes(elem)) count++;
                            }
                            if (count == val.cusineTypes.length) {
                                console.log("count----------------->", count);
                                resp.push(res);
                                count = 0
                            } else if (val.cusineTypes.length - 1 == r) {
                                count = 0
                            }
                        })
                    })
                }
            } else {
                val.cusineTypes.forEach((elem) => {
                    if (response && response.length) {
                        response.forEach((res, r) => {
                            console.log("cusineTypes_out" + r, JSON.parse(res.cusineTypes));
                            if (JSON.parse(res.cusineTypes).includes(elem) && !resp.includes(res)) {
                                // console.log("cusineTypes_" + r, JSON.parse(res.cusineTypes));
                                resp.push(res)
                            }
                        })
                    }
                })
            }
        };

        console.log(resp.length);
        return resp;
    },

    allQuery: async function (req, res) {
        let queryArr = [];
        if (Object.keys(req.query).length) {
            for (let q in req.query) {
                queryArr.push(q)
            }
        };
        return queryArr;
    }
}

module.exports = ManagerService