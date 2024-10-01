import { User } from './usuario';

export class Mensaje {
	user: User;
	message: string;
	time: Date;

	constructor(user: User, message: string, time: Date = new Date()) {
		this.user = user;
		this.message = message;
		this.time = time;
	}
}