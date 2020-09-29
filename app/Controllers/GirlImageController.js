const { writeFile, existsSync, mkdirSync } = require('fs')
const { v4: uuid } = require('uuid')
const sharp = require('sharp')
const imagemin = require('imagemin')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')
const jimp = require('jimp')

module.exports.uploadGirlImage = async (req, res) => {
	const { file } = req.body
	const extension = file.split('/')[1].split(';')[0]
	const base64 = file.split(',')[1]
	const bitmap = new Buffer.from(base64, 'base64')
	const filename = `${uuid()}.${extension}`

	createDirIfDoesntExists('storage')

	const resizedBuffer = await sharp(bitmap).resize(1280, 1280, { fit: 'inside' }).toBuffer()

	const imageJimp = await jimp.read(resizedBuffer)
	const watermarkJimp = await jimp.read('resources/images/watermark.png')

	const xCenter = Math.floor((imageJimp.bitmap.width - watermarkJimp.bitmap.width) / 2)
	const yCenter = Math.floor((imageJimp.bitmap.height - watermarkJimp.bitmap.height) / 2)

	watermarkJimp.opacity(.75)
	imageJimp.composite(watermarkJimp, xCenter, yCenter, { mode: jimp.BLEND_SOURCE_OVER })

	const resizedWithWatermark = await imageJimp.getBufferAsync(jimp.MIME_PNG)

	const compressedBuffer = await imagemin.buffer(resizedWithWatermark, {
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