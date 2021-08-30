'use strict'
const fs = require('fs')
const join = require('path').join

function mkdirs(dirpath, callback) {
	fs.exists(dirpath, function (exists) {
		if (exists) {
			if (typeof callback === 'function') {
				callback()
			}
		}
	})
}

function findSync(startPath) {
	let result = []

	function finder(path) {
		try {
			let files = fs.readdirSync(path)
			files.forEach((val, index) => {
				let fPath = join(path, val)
				let stats = fs.statSync(fPath)
				if (stats.isDirectory()) finder(fPath)
				if (stats.isFile()) result.push(fPath)
			})
		} catch (err) {}
	}

	finder(startPath)
	return result
}

module.exports = (config, app) => {
	mkdirs(config.visit.router.dir, _ => {
		let fileNames = findSync(config.visit.router.dir)
		config.visit.router.enabled
			? fileNames.map(item => {
					require(item)(app)
			  })
			: void 0
	})
}
