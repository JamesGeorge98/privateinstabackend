import { Request } from 'express'
import multer, { FileFilterCallback , Multer } from 'multer'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const fileStorage = multer.diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        callback: DestinationCallback
    ): void => {
        if (req.body && req.body.id) {
            const customPath = 'uploads/' + req.body.id;
            callback(null, customPath);
        } else {
            callback(new Error('User not authenticated or missing ID'), "null");
        }
        // const customPath = 'uploads/' + request.body.originalname; 
        // callback(null, customPath);
    },

    filename: (
        request: Request, 
        file: Express.Multer.File, 
        callback: FileNameCallback
    ): void => {
        const uniqueFileName = `${Date.now()}-${file.originalname}`; 
        callback(null, uniqueFileName);
    }
})

const fileFilter = (
    request: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
): void => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        callback(null, true)
    } else {
        callback(null, false)
    }
}


const uploadFile: Multer = multer({ storage: fileStorage, fileFilter: fileFilter });

export { uploadFile };