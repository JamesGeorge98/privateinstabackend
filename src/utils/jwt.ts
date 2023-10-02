import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


class JWTToken {

    static jwtkey: string = "Doreamon";

    static createToken(username: string): string {
        const token = jwt.sign({ username }, this.jwtkey, { expiresIn: '1h' });
        return token;
    }

    static authenticateToken(req: Request, res: Response, next: NextFunction) {

        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Verify token
        jwt.verify(token, this.jwtkey, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            console.log(user);
            next();
        });
    }

}

export default JWTToken;
