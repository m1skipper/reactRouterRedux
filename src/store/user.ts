export default class User {
    public userName: string;
    public email: string;
    public password: string;
    public doMailing: boolean;

    constructor(email: string = "", password: string = "") {
        this.userName = "";
        this.email = email;
        this.password = password;
        this.doMailing = true;
      }
}