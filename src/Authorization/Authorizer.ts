import { Account, SessionToken, TokenGenerator, TokenRights, TokenState, TokenValidator } from "../Server/Model";
import { SessionTokenDbAccess } from "./SessionTokenDbAccess";
import { UserCredentialsDBAccess } from "./UserCredentialsDbAccess";

export class Authorizer implements TokenGenerator, TokenValidator {

    private userCredentialDbAccess: UserCredentialsDBAccess = new UserCredentialsDBAccess();
    private sessionTokenDbAccess: SessionTokenDbAccess = new SessionTokenDbAccess();
    
    public async generateToken(account: Account): Promise<SessionToken | undefined> {
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

    public async validateToken(tokenId: string): Promise<TokenRights> {
        const token = await this.sessionTokenDbAccess.getSessionToken(tokenId);
        if (!token || !token.valid) {
            return {
                accessRights: [],
                state: TokenState.INVALID
            }
        } else if(token.expirationTime < new Date()) {
            return {
                accessRights: [],
                state: TokenState.EXPIRED
            }
        } else {
            return {
                accessRights: token.accessRights,
                state: TokenState.VALID
            }
        }
    }

}