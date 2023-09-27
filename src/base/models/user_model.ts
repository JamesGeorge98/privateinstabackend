export class UserModel {
    first_name?: string;
    last_name?: string;
    user_name?: string;
    uuid?: string;
    phone_number?: string;
    email?: string;

    constructor(params: { first_name?: string, last_name?: string, user_name?: string, email?: string, uuid?: string, phone_number?: string }) {
        const { first_name, email, last_name, phone_number, uuid, user_name } = params;
        this.first_name = first_name; this.last_name = last_name, this.user_name = user_name, this.email = email, this.uuid = uuid, this.phone_number = phone_number;


    }


    public checkForUndefinedValues(): boolean | string {
        if (!this.first_name) {
            return "first name cannot be empty";
        }
        if (!this.last_name) {
            return "last name cannot be empty";
        }
        if (!this.email) {
            return "email cannot be empty";
        }
        if (!this.phone_number) {
            return "phone number cannot be empty";
        }
        if (!this.user_name) {
            return "user name cannot be empty";
        }
        return false;
    }




};

