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

export enum HTTP_CODES {
    OK = 200,
    CREATED = 201,
    NOT_FOUND = 404,
    BAD_REQUEST = 400,
    ACCESS_DENIED = 403,
    UNAUTHORIZED_REQUEST = 401
}

export enum HTTP_METHODS {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
}

export interface User {
    id: string,
    name: string,
    age: number,
    email: string,
    workingPosition: WorkingPosition
}

export enum WorkingPosition {
    JUNIOR,
    MANAGER,
    PROGRAMMER,
    EXPERT,
    ENGINEER
}