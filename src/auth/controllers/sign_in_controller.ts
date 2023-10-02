import pool from '../../../db';
import queries from '../auth_queries';
import { Request, Response } from 'express';
import { ApiResponse } from '../../base/models/base_response';
import sendApiResponse from '../../utils/helper'
import { SignInModel } from '../models/sign_in_model';
import bcrypt from 'bcrypt';

// import JWTToken from '../../utils/jwt';


class SignInController {

    static signInUser = async (req: Request, res: Response) => {

        // default response 
        var response: ApiResponse<string[] | SignInModel> = {
            status: false,
            message: "Something went wrong"
        };

        try {
            // converting req body to model
            var request = req.body;

            const values = [request.user];

            const result = await pool.query<SignInModel>(queries.signIn, values);

            if (result.rows.length > 0) {
                if (await bcrypt.compare(request.password, result.rows[0].password ?? "")) {
                    const resposeModel = new SignInModel({
                        uuid: result.rows[0].uuid,
                        user_name: result.rows[0].user_name,
                        jwt_token: result.rows[0].jwt_token,

                    });
                    response = {
                        status: true,
                        data: resposeModel,
                        message: "Successfully Logged In"
                    };
                    return res.status(200).json(response);
                } else {
                    response = {
                        status: true,
                        data: undefined,
                        message: "Incorrect Password"
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

        } catch (error) {
            console.log(error);
            response.status = false;
            response.message = "Internal Server Error";
            return sendApiResponse.sendApiResponse(res, response, 400);

        }

    };

}


export default { SignInController };


