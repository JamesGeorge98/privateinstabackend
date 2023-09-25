import pool from '../../db';
import queries from './insta_user_queries';
import { InstaUserModel } from './insta_user_model';
import { Request, Response } from 'express';





class InstaUserController {



    userData: InstaUserModel[] = [];

    getUsers = async (req: Request, res: Response) => {
        var username = req.params.username;
        pool.query<InstaUserModel>(`SELECT user_name FROM insta_users WHERE user_name = '${username}'`, (error, results) => {
            console.log(results);
            if (error) {
                console.log(error);
                res.send("doest not exists");
            }

            for (let i of results.rows) {
                const data = new InstaUserModel(i);
                this.userData.push(data);
            }
            res.send(this.userData)
        });
    };

}




export default { InstaUserController };
