import { UserCredentialsDBAccess } from "../Authorization/UserCredentialsDbAccess";
import { UserDbAccess } from "../User/UserDBAccess";

class DbTest {
    public dbAccess: UserCredentialsDBAccess = new UserCredentialsDBAccess();
    public userDbAccess: UserDbAccess = new UserDbAccess();
}

// new DbTest().dbAccess.putUserCredential({
//     username: 'user2',
//     password: 'password2',
//     accessRights: [1, 3, 4]
// });

new DbTest().userDbAccess.putUser({
    name: 'John Doe',
    age: 29,
    email: 'johndoe@example.com',
    id: 'john@doe251',
    workingPosition: 3
});