import { IncomingMessage, ServerResponse } from "http";
import { HTTP_METHODS } from "../Shared/Model";
import { BaseRequestHandler } from "./BaseRequestHandler";
import { Utils } from "./Utils";

export class UserHandler extends BaseRequestHandler {

    constructor(req: IncomingMessage, res: ServerResponse) {
        super(req, res);
    }

    public async handleRequest(): Promise<void> {
        switch (this.req.method) {
            case HTTP_METHODS.GET:
                this.handleGet();
                break;
            default:
                this.handleNotFound();
                break;
        }
    }
    
    private handleGet() {
        const parsedUrl = Utils.getUrlParams(this.req.url);
        console.log(`queryId = ${parsedUrl?.query.id}`);
    }
}