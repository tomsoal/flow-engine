'use strict';

module.exports = function (config) {

    return function (props, context, flow) {
        var logger = flow.logger;
        logger.info('execute subscribe-throw task');

        var eh = function(event, next) {
            context.set('verify-me', 'ev-throw');
            throw new Error('throw error');
        };
        var events = props.event.split(',');
        events.forEach(function (event) {
            flow.subscribe(event, eh);
        });
        flow.proceed();
    };
};