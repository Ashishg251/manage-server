import { createServer, IncomingMessage, ServerResponse } from 'http'
import { Utils } from './Utils';
export class Server {

    private somePvtLogic() {
        console.log('executing some private logic');
    }

    public createServer() {
        createServer((req: IncomingMessage, res: ServerResponse)=>{
            console.log("Received request from ", req.url);
            const basePath = Utils.getUrlBasePath(req.url);
            res.end()
        }).listen(8080);
        console.log("Server started");
    }
}