export class Invitation {
    id: number;
    deleted: number;
    hash: string;
    password_protected: number;
    invited_by: number;
    invitee_id: number;
    room_id: number;
    recording_id: number;
    valid_from: Date;
    valid_to: Date;
    comment: string;
    name: string;
}
