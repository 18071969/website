'use strict';

/**
 * newsletter controller


const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::newsletter.newsletter');
 */


const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::newsletter.newsletter', ({ strapi }) =>  ({
  
  async customAction(ctx) {
    try {
        ctx.body = 'OKAY';
    } catch(err){
        ctx.body = err;
    }
  },

  async customCreateAction(ctx) {
    //console.log('CONTROLLER NEWSLETTER ctx = ', ctx);
    /*try {
        ctx.body = {
            data: {
              email: 'abv333333@abv.bg',
            },
          };
    } catch(err){
        ctx.body = err;
    }
    //let entity = await strapi.services('api::newsletter.newsletter').create(ctx.request.body);
    //console.log('CONTROLLER NEWSLETTER entity = ', entity);*/
    //const sanitizedQueryParams = await this.sanitizeQuery(ctx);
    console.log('CONTROLLER NEWSLETTER ctx.request.body = ', ctx.request.body);
    //const entity = await strapi.entityService.create('api::newsletter.newsletter', ctx.request.body);
    const entity = strapi.entityService.create('api::newsletter.newsletter', ctx.request.body)
    .then(response => response.json())
    .then(data => {
      console.log('CONTROLLER NEWSLETTER GGGGGGGGGGGGGGGGGGGGGGGGG data ', data)
    })
    .catch(err => console.log('CONTROLLER NEWSLETTER GGGGGGGGGGGGGGGGGGGGGGGGG err ', err))
 
    
    //const { entity } = await strapi.service('api::newsletter.newsletter').create(sanitizedQueryParams);
    console.log('CONTROLLER NEWSLETTER entity = ', entity);
    //const sanitizedResults = await this.sanitizeOutput(entity, ctx);
    //return this.transformResponse(sanitizedResults);
    //return sanitizeEntity(entity);
    return entity;
  }

}));