import { Account, SessionToken, TokenGenerator } from "../Server/Model";
import { SessionTokenDbAccess } from "./SessionTokenDbAccess";
import { UserCredentialsDBAccess } from "./UserCredentialsDBAccess";

export class Authorizer implements TokenGenerator {

    private userCredentialDbAccess: UserCredentialsDBAccess = new UserCredentialsDBAccess();
    private sessionTokenDbAccess: SessionTokenDbAccess = new SessionTokenDbAccess();
    
    async generateToken(account: Account): Promise<SessionToken | undefined> {
        try {
            const resultAccount = await this.userCredentialDbAccess.getUserCredential(account.username, account.password);
            if (resultAccount) {
                const token: SessionToken = {
                    accessRights: resultAccount.accessRights,
                    username: resultAccount.username,
                    valid: true,
                    expirationTime: this.generateExpirationTime(),
                    tokenId: this.generateRandomTokenId()
                };

                await this.sessionTokenDbAccess.storeSessionToken(token);
                return token;

            } else {
                return undefined;
            }
        } catch (error) {
            throw new Error(`The error is ${error.message}`);
        }
    }

    private generateExpirationTime(): Date {
        return new Date(Date.now() + 60*60*1000);
    }

    private generateRandomTokenId(): string {
        return Math.random().toString(36).slice(2);
    }

}