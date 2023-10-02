export class SignInModel {
    user?: string;
    user_name?: string;
    uuid?: string;
    jwt_token?: string;
    password?: string;

    constructor(params: { user? : string , jwt_token? : string, user_name?: string,  uuid?: string, password?: string }) {
        const { user, jwt_token, uuid, user_name, password } = params;
        this.password = password;
        this.jwt_token = jwt_token;
        this.user = user;
        this.user_name = user_name;
        this.uuid = uuid;
    }

};