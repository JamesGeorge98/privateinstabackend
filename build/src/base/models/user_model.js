"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
class UserModel {
    constructor({ first_name, last_name, user_name, email, uuid, phone_number }) {
        this.first_name = first_name;
        this.last_name = last_name, this.user_name = user_name, this.email = email, this.uuid = uuid, this.phone_number = phone_number;
    }
}
exports.UserModel = UserModel;
;
