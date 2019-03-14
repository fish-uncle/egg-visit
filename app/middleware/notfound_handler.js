'use strict';
const html = require('../../util/html');
const json = require('../../util/json');

module.exports = () => {
  return async function notFoundHandler(ctx, next) {
    await next();
    const {visit} = ctx.app.config;
    const {error} = visit;
    if (ctx.status === 404 && !ctx.body) {
      if (ctx.request.acceptJson) {
        let errorJson = json['404'](error);
        ctx.body = JSON.stringify(errorJson);
      } else {
        if (error['404'] && error['404']['html']) {
          return ctx.redirect(error['404'].html);
        }
        ctx.body = html['404']('', 404);
      }
    }
  };
};