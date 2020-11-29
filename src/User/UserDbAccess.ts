import * as Nedb from 'nedb';
import { User } from '../Shared/Model';

export class UserDbAccess {
    private nedb: Nedb;

    constructor() {
        this.nedb = new Nedb('database/Users.db');
        this.nedb.loadDatabase();
    }

    public async putUser(user: User): Promise<void> {
        if(!user.id) {
            user.id = this.generateUserId();
        }
        return new Promise((resolve, reject)=>{
            this.nedb.insert(user, (err: Error | null)=>{
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        })
    }

    public async getUserById(userId: string): Promise<User | undefined> {
        return new Promise((resolve, reject)=>{
            this.nedb.find({id: userId}, (err: Error, docs: any[])=>{
                if (err) {
                    reject(err);
                } else if(!docs.length) {
                    resolve(undefined);
                } else {
                    resolve(docs[0]);
                }
            });
        })
    }
    
    public async getUserByName(name: string): Promise<User[]> {
        const regEx = new RegExp(name);
        return new Promise((resolve, reject)=>{
            this.nedb.find({name: regEx}, (err: Error, docs: any[])=>{
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        })
    }

    private generateUserId(): string {
        return Math.random().toString(36).slice(2);
    }
}