export class UserModel {
    first_name?: string;
    last_name?: string;
    user_name?: string;
    uuid?: string;
    phone_number?: string;
    email?: string;
    password?:string;

    constructor(params: { first_name?: string, last_name?: string, user_name?: string, email?: string, uuid?: string, phone_number?: string ,password? :string}) {
        const { first_name, email, last_name, phone_number, uuid, user_name ,password} = params;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.user_name = user_name;
        this.email = email;
        this.uuid = uuid;
        this.phone_number = phone_number;
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
        if(!this.password){
            return "Password cannot be empty";
        }
        return false;
    }

    public checkForUndefinedValuesForSignIn(): boolean | string {

        // Check if at least one of the specified fields has a value
        if (this.email || this.user_name || this.phone_number) {
          return false;
        }

        if (!this.password) {
          return "Password cannot be empty";
        }
        
        return "At least one field (user_name or email or phone_number) is required";
      }


};

