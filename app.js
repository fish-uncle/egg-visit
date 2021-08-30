'use strict'
const chalk = require('chalk')
const { green } = chalk
const onerror = require('koa-onerror')
const html = require('./util/html')
const json = require('./util/json')
const routerConfig = require('./util/routerConfig')
const mockConfig = require('./util/mockConfig')
const proxyConfig = require('./util/proxyConfig')

class AppBootHook {
	constructor(app) {
		this.app = app
	}

	configWillLoad() {
		const { config } = this.app
		const { visit } = config
		const { gzip, access, error, mock, proxy } = visit
		let defaultMiddleware = []
		gzip.enabled ? defaultMiddleware.push('gzip') : void 0
		access.enabled ? defaultMiddleware.push('access') : void 0
		error.enabled ? defaultMiddleware.push('notfoundHandler') : void 0
		error.enabled ? defaultMiddleware.push('errorHandler') : void 0
		mock.enabled ? mockConfig(this.app) : void 0
		proxy.enabled ? proxyConfig(this.app) : void 0
		defaultMiddleware.map(item => {
			const index = config.coreMiddleware.length
			config.coreMiddleware.splice(index, 0, item)
		})
		this.app.coreLogger.info('[egg-visit] visit start success')
	}

	async didLoad() {}

	async willReady() {}

	async didReady() {}

	async serverDidReady() {}

	async beforeClose() {}
}

module.exports = AppBootHook
