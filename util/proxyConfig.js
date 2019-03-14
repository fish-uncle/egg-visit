'use strict';
const path = require('path');

const middle = async (ctx, next, proxyItem, proxy, method) => {
  await next();
  const {url, app, request} = ctx;
  const {timeout} = proxy;
  const proxyLogger = ctx.getLogger('proxyLogger');
  let result;
  const options = {
    method: method,
    data: request.body,
    timeout: timeout,
    rejectUnauthorized: false,
    dataType: 'json',
    headers: ctx.headers
  };
  try {
    result = await app['curl'](path.join(proxyItem.target, url), options);
    proxyLogger.info(url + ' ---> ' + path.join(proxyItem.target, url) + ' SUCCESS');
    ctx.body = result.data;
    ctx.status = result.status;
  } catch (result) {
    proxyLogger.info(url + ' ---> ' + path.join(proxyItem.target, url) + ' ERROR');
    proxyLogger.info(result);
    app.coreLogger.error(result);
  }
};
module.exports = app => {
  const {router, config} = app;
  const {proxy} = config.visit;
  const {list} = proxy;
  list.map((item) => {
    router.get(item.from, (ctx, next) => {
      return middle(ctx, next, item, proxy, 'get')
    })
  });
  list.map((item) => {
    router.post(item.from, (ctx, next) => {
      return middle(ctx, next, item, proxy, 'post')
    })
  });
  list.map((item) => {
    router.put(item.from, (ctx, next) => {
      return middle(ctx, next, item, proxy, 'put')
    })
  });
  list.map((item) => {
    router.delete(item.from, (ctx, next) => {
      return middle(ctx, next, item, proxy, 'delete')
    })
  });
}