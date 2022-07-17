/**
    * @description      : 
    * @author           : manojyadav
    * @group            : 
    * @created          : 17/07/2022 - 15:40:43
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/07/2022
    * - Author          : manojyadav
    * - Modification    : 
**/
const { validationResult, checkSchema } = require('express-validator');


const postValidateObj = {
    restaurant_name: {
        not: true,
        isEmpty: true,
        exists: true
    },
    address: {
        not: true,
        isEmpty: true,
        exists: true
    },
    vegonly: {
        isBoolean: true,
        exists: true
    },
    cost: {
        isIn: {
            options: [["low", "medium", "high"]]
        },
        exists: true
    },
    isopen: {
        isBoolean: true,
        exists: true
    },

    cusinetypes: {
        isArray: true,
        exists: true
    }
}

const postValidate = [
    checkSchema(postValidateObj),
    async function (req, res, next) {
        try {
            var errorValidation = validationResult(req);
            if (!errorValidation.isEmpty()) {
                throw new Error(getErrorMsg(errorValidation.array().pop().param, errorValidation.array().pop().value));
            }
            next();
        } catch (error) {
            return res.status(400).json({msg:error.message});
        }
    }
]
function getErrorMsg(key, exists) {
    if (exists) return "Invalid '" + key + "'";
    return "'" + key + "' is required";
}

module.exports = {
    postValidate
}

