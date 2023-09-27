"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sign_up_controller_1 = __importDefault(require("./controllers/sign_up_controller"));
const router = (0, express_1.Router)();
const signUpController = new sign_up_controller_1.default.SignUpController();
router.get('/:username', signUpController.isUserNameAvaliable);
exports.default = { router };
