import { Response } from 'express'
import { getTempFilename } from 'express-fileupload/lib/utilities.js'
import fs from 'fs'
import cloudinary from 'cloudinary'
import config from 'config'

// @ts-ignore
cloudinary.config({
    cloud_name: config.get<string>('cloud_name'),
    api_key: config.get<number>('cloud_api_key'),
    api_secret: config.get<string>('cloud_api_secret'),
})

export const uploadImages = async (req, res: Response) => {
    try {
        const { path } = req.body
        console.log('PATH', path)
        let files = Object.values(req.files).flat()
        let images = []
        for (const file of files) {
            const url = await uploadToCloudinary(file, path)
            images.push(url)
            // @ts-ignore
            removeTmp(file.tempFilePath)
        }

        res.json(images)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const uploadToCloudinary = async (file, path) => {
    return new Promise((resolve) => {
        cloudinary.v2.uploader.upload(
            file.tempFilePath,
            {
                folder: path,
            },
            (err, res) => {
                if (err) {
                    // @ts-ignore
                    removeTmp(file, tempFilePath)
                    return res
                        .status(400)
                        .json({ message: 'upload image failed' })
                }
                resolve({
                    url: res.secure_url,
                })
            }
        )
    })
}
const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if (err) throw err
    })
}

export const listImages = async (req, res) => {
    try {
        const { path, sort, max } = req.body

        cloudinary.v2.search
            .expression(`${path}`)
            .sort_by('created_at', sort)
            .max_results(max)
            .execute()
            .then((result) => {
                res.json(result)
            })
            .catch((err) => {
                console.log(err.error.message)
            })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
