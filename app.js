'use strict';
const chalk = require('chalk');
const {green} = chalk;
const onerror = require('koa-onerror');
const html = require('./util/html');
const json = require('./util/json');
const routerConfig = require('./util/routerConfig');
const mockConfig = require('./util/mockConfig');
const proxyConfig = require('./util/proxyConfig');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    const {config} = this.app;
    const {visit} = config;
    const {gzip, access, error, mock, proxy} = visit;
    let defaultMiddleware = [];
    gzip.enabled ? defaultMiddleware.push('gzip') : void 0;
    access.enabled ? defaultMiddleware.push('access') : void 0;
    error.enabled ? defaultMiddleware.push('notfoundHandler') : void 0;
    mock.enabled ? mockConfig(this.app) : void 0;
    proxy.enabled ? proxyConfig(this.app) : void 0;
    defaultMiddleware.map(item => {
      const index = config.coreMiddleware.length;
      config.coreMiddleware.splice(index, 0, item);
    });
    this.app.coreLogger.info('[egg-visit] visit start success');
  }

  async didLoad() {
    const {router, config} = this.app;
    let check = async (ctx, next) => {
      ctx.body = 'ok';
      await next();
    };
    router.get('/api/check', check);
    router.post('/api/check', check);
    routerConfig(config, this.app);
  }

  async willReady() {

  }

  async didReady() {
    const {config} = this.app;
    const {visit} = config;
    const {error} = visit;
    error.enabled ? onerror(this.app, {
      html: function (err, ctx) {
        this.status = 200;
        if (ctx.request.acceptJson) {
          this.app.coreLogger.error(err);
          ctx.status = 200;
          let errorJson = json['500'](error);
          this.body = JSON.stringify(errorJson);
        } else {
          this.app.coreLogger.error(err);
          if (error && error['500'] && error['500']['html']) {
            return this.redirect(error['500'].html);
          }
          this.body = html['500'](err, 500);
        }
      }
    }) : void 0;
  }

  async serverDidReady() {
    const {config} = this.app;
    console.log(green(`-----------------------------------`));
    console.log(green(`${config.name} Ready Start`));
    console.log(green('env: ') + `${config.env}`);
    console.log(green('port: ') + `${config.cluster.listen.port}`);
    console.log(green('baseDir: ') + `${config.baseDir}`);
    console.log(green('loggerDir: ') + `${config.logger.dir}`);
    console.log(green('staticDir: ') + `${config.static.dir}`);
    console.log(green('viewDir: ') + `${config.view.root}`);
    console.log(green(`-----------------------------------`));
  }

  async beforeClose() {

  }
}

module.exports = AppBootHook;