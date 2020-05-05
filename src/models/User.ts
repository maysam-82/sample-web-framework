import { Events } from './Events';
import { Sync } from './Sync';
import { Attributes } from './Attributes';
export interface IUserProps {
	name?: string;
	age?: number;
	id?: number;
}
const apiURL = 'http://localhost:3000/users';

export class User {
	public events: Events = new Events();
	public sync: Sync<IUserProps> = new Sync<IUserProps>(apiURL);
	public attribures: Attributes<IUserProps>;
	constructor(data: IUserProps) {
		this.attribures = new Attributes<IUserProps>(data);
	}
	//  In user.on() in the instance of User class, () only invoking the on method in Event class.
	get on() {
		return this.events.on;
	}
	get trigger() {
		return this.events.trigger;
	}
	get get() {
		return this.attribures.get;
	}
}
