/**
    * @description      : 
    * @author           : manojyadav
    * @group            : 
    * @created          : 15/07/2022 - 11:50:07
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/07/2022
    * - Author          : manojyadav
    * - Modification    : 
**/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./dbconnection');
const config = require("./config.json");
const cors = require("cors");

module.exports.app = async function (router) {
    const PORT = config.HOSTING_PORT;
    var corsOptions = {
        origin: `http://localhost:${PORT}`
    };

    app.use(cors(corsOptions));
    await db.dbcheck();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use('/api/restaurant', router)
    app.listen(PORT, () => {
        console.log(`Server connected succesfully on PORT ${PORT}`);
    })
}