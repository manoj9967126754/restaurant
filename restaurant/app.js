/**
    * @description      : 
    * @author           : manojyadav
    * @group            : 
    * @created          : 15/07/2022 - 12:24:47
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/07/2022
    * - Author          : manojyadav
    * - Modification    : 
**/
const server = require('../server');
const router = require('./routes/index');
server.app(router);