import pool from '../../db';
import queries from './insta_user_queries';
import { InstaUserModel } from './insta_user_model';
import { Request, Response } from 'express';





class InstaUserController {
 
    getUsers = async (req: Request, res: Response) => {
        var fdata : InstaUserModel[] = [];
        var username = req.params.username;
       var j =  pool.query<InstaUserModel>(`SELECT user_name FROM insta_users WHERE user_name = '${username}'`, (error, results) => {
            if (error) {
                console.log(error);
                res.status(204).json("Something Went Wrong");
            }
            
            for (let i of results.rows) {
                const data = new InstaUserModel(i);
                fdata.push(data);
            }   
            res.status(200).json(fdata)
        });
        console.log(fdata);
    };



}




export default { InstaUserController };
