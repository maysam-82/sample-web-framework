import { Model } from './Model';
import { Attributes } from './Attributes';
import { Events } from './Events';
import { ApiSync } from './ApiSync';

interface IUserProps {
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
}
