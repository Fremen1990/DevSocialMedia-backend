import fs from 'fs'

export const imageUpload = async (req, res, next) => {
    try {
        // Object values change req to Array, flat reduce one level of array in array
        if (!req.files || Object.values(req.files).flat().length === 0) {
            return res.status(400).json({ message: 'No files selected' })
        }

        let files = Object.values(req.files).flat()

        files.forEach((file) => {
            if (
                // allowed file formats
                // @ts-ignore
                file.mimetype !== 'image/jpeg' &&
                // @ts-ignore
                file.mimetype !== 'image/png' &&
                // @ts-ignore
                file.mimetype !== 'image/gif' &&
                // @ts-ignore
                file.mimetype !== 'image/webp'
            ) {
                // @ts-ignore
                removeTmp(file.tempFilePath)
                return res
                    .status(400)
                    .json({ message: 'Unsupported file format' })
            }
            // Max 5MB file size
            // @ts-ignore
            if (file.size > 1024 * 1024 * 5) {
                // @ts-ignore
                removeTmp(file.tempFilePath)
                return res
                    .status(400)
                    .json({ message: 'Maximum file size id 5MB' })
            }
        })

        next()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if (err) throw err
    })
}
