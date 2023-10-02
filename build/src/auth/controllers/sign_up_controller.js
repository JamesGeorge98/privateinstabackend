"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../../db"));
const auth_queries_1 = __importDefault(require("../auth_queries"));
const helper_1 = __importDefault(require("../../utils/helper"));
const jwt_1 = __importDefault(require("../../utils/jwt"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class SignUpController {
}
_a = SignUpController;
// checking wether the user already exists in the databse 
SignUpController.isUserNameAvaliable = (req, res) => {
    // list of string
    var randomUserName = [];
    // fetching username from url
    var username = req.params.username;
    // default response
    var response = {
        status: false,
        message: "Username is available"
    };
    try {
        // qureying thourth the usertable
        db_1.default.query(`${auth_queries_1.default.findOneUserName} = '${username}'`, (error, results) => {
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
                    randomUserName.push(`${username}${helper_1.default.getRandomRangedNumber(9999, 10)}`);
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
    }
    catch (error) {
        console.log(error);
        response.status = false;
        response.message = "Internal Server Error";
        return res.status(500).json(response);
    }
};
SignUpController.signUpUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    // default response
    var response = {
        status: false,
        message: "Something went wrong"
    };
    try {
        // converting req body to model
        var request = req.body;
        const hashedPassword = yield bcrypt_1.default.hash((_b = request.password) !== null && _b !== void 0 ? _b : "password123", 10);
        const values = [request.user_name, request.first_name, request.last_name, request.email, request.phone_number, hashedPassword];
        db_1.default.query(auth_queries_1.default.createUser, values, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
            var _c;
            if (error) {
                console.log(error);
                response = {
                    status: false,
                    message: "Something Went Wrong"
                };
                return res.status(500).json(response);
            }
            if (result.rows.length > 0) {
                jwt_1.default.createToken((_c = result.rows[0].uuid) !== null && _c !== void 0 ? _c : "default");
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
        }));
    }
    catch (error) {
        console.log(error);
        response.status = false;
        response.message = "Internal Server Error";
        return res.status(500).json(response);
    }
});
exports.default = { SignUpController };
