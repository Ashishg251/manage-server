import { IncomingMessage, ServerResponse } from "http";
import { AccessRights, HTTP_CODES, HTTP_METHODS, User } from "../Shared/Model";
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
            case HTTP_METHODS.PUT:
                await this.handlePut();
                break;
            default:
                this.handleNotFound();
                break;
        }
    }

    private async handlePut() {
        try {
            const operationAuthorized = await this.operationAuthorized(AccessRights.CREATE);
            if(operationAuthorized) {
                const user: User = await this.getRequestBody();
                await this.userDbAccess.putUser(user);
                this.respondText(HTTP_CODES.CREATED, `user ${user.name} is created`);
            } else {
                this.respondUnauthorizedRequest('missing or invalid authentication');
            }
        } catch (error) {
            this.respondBadRequest(`Error: ${error.message}`);
        }
    }
    
    private async handleGet() {
        try {
            const operationAuthorized = await this.operationAuthorized(AccessRights.READ);
            if(operationAuthorized) {
                const parsedUrl = Utils.getUrlParams(this.req.url);
                if (parsedUrl?.query.id) {
                    const user = await this.userDbAccess.getUserById(parsedUrl?.query.id as string);
                    if (user) {
                        this.respondJsonObject(HTTP_CODES.OK, user);
                    } else {
                        this.handleNotFound();
                    }
                } else if(parsedUrl?.query.name) {
                    const users = await this.userDbAccess.getUserByName(parsedUrl?.query.name as string);
                    this.respondJsonObject(HTTP_CODES.OK, users);
                } else {
                    this.respondBadRequest('User ID or Name is not present in request');
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