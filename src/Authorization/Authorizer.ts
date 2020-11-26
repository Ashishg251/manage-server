import { Account, SessionToken, TokenGenerator } from "../Server/Model";

export class Authorizer implements TokenGenerator {
    
    async generateToken(account: Account): Promise<SessionToken | undefined> {
        if(account.username === 'ashishg251' && account.password === 'qwerty') {
            return {
                tokenId: 'Valid Token'
            }
        } else {
            return undefined;
        }
    }

}