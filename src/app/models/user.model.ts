import { Group } from './group.model';

export class User {
    id: number;
    firstname: string;
    lastname: string;
    login: string;
    password: string;
    external_id: number;
    external_type: string;
    pictureuri: string;
    displayName: string;
    timeZoneId: string;
    type: string;
    rights: string[];
    address: Address;
    languageId: number;
    groups: Group[];
}

export class Address {
    id: number;
    deleted: boolean;
    country: string;
    email: string;
}