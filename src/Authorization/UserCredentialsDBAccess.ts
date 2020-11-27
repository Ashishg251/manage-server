import { UserCredentials } from "../Shared/Model";
import * as Nedb from 'nedb';

export class UserCredentialsDBAccess {

    private nedb: Nedb;

    constructor() {
        this.nedb = new Nedb('database/UserCredentials.db');
        this.nedb.loadDatabase();
    }

    public async putUserCredential(userCredentials: UserCredentials): Promise<any> {
        return new Promise((resolve, reject)=>[
            this.nedb.insert(userCredentials, (error: Error | null, docs: any)=>{
                if (error) {
                    reject(error);
                } else {
                    resolve(docs);
                }
            })
        ])
    }

    public async getUserCredential(username: string, password: string): Promise<UserCredentials | undefined> {
        throw "";
    }
}