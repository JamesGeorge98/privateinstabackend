import { NextFunction, Request, Response, Router} from 'express'
import multer, { FileFilterCallback, Multer } from 'multer'
import fs from 'fs';




type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const fileStorage = multer.diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        callback: DestinationCallback
    ): void => {
        if (req.body && req.body.where && req.body.uuid) {
            const customPath = 'uploads/' + req.body.uuid + '/' + req.body.where;
            if (!fs.existsSync(customPath)) {
                fs.mkdirSync(customPath, { recursive: true });
            }
            req.body.imagePath = customPath;
            callback(null, customPath);
        } else {
            callback(new Error('User not authenticated or missing ID'), "null");
        }
    },

    filename: (
        req: Request,
        file: Express.Multer.File,
        callback: FileNameCallback
    ): void => {
        const uniqueFileName = `${Date.now()}-${file.originalname}`;
        req.body.imageName = uniqueFileName;
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


const multerMiddleWare = (req: Request, res: Response, next: NextFunction): void => {
    uploadFile.single('image')(req, res, (err: any) => {
        console.log(req.body);
        if (err) {

            return res.json({ error: 'Invalid file type' });
        }
        next();
    });
};


const removeFile = (fullPath: string): boolean => {

    if (fs.existsSync(fullPath)) {

        fs.unlinkSync(fullPath);

        return true
    }

    return false
}

const router = Router();

// router.get('/:username',SignUpController.SignUpController.isUserNameAvaliable);



export { multerMiddleWare , removeFile };