export class InstaUserModel {
    first_name?: string;
    last_name?: string;
    user_name?: string;
    uuid?: string;
    phone_number?: string;
    email?: string;

    constructor({ first_name, last_name, user_name, email, uuid, phone_number }: { first_name?: string, last_name?: string, user_name?: string, email?: string, uuid?: string, phone_number?: string }) {
        this.first_name = first_name; this.last_name = last_name, this.user_name = user_name, this.email = email, this.uuid = uuid, this.phone_number = phone_number;
    }

};  