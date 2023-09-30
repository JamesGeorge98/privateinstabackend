import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../base/models/base_response';
import { UserModel } from '../base/models/user_model';


class Validator {

    static response: ApiResponse<string[] | UserModel> = {
        status: false,
        message: "Something went wrong"
    };


    static signUpValidation(req: Request, res: Response, next: NextFunction) {

        Validator.response = {
            status: false,
            message: "At least one field (user_name or email or phone_number) is required"
        };

        var requestData = req.body as UserModel;

        if (!requestData.first_name) {
            Validator.response.message = "first name cannot be empty";
        }
        if (!requestData.last_name) {
            Validator.response.message = "last name cannot be empty";
        }
        if (!requestData.email) {
            Validator.response.message = "email cannot be empty";
        }
        if (!requestData.phone_number) {
            Validator.response.message = "phone number cannot be empty";
        }
        if (!requestData.user_name) {
            Validator.response.message = "user name cannot be empty";
        }
        if (!requestData.password) {
            Validator.response.message = "Password cannot be empty";
        }

        return res.status(400).json(Validator.response);
    }


    static sigInValidation(req: Request, res: Response, next: NextFunction) {

        Validator.response = {
            status: false,
            message: "At least one field (user_name or email or phone_number) is required"
        };

        const { user, password } = req.body;

        if(user){
            if (password ) {
                return next();
            } else {
                Validator.response = {
                    status: false,
                    message: "Password Is required"
                };
            }
        }else{
            Validator.response = {
                status: false,
                message: "username, phonenumber or email Is required"
            };
        }
        


        return res.status(400).json(Validator.response);
    }
}

export { Validator };
