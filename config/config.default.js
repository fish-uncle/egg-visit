'use strict'
const path = require('path')
module.exports = appInfo => {
	const config = {
		logger: {
			appLogName: `app.log`,
			coreLogName: `core.log`,
			agentLogName: `agent.log`,
			errorLogName: `error.log`,
		},
		customLogger: {
			proxyLogger: {
				file: path.join(appInfo.root, 'logs', appInfo.name, 'proxy.log'),
			},
			scheduleLogger: {
				file: path.join(appInfo.root, 'logs', appInfo.name, 'schedule.log'),
			},
			accessLogger: {
				file: path.join(appInfo.root, 'logs', appInfo.name, 'access.log'),
			},
		},
		visit: {
			proxy: {
				enabled: false,
				timeout: 3000,
				list: [],
			},
			router: {
				enabled: true,
				dir: path.join(appInfo.root, 'app', 'router'),
			},
			mock: {
				dir: path.join(appInfo.root, 'app', 'mock'),
				enabled: true,
			},
			gzip: {
				enabled: true,
				threshold: 1024,
			},
			access: {
				enabled: true,
				ignore: [],
			},
			error: {
				enabled: true,
			},
		},
	}
	return config
}
