import { IncomingMessage, ServerResponse } from "http";
import { parse } from "url";
import { HTTP_CODES, HTTP_METHODS } from "../Shared/Model";
import { Handler } from "./Model";
import { Utils } from "./Utils";

export class UserHandler implements Handler {
    private req: IncomingMessage;
    private res: ServerResponse;

    constructor(req: IncomingMessage, res: ServerResponse) {
        this.req = req;
        this.res = res;
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

    private handleNotFound() {
        this.res.statusCode = HTTP_CODES.NOT_FOUND;
        this.res.write('Request not found');
    }
}