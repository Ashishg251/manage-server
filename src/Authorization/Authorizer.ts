import { Account, SessionToken, TokenGenerator } from "../Server/Model";
import { UserCredentialsDBAccess } from "./UserCredentialsDBAccess";

export class Authorizer implements TokenGenerator {

    private userCredentialDbAccess: UserCredentialsDBAccess = new UserCredentialsDBAccess();
    
    async generateToken(account: Account): Promise<SessionToken | undefined> {
        try {
            const resultAccount = await this.userCredentialDbAccess.getUserCredential(account.username, account.password);
            if (resultAccount) {
                return {
                    tokenId: 'Valid Token'
                }
            } else {
                return undefined;
            }
        } catch (error) {
            throw new Error(`The error is ${error.message}`);
        }
    }

}