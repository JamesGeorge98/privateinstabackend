import pool from '../../../db';
import queries from '../auth_queries';
import { UserModel } from '../../base/models/user_model';
import { Request, Response } from 'express';
import getRandomRangedNumber from '../../utils/helper'
import { ApiResponse } from '../../base/models/base_response';


class SignUpController {

    // checking wether the user already exists in the databse 
    static isUserNameAvaliable = (req: Request, res: Response) => {
        // list of string
        var randomUserName: string[] = [];

        // fetching username from url
        var username = req.params.username;

        // default response
        var response: ApiResponse<string[]> = {
            status: false,
            message: "Username is available"
        };
        try {
            // qureying thourth the usertable
            pool.query<UserModel>(`${queries.findOneUserName} = '${username}'`, (error, results) => {
                if (error) {
                    console.log(error);
                    response = {
                        status: false,
                        data: randomUserName,
                        message: "Something Went Wrong"
                    };
                    return res.status(500).json(response);
                }

                // if rows is populated then generate random username
                if (results.rows.length > 0) {

                    for (let i = 0; i < 5; i++) {
                        randomUserName.push(`${username}${getRandomRangedNumber.getRandomRangedNumber(9999, 10)}`);
                    }
                    response = {
                        status: true,
                        data: randomUserName,
                        message: "These are some available names"
                    };
                    return res.status(200).json(response);
                }

                // return default reponse
                return res.status(204).json(response);
            });
        } catch (error) {
            console.log(error);
            response.status = false;
            response.message = "Internal Server Error";
            return res.status(500).json(response);
        }



    };


    static signUpUser = (req: Request, res: Response) => {

        // default response
        var response: ApiResponse<string[]> = {
            status: false,
            message: "Something went wrong"
        };

        try {
            // converting req body to model
            var request = req.body as UserModel

            const values = [request.user_name, request.first_name, request.last_name, request.email, request.phone_number, request.password];
            pool.query<UserModel>(queries.createUser, values, (error, result) => {

                if (error) {
                    console.log(error);
                    response = {
                        status: false,
                        
                        message: "Something Went Wrong"
                    };
                    return res.status(500).json(response);
                }

                if (result.rows.length > 0) {
                    response = {
                        status: true,
                        data: undefined,
                        message: "User Signed Up Successfully"
                    };
                    return res.status(201).json(response);
                }
                // response = {
                //     status: false,
                //     data: undefined,
                //     message: "Something Went Wrong"
                // };
                // return res.status(200).json(response);


            });
        } catch (error) {
            console.log(error);
            response.status = false;
            response.message = "Internal Server Error";
            return res.status(500).json(response);
        }

    };

}




export default { SignUpController };
