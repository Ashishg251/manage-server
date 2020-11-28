import { AccessRights } from "../Shared/Model";

export interface Account {
    username: string;
    password: string;
}

export interface SessionToken {
    tokenId: string;
    username: string;
    valid: boolean;
    expirationTime: Date;
    accessRights: AccessRights[];
}

export enum TokenState {
    VALID,
    INVALID,
    EXPIRED
}

export interface TokenRights {
    accessRights: AccessRights[],
    state: TokenState
}

export interface TokenGenerator {
    generateToken(account: Account): Promise<SessionToken | undefined>
}

export interface TokenValidator {
    validateToken(tokenId: string) : Promise<TokenRights>;
}