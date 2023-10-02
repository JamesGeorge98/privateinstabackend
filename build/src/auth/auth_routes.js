"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sign_up_controller_1 = __importDefault(require("./controllers/sign_up_controller"));
const sign_in_controller_1 = __importDefault(require("./controllers/sign_in_controller"));
const validations_1 = require("../utils/validations"); // Adjust the import path as needed
const router = (0, express_1.Router)();
router.get('/:username', sign_up_controller_1.default.SignUpController.isUserNameAvaliable);
router.post('/signup', validations_1.Validator.signUpValidation, sign_up_controller_1.default.SignUpController.signUpUser);
router.post('/signin', validations_1.Validator.sigInValidation, sign_in_controller_1.default.SignInController.signInUser);
exports.default = { router };
