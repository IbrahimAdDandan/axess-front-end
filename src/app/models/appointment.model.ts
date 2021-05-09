import { Room } from './room.model';
import { User } from './user.model';

export class Appointment {
    id: number;
    connectedEvent: boolean;
    deleted: boolean;
    description: string;
    end: Date;
    passwordProtected: boolean;
    start: Date;
    title: string;
    room: Room;
    owner: User;
}
