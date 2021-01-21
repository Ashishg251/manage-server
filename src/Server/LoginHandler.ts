import { IncomingMessage, ServerResponse } from "http";
import { HTTP_CODES, HTTP_METHODS } from "../Shared/Model";
import { countInstances } from "../Shared/ObjectsCounter";
import { BaseRequestHandler } from "./BaseRequestHandler";
import { Account, TokenGenerator } from "./Model";

@countInstances
export class LoginHandler extends BaseRequestHandler {
    private tokenGenerator: TokenGenerator;

    public constructor(req: IncomingMessage, res: ServerResponse, tokenGenerator: TokenGenerator) {
        super(req, res);
        this.tokenGenerator = tokenGenerator;
    }

    public async handleRequest(): Promise<void> {
        switch (this.req.method) {
            case HTTP_METHODS.POST:
                await this.handlePost();
                break;
            default:
                this.handleNotFound();
                break;
        }
    }

    private async handlePost() {
        try {
            const body: Account = await this.getRequestBody();
            const sessionToken = await this.tokenGenerator.generateToken(body);
            if (sessionToken) {
                this.respondJsonObject(HTTP_CODES.CREATED, sessionToken);
            } else {
                this.handleNotFound();
            }
        } catch (error) {
            this.respondBadRequest(`Error: ${error.message}`);
        }
    }
}