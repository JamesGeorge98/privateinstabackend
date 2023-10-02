"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../../db"));
const auth_queries_1 = __importDefault(require("../auth_queries"));
const user_model_1 = require("../../base/models/user_model");
const helper_1 = __importDefault(require("../../utils/helper"));
// import JWTToken from '../../utils/jwt';
class SignInController {
}
SignInController.signInUser = (req, res) => {
    // default response 
    var response = {
        status: false,
        message: "Something went wrong"
    };
    try {
        // converting req body to model
        var request = req.body;
        const values = [request.user];
        db_1.default.query(auth_queries_1.default.signIn, values, (error, result) => {
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
                    const resposeModel = new user_model_1.UserModel({ uuid: result.rows[0].uuid, user_name: result.rows[0].user_name });
                    response = {
                        status: true,
                        data: resposeModel,
                        message: "Successfully Logged In"
                    };
                    //JWTToken.makeToken(  result.rows[0].user_name);
                    return res.status(200).json(response);
                }
                else {
                    response = {
                        status: true,
                        data: undefined,
                        message: "Incorrect Password"
                    };
                    return res.status(200).json(response);
                }
            }
            else {
                response = {
                    status: false,
                    data: undefined,
                    message: "User Not Found Please Sign Up"
                };
                return res.status(200).json(response);
            }
        });
    }
    catch (error) {
        console.log(error);
        response.status = false;
        response.message = "Internal Server Error";
        return helper_1.default.sendApiResponse(res, response, 400);
    }
};
exports.default = { SignInController };
