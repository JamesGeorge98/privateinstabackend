export class InstaUserModel {
    firstname: string;
    lastname: string;
    username: string;
    uuid: string;
    phonenumber: string;
    email: string;

    constructor({ firstname, lastname, email, username, uuid, phonenumber }:{ firstname: string, lastname: string, username: string, email: string, uuid: string, phonenumber: string }) {
        this.firstname = firstname; this.lastname = lastname, this.username = username, this.email = email, this.uuid = uuid, this.phonenumber = phonenumber;
    }

};  