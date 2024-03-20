'use strict';

/**
 * options-panel-general-settings-styling controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::options-panel-general-settings-styling.options-panel-general-settings-styling');
/*
module.exports = createCoreController('api::options-panel-general-settings-styling.options-panel-general-settings-styling', ({ strapi }) =>  ({
  
    async find(ctx) {
      try {
          //ctx.body = 'OKAY';
          console.log('CONTROLLER options-panel-general-settings-styling ctx.request.body = ', ctx.request.body);
      } catch(err){
        console.log('CONTROLLER options-panel-general-settings-styling err = ', err);
        ctx.body = err;
      }
    },
  
  }));*/
