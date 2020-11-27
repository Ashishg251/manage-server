import { Account } from "../Server/Model";

export enum AccessRights {
    CREATE,
    READ,
    UPDATE,
    DELETE
}

export interface UserCredentials extends Account {
    accessRights: AccessRights[];
}