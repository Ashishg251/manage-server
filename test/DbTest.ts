import { UserCredentialsDBAccess } from "../src/Authorization/UserCredentialsDBAccess";

class DbTest {
    public dbAccess: UserCredentialsDBAccess = new UserCredentialsDBAccess();
}

new DbTest().dbAccess.putUserCredential({
    username: 'user2',
    password: 'password2',
    accessRights: [1, 3, 4]
});