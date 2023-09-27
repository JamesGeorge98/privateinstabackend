import pool from '../../../db';
import queries from '../auth_queries';
import { UserModel } from '../../base/models/user_model';
import { Request, Response } from 'express';
import getRandomRangedNumber from '../../utils/random_number'
import { ApiResponse } from '../../base/models/base_response';


class SignUpController {

    // checking wether the user already exists in the databse 
    public isUserNameAvaliable = (req: Request, res: Response) => {
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


    public signUpUser = (req: Request, res: Response) => {

        // default response
        var response: ApiResponse<string[]> = {
            status: false,
            message: "Something went wrong"
        };

        try {
            // converting req body to model
            var request = req.body as UserModel

            // initiating model
            var model = new UserModel({
                user_name: request.user_name,
                email: request.email,
                first_name: request.first_name,
                last_name: request.last_name,
                phone_number: request.phone_number,
                uuid: request.uuid,
                password: request.password
            });

            // checking for null values
            var isAnyNullFieldsAreNull = model.checkForUndefinedValues();
            if (isAnyNullFieldsAreNull) {

                // throwing null field error
                response.error = isAnyNullFieldsAreNull as string;
                response.message = undefined;
                return res.status(400).json(response);
            } else {
                const values = [model.user_name, model.first_name, model.last_name, model.email, model.phone_number,model.password];
                pool.query<UserModel>(queries.createUser, values, (error, result) => {

                    if (error) {
                        console.log(error);
                        response = {
                            status: false,
                       
                            message: "Something Went Wrong"
                        };
                        return res.status(500).json(response);
                    }

                    if(result.rows.length > 0){
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
            }
        } catch (error) {
            console.log(error);
            response.status = false;
            response.message = "Internal Server Error";
            return res.status(500).json(response);
        }

    };

}




export default { SignUpController };
