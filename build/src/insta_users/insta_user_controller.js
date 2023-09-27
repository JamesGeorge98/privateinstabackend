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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../db"));
const insta_user_model_1 = require("./insta_user_model");
class InstaUserController {
    constructor() {
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var fdata = [];
            var username = req.params.username;
            var j = db_1.default.query(`SELECT user_name FROM insta_users WHERE user_name = '${username}'`, (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(204).json("Something Went Wrong");
                }
                for (let i of results.rows) {
                    const data = new insta_user_model_1.InstaUserModel(i);
                    fdata.push(data);
                }
                res.status(200).json(fdata);
            });
            console.log(fdata);
        });
    }
}
exports.default = { InstaUserController };
