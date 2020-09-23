const { writeFile, existsSync, mkdirSync } = require('fs')
const { v4: uuid } = require('uuid')
const sharp = require('sharp')
const imagemin = require('imagemin')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')

module.exports.uploadGirlImage = async (req, res) => {
	const { file } = req.body
	const extension = file.split('/')[1].split(';')[0]
	const base64 = file.split(',')[1]
	const bitmap = new Buffer.from(base64, 'base64')
	const filename = `${uuid()}.${extension}`

	createDirIfDoesntExists('storage')

	const resizedBuffer = await sharp(bitmap).resize(1280, 1280, { fit: 'inside', withoutEnlargement: true }).toBuffer()
	const compressedBuffer = await imagemin.buffer(resizedBuffer, {
		plugins: [
			imageminJpegtran(),
			imageminPngquant({ quality: [0.8, 0.9] }),
		],
	})

	writeFile(`storage/${filename}`, compressedBuffer, error => {
		if (error) {
			res.status(500).json(error)
		} else {
			res.json({ filename })
		}
	})
}

const createDirIfDoesntExists = dir => {
	if (!existsSync(dir)) {
		mkdirSync(dir)
	}
}