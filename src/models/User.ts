import { Model } from './Model';
import { Attributes } from './Attributes';
import { Events } from './Events';
import { ApiSync } from './ApiSync';
import { Collection } from './Collection';
export interface IUserProps {
	name?: string;
	age?: number;
	id?: number;
}
const apiURL = 'http://localhost:3000/users';

export class User extends Model<IUserProps> {
	static buildUser(attrs: IUserProps): User {
		return new User(
			new Attributes<IUserProps>(attrs),
			new Events(),
			new ApiSync<IUserProps>(apiURL)
		);
	}
	static buildUserCollection(): Collection<User, IUserProps> {
		return new Collection<User, IUserProps>(
			apiURL,
			(json: IUserProps): User => User.buildUser(json)
		);
	}
	setRandomAge(): void {
		const age = Math.round(Math.random() * 100);
		this.set({ age });
	}
}
