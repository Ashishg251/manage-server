import { Server } from "./Server";

class Launcher {
    
    // instance variables   
    name: string;
    server: Server;

    constructor() {
        this.server = new Server();
    }

    launchApp() {
        console.log('started app');
        this.server.createServer();
    }
}

new Launcher().launchApp();