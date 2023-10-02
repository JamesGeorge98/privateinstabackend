"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
class UserModel {
    constructor(params) {
        const { first_name, email, last_name, phone_number, uuid, user_name, password } = params;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.user_name = user_name;
        this.email = email;
        this.uuid = uuid;
        this.phone_number = phone_number;
    }
}
exports.UserModel = UserModel;
;
