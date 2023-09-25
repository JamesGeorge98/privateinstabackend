"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../db"));
const queries_1 = __importDefault(require("./queries"));
const getUsers = (_req, res) => {
    db_1.default.query(queries_1.default.allUser, (error, results) => {
        if (error) {
            console.log(error);
            res.json(200).json("something went wrong");
        }
        res.status(200).json(results.rows);
    });
};
exports.default = { getUsers };
