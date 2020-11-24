import { Server } from "./Server/Server";

class Launcher {
    
    // instance variables   
    private name: string;
    private server: Server;

    constructor() {
        this.server = new Server();
    }

    public launchApp() {
        console.log('started app');
        this.server.createServer();

        // the only way to use a private attribute or behavior
        (this.server as any).somePvtLogic()
    }
}

new Launcher().launchApp();