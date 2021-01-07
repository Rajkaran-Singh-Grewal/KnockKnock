export class CreateUserDto{
    private username: string;
    private email: string;
    private password: string;
    private sessionid: string;
    getUsername(): string{
        return this.username;
    }
    setUsername(username: string){
        this.username = username;
    }
    getEmail(): string{
        return this.email;
    }
    setEmail(email: string){
        this.email = email;
    }
    getPassword(): string{
        return this.password;
    }
    setPassword(password:string){
        this.password = password;
    }
    getSessionId(): string{
        return this.sessionid;
    }
    setSessionId(sessionid: string){
        this.sessionid = sessionid;
    }
    setAll(username: string, email: string, password: string, sessionid: string){
        this.username = username;
        this.email = email;
        this.password = password;
        this.sessionid = sessionid;
    }
}