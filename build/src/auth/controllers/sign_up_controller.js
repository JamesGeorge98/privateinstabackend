"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../../db"));
const auth_queries_1 = __importDefault(require("../auth_queries"));
class SignUpController {
    constructor() {
        this.isUserNameAvaliable = (req, res) => {
            var username = req.params.username;
            db_1.default.query(`${auth_queries_1.default.findOneUserName} = '${username}'`, (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(204).json("Something Went Wrong");
                }
                if (results.rows.length > 0) {
                    var randomNumber = Math.floor(Math.random() * (4 - 2 + 1) + 2);
                    return res.status(200).json(`${username}${randomNumber}`);
                }
                return res.status(200).json(true);
            });
        };
    }
}
exports.default = { SignUpController };
