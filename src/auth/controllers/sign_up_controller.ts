import pool from '../../../db';
import queries from '../auth_queries';
import { UserModel } from '../../base/models/user_model';
import { Request, Response } from 'express';
import getRandomRangedNumber from '../../utils/helper'
import { ApiResponse } from '../../base/models/base_response';
import JWTToken from '../../utils/jwt';
import bcrypt from 'bcrypt';



class SignUpController {

    // checking wether the user already exists in the databse 
    static isUserNameAvaliable = async (req: Request, res: Response) => {
        // list of string
        var randomUserName: string[] = [];

        // default response
        var response: ApiResponse<string[]> = {
            status: false,
            message: "Username is available"
        };

        try {

            // fetching username from url
            var username = req.params.username;

            const results = await pool.query<UserModel>(`${queries.findOneUserName} '${username}%'`);

            const similarNames: (string | undefined)[] = results.rows.map(s => (s.user_name));

            if (results.rows.length > 0) {

                // if rows is populated then generate random username
                for (let i = 0; i < 5; i++) {
                    const randomNames = `${username}${getRandomRangedNumber.getRandomRangedNumber(9999, 10)}`;
                    if (!similarNames.includes(randomNames)) {
                        randomUserName.push(randomNames);
                    }
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



        } catch (error) {
            console.log(error);
            response.status = false;
            response.message = "Internal Server Error";
            return res.status(500).json(response);
        }
    };


    static signUpUser = async (req: Request, res: Response) => {

        // default response
        var response: ApiResponse<string[]> = {
            status: false,
            message: "Something went wrong"
        };

        try {
            // converting req body to model
            var request = req.body as UserModel

            const hashedPassword = await bcrypt.hash(request.password ?? "password123", 10);

            const dateObject = new Date();

            const values = [request.user_name, request.first_name, request.last_name, request.email, request.phone_number, hashedPassword, dateObject, dateObject];

            const result = await pool.query<UserModel>(queries.createUser, values);

            if (result.rows.length > 0) {

                const token = JWTToken.createToken(result.rows[0].uuid ?? "default");

                //await pool.query(queries.addToken, [token, result.rows[0].user_name]);

                response = {
                    status: true,
                    data: undefined,
                    message: "User Signed Up Successfully"
                };

                return res.status(201).json(response);
            }

        } catch (error) {
            console.log(error);
            response.status = false;
            response.message = "Internal Server Error";
            return res.status(500).json(response);
        }

    };



    static uploadProfileImage = async (req: Request, res: Response) => {

        // default response
        var response: ApiResponse<string[]> = {
            status: false,
            message: "Something went wrong"
        };

        console.log(req.body);

        try {

            const name = req.body.imagename;

            console.log(name);

            res.json({ message: 'Image uploaded successfully' });
        } catch (error) {
            console.log(error);
            response.status = false;
            response.message = "Internal Server Error";
            return res.status(500).json(response);
        }

    };




}




export default { SignUpController };
