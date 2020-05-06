import { Events } from './Events';
import { Sync } from './Sync';
import { Attributes } from './Attributes';
import { AxiosResponse } from 'axios';
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

	set(update: IUserProps): void {
		this.attribures.set(update);
		this.events.trigger('change');
	}
	fetch(): void {
		const id = this.attribures.get('id');
		if (typeof id !== 'number') {
			throw new Error('Cannot fetch without an id');
		}
		this.sync.fetch(id).then((response: AxiosResponse): void => {
			// Calling this.set instead of this.attribute.set because we are going to trigger an event as well.
			this.set(response.data);
		});
	}
	save(): void {
		this.sync
			.save(this.attribures.getAll())
			.then((response: AxiosResponse): void => {
				this.trigger('save');
			})
			.catch(() => {
				this.trigger('faile');
			});
	}
}
