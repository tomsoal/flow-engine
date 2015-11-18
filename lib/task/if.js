"use strict";
const context = require('../context');

module.exports = function (config) {

    return function (req, resp, next, invoke) {
        var ns      = req.ctx;
        var logger  = ns.get('logger');
        logger.info("[if] evaluate the condition: " + config.condition);

        function resume() {
            logger.info("[if] resume the work with: " + arguments[0]);
            next();
        };

        // evaluate the condition statement and execute tasks if condition is true
        if (eval(config.condition)) {
            logger.info("[if] invoke the subflow: " + JSON.stringify(config.execute, undefined, 2));
            invoke(config.execute, resume);
        } else {
            logger.info("[if] skip the subflow: " + JSON.stringify(config.execute, undefined, 2));
            next();
        }
    };
}