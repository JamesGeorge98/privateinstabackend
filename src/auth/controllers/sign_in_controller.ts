import pool from '../../../db';
import queries from '../auth_queries';
import { UserModel } from '../../base/models/user_model';
import { Request, Response } from 'express';
import { ApiResponse } from '../../base/models/base_response';


class SignInController {

    public signInUser = (req: Request, res: Response) => {

        // default response
        var response: ApiResponse<string[] | UserModel> = {
            status: false,
            message: "Something went wrong"
        };

        try {
            // converting req body to model
            var request = req.body as UserModel

            // initiating model
            var model = new UserModel({
                email: request.email,
                password: request.password
            });

            // checking for null values
            var isAnyNullFieldsAreNull = model.checkForUndefinedValuesForSignIn();
            if (isAnyNullFieldsAreNull) {

                // throwing null field error
                response.error = isAnyNullFieldsAreNull as string;
                response.message = undefined;
                return res.status(400).json(response);
            } else {
                const values = [model.email];
                pool.query<UserModel>(queries.signIn, values, (error, result) => {

                    if (error) {
                        console.log(error);
                        response = {
                            status: false,

                            message: "Something Went Wrong"
                        };
                        return res.status(500).json(response);
                    }

                    if (result.rows.length > 0) {
                        if (result.rows[0].password === request.password) {
                            const resposeModel = new UserModel({uuid:result.rows[0].uuid,user_name:result.rows[0].user_name});
                            response = {
                                status: true,
                                data:resposeModel,
                                message: "Successfully Logged In"
                            };
                            return res.status(200).json(response);
                        }
                    } else {
                        response = {
                            status: false,
                            data: undefined,
                            message: "User Not Found Please Sign Up"
                        };
                        return res.status(200).json(response);

                    }
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




export default { SignInController };
