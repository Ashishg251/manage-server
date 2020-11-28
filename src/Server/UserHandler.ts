import { IncomingMessage, ServerResponse } from "http";
import { HTTP_CODES, HTTP_METHODS } from "../Shared/Model";
import { UserDbAccess } from "../User/UserDBAccess";
import { BaseRequestHandler } from "./BaseRequestHandler";
import { Utils } from "./Utils";

export class UserHandler extends BaseRequestHandler {

    private userDbAccess: UserDbAccess = new UserDbAccess();

    constructor(req: IncomingMessage, res: ServerResponse) {
        super(req, res);
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
        console.log(`queryId = ${parsedUrl?.query.id}`);
    }
}