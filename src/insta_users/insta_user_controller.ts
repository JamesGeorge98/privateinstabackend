import pool from '../../db';
import queries from './insta_user_queries';
import { InstaUserModel } from './insta_user_model';
import { Request, Response } from 'express';




class InstaUserController {
    private instaUserModel: InstaUserModel[];

    constructor() {
        this.instaUserModel = [];
    }

    createUserModel({ firstname, lastname, username, uuid, phonenumber, email }: InstaUserModel) {
        const usermodel  = new InstaUserModel( {firstname, lastname, username, uuid, phonenumber, email });
    }

    getUsers = (_req: Request, res: Response) => {
        pool.query(queries.allUser, (error, results) => {
            if (error) {
                console.log(error);
                
                // res.json(200).json("something went wrong");
            }
            console.log(results);
            res.status(200).json(results.rows);
        });
    };

}




export default { InstaUserController};
