/**
    * @description      : 
    * @author           : manojyadav
    * @group            : 
    * @created          : 15/07/2022 - 12:45:32
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/07/2022
    * - Author          : manojyadav
    * - Modification    : 
**/
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const config = require("./config.json");
const uuid = require('uuid');
const sequelize = new Sequelize(config.DATABASE.DB_NAME, config.DATABASE.DB_USER, config.DATABASE.DB_PASS, {
    dialect: config.DATABASE.DIALECT
});

module.exports.dbcheck = async function () {
    return new Promise((resolve, reject) => {
        sequelize.authenticate().then((er, connection) => {
            console.log("Database connected sucessfully");
            resolve(true);
        }).catch((err) => {
            console.log(err, " error in database connection");
            reject(er);
        })
    })
}



const restro_table = sequelize.define('restro_table', {
    Restaurant_id: {
        type: Sequelize.UUID,
        primaryKey: true
    },
    Restaurant_name: Sequelize.STRING,
    Address: Sequelize.STRING,
    vegOnly: Sequelize.BOOLEAN,
    Cost: Sequelize.STRING,
    cusineTypes: Sequelize.STRING,
    isOpen: Sequelize.BOOLEAN

}, {
    tableName: 'restro_table'
});

restro_table.sync({ force: false }).then(()=>initial());//initial() use only for 1st for raw data entry in db

async function initial() {
    let rawdata = [
        {
            "Restaurant_id": uuid.v1(),
            "Restaurant_name": "Hotel MK Regency",
            "Address": "Andheri",
            "vegOnly": true,
            "Cost": "low",
            "cusineTypes": '["italian"]',
            "isOpen": false
        },
        {
            "Restaurant_id": uuid.v1(),
            "Restaurant_name": "Hotel Kashmir",
            "Address": "Dadar",
            "vegOnly": true,
            "Cost": "low",
            "cusineTypes": '["italian","panjabi","kashmiri","french"]',
            "isOpen": true
        },
        {
            "Restaurant_id": uuid.v1(),
            "Restaurant_name": "Hotel The Mela",
            "Address": "Powai",
            "vegOnly": false,
            "Cost": "low",
            "cusineTypes": '["south indian","north indian","chinese","italian","french"]',
            "isOpen": true
        },
        {
            "Restaurant_id": uuid.v1(),
            "Restaurant_name": "SaiPrasad ",
            "Address": "Andheri",
            "vegOnly": true,
            "Cost": "low",
            "cusineTypes": '["south indian","north indian","chinese","italian","french"]',
            "isOpen": true
        },
        {
           "Restaurant_id": uuid.v1(),
            "Restaurant_name": "Hotel Taj",
            "Address": "bandra",
            "vegOnly": true,
            "Cost": "high",
            "cusineTypes": '["italian","french","panjabi","north indian"]',
            "isOpen": true
        },
        {
           "Restaurant_id": uuid.v1(),
            "Restaurant_name": "Hotel Panjab",
            "Address": "mahim",
            "vegOnly": true,
            "Cost": "low",
            "cusineTypes": '["french","panjabi","kashmiri"]',
            "isOpen": false
        },
        {
          "Restaurant_id": uuid.v1(),
            "Restaurant_name": "Hotel Bluestar",
            "Address": "Navi Mumbai",
            "vegOnly": true,
            "Cost": "low",
            "cusineTypes": '["panjabi","south indian","italian"]',
            "isOpen": true
        },
        {
            "Restaurant_id": uuid.v1(),
            "Restaurant_name": "Hotel Avenue",
            "Address": "Borivali",
            "vegOnly": true,
            "Cost": "medium",
            "cusineTypes": '["south indian","north indian","chinese","italian","french"]',
            "isOpen": true
        },
        {
            "Restaurant_id": uuid.v1(),
            "Restaurant_name": "Hotel Baba",
            "Address": "Dadar",
            "vegOnly": true,
            "Cost": "high",
            "cusineTypes": '["italian","french","panjabi","french"]',
            "isOpen": true
        },
        {
            "Restaurant_id": uuid.v1(),
            "Restaurant_name": "Hotel MK Regency",
            "Address": "Vashi",
            "vegOnly": true,
            "Cost": "low",
            "cusineTypes": '["panjabi","south indian"]',
            "isOpen": true
        },
        {
            "Restaurant_id": uuid.v1(),
            "Restaurant_name": "Hotel JW Mariot",
            "Address": "Andheri",
            "vegOnly": true,
            "Cost": "high",
            "cusineTypes": '["south indian","north indian","chinese","italian","french"]',
            "isOpen": true
        },
        {
            "Restaurant_id": uuid.v1(),
            "Restaurant_name": "Hotel JK Regency",
            "Address": "mahim",
            "vegOnly": true,
            "Cost": "low",
            "cusineTypes": '["french","thai"]',
            "isOpen": false
        }
    ]
    for (let index = 0; index < rawdata.length; index++) {
        let resp = restro_table.build(rawdata[index]);
        await resp.save();
        
    };
}

module.exports.postData_restro = async function (obj) {
    try {
        let resp = restro_table.build(obj);
        await resp.save();
        return resp;
    } catch (error) {
        console.log(error);

    }
}

module.exports.gatRestro_ById = async function (val) {
    try {
        let resp = restro_table.findOne({ where: { Restaurant_id: val.Restaurant_id } });
        return resp;
    } catch (error) {
        console.log(error);
    }
}

module.exports.getAll_restro = async function () {
    try {
        let resp = restro_table.findAll();
        return resp;
    } catch (error) {
        console.log(error);
    }
}

module.exports.getAllVeg_restro = async function (val) {
    try {
        let resp = restro_table.findAll({ where: { vegOnly: val.vegOnly } });
        return resp;
    } catch (error) {
        console.log(error);
    }

}

module.exports.getAllVeg_Lowfare_restro = async function (val) {
    try {
        // let whereclause; { };
        whereclause = {};
        console.log("val", val);
        if ((val.vegOnly != 'undefied') && (val.vegOnly && (val.vegOnly == 1 || val.vegOnly == 0))) {
            whereclause.vegOnly = {
                [Op.and]: {
                    [Op.eq]: val.vegOnly
                }
            }
        }
        if (val.Cost && val.Cost.length)
            if (val.Cost && val.Cost.length) {
                whereclause.Cost = { [Op.or]: [val.Cost] }
            }

        if (val.cusineTypes && val.cusineTypes.length) {
            whereclause.cusineTypes = { [Op.or]: [val.cusineTypes] }
        }

        console.log("whereclause", whereclause);
        let resp = await restro_table.findAll({
            where: whereclause
        });
        return resp;
    } catch (error) {
        console.log("dbquery error");
        console.log(error);
    }

}

module.exports.updateRestro = async function (val) {
    let obj = {};
    obj.Restaurant_name = val.restaurant_name;
    obj.Address = val.address;
    obj.vegOnly = val.vegonly;
    obj.Cost = val.cost;
    if (val.cusinetypes && val.cusinetypes.length) {
        await restro_table.findOne({ where: { Restaurant_id: val.Restaurant_id } }).then((resp) => {
            console.log("response", resp, typeof resp.dataValues === 'object');
            if (resp && resp.dataValues && typeof resp.dataValues === 'object') {
                resp = resp.toJSON();
                // console.log("resp.cusineTypes", resp.cusineTypes);
                resp = JSON.parse(resp.cusineTypes)
                resp = resp.concat(val.cusinetypes);
                obj.cusineTypes = JSON.stringify(resp)
            }
        })
    }
    // console.log(val);
    let currentdate = new Date();
    obj.updatedAt = currentdate.getDate() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getFullYear() + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds()
    if (val.isopen || val.isopen == false) {
        obj.isOpen = val.isopen ? 1 : 0;
    }
    let response = await restro_table.update(obj, { where: { Restaurant_id: val.Restaurant_id } }).then((result, err) => {
        console.log("updation", result);
        if (result && result[0] === 1) {
            return { msg: "Data Updated Successfully" }
        } else {
            return { msg: "Data Updatation Unsuccessful" }
        }
    }).catch((err) => {
        console.log("error in updaete retaurant DB", err);
        return { msg: "Data Updatation Unsuccessfull" }
    })
    return response;
}

module.exports.deleteRestro = async function (val) {
    return await restro_table.destroy({ where: { Restaurant_id: val.Restaurant_id } }).then(result => {
        console.log(result);
        if (result && result === 1) {
            return { msg: "Data Deleted Successfully" }
        } else {
            return { msg: "Data Not Deleted Successfully" }
        }
    }).catch((err) => {
        console.log("error in delete retaurant DB", err);
        return { msg: "Data Not Deleted Successfully" }
    })
}
