import { IncomingMessage, ServerResponse } from "http";
import { AccessRights, HTTP_CODES, HTTP_METHODS } from "../Shared/Model";
import { UserDbAccess } from "../User/UserDBAccess";
import { BaseRequestHandler } from "./BaseRequestHandler";
import { TokenValidator } from "./Model";
import { Utils } from "./Utils";

export class UserHandler extends BaseRequestHandler {

    private userDbAccess: UserDbAccess = new UserDbAccess();
    private tokenValidator: TokenValidator;

    constructor(req: IncomingMessage, res: ServerResponse, tokenValidator: TokenValidator) {
        super(req, res);
        this.tokenValidator = tokenValidator;
    }

    public async handleRequest(): Promise<void> {
        switch (this.req.method) {
            case HTTP_METHODS.GET:
                await this.handleGet();
                break;
            default:
                this.handleNotFound();
                break;
        }
    }
    
    private async handleGet() {
        try {
            const operationPermission = await this.operationAuthorized(AccessRights.READ);
            if(operationPermission) {
                const parsedUrl = Utils.getUrlParams(this.req.url);
                const userId = parsedUrl?.query.id;
                if (userId) {
                    const user = await this.userDbAccess.getUserById(userId as string);
                    if (user) {
                        this.respondJsonObject(HTTP_CODES.OK, user);
                    } else {
                        this.handleNotFound();
                    }
                } else {
                    this.respondBadRequest('User ID is not present in request');
                }
            } else {
                this.respondUnauthorizedRequest('missing or invalid authentication');
            }
        } catch (error) {
            this.respondBadRequest(`Error: ${error.message}`);
        }
    }

    private async operationAuthorized(operation: AccessRights): Promise<boolean> {
        const tokenId = this.req.headers.authorization;
        if (tokenId) {
            const tokenRights = await this.tokenValidator.validateToken(tokenId);
            if (tokenRights.accessRights.includes(operation)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}