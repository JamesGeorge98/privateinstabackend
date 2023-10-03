import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


class JWTToken {

    static jwtkey: string = "Doreamon";

    static createToken(uuid: string): string {
        const token = jwt.sign({ uuid }, process.env.ACCESS_TOKEN as any, { expiresIn: '1h' });
        return token;
    }

    static authenticateToken(req: Request, res: Response, next: NextFunction) {

        const token = req.headers.authorization?.split(' ')[1];


        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Verify token 
        jwt.verify(token, process.env.ACCESS_TOKEN as any, (err : any, user : any) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            console.log(user);
            next();
        });
    }

}

export default JWTToken;
