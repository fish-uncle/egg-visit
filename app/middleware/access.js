'use strict'
const path = require('path')
const util = require('util')

module.exports = _ => {
	return async function (ctx, next) {
		const { visit } = ctx.app.config
		const skipExt = visit.access.ignore
		const start = new Date().getTime()
		const accessLogger = ctx.getLogger('accessLogger')
		await next()
		const rs = Math.ceil(new Date().getTime() - start)
		ctx.set('X-Response-Time', rs)
		const ext = path.extname(ctx.url).toLocaleLowerCase()
		const isSkip = skipExt.indexOf(ext) !== -1 && ctx.status < 400
		if (!isSkip) {
			const ip = ctx.get('X-Real-IP') || ctx.ip
			const port = ctx.get('X-Real-Port')
			const protocol = ctx.protocol.toUpperCase()
			const method = ctx.method
			const url = ctx.url
			const status = ctx.status
			const length = ctx.length || '-'
			const referrer = ctx.get('referrer') || '-'
			const ua = ctx.get('user-agent') || '-'
			const serverTime = ctx.response.get('X-Server-Response-Time') || '-'
			const message = util.format(
				'%s:%s - %s %s %s/%s %s %s %s %s %s',
				ip,
				port,
				method,
				url,
				protocol,
				status,
				length,
				referrer,
				rs,
				serverTime,
				ua,
			)
			accessLogger.info(message)
			const query = JSON.stringify(ctx.query),
				body = JSON.stringify(ctx.request.body)
			if (query !== '{}' || body !== '{}') {
				accessLogger.info('query - ' + query + ' body - ' + body)
			}
		}
	}
}
