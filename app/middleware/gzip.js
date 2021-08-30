'use strict'
const isJSON = require('koa-is-json')
const zlib = require('zlib')

module.exports = _ => {
	return async function gzip(ctx, next) {
		const { visit } = ctx.app.config
		const { gzip } = visit
		await next()
		// 后续中间件执行完成后将响应体转换成 gzip
		let body = ctx.body
		if (!body) return

		// 支持 options.threshold
		if (gzip.threshold && ctx.length < gzip.threshold) return

		if (isJSON(body)) body = JSON.stringify(body)

		// 设置 gzip body，修正响应头
		const stream = zlib.createGzip()
		stream.end(body)
		ctx.body = stream
		ctx.set('Content-Encoding', 'gzip')
	}
}
