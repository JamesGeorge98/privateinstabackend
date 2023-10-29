import { PIORM } from "../../../db";

class UserModel {
    first_name?: string;
    last_name?: string;
    user_name?: string;
    uuid?: string;
    phone_number?: string;
    email?: string;
    password?: string;

    orm:PIORM = new PIORM();

    constructor(params: { first_name?: string, last_name?: string, user_name?: string, email?: string, uuid?: string, phone_number?: string, password?: string }) {
        const { first_name, email, last_name, phone_number, uuid, user_name, password } = params;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.user_name = user_name;
        this.email = email;
        this.uuid = uuid;
        this.phone_number = phone_number;
    }

    

};

export { UserModel}