import { User, IUserProps } from '../models/User';
import { View } from './View';
export class UserForm extends View<User, IUserProps> {
	onSetRandomAge = (): void => {
		this.model.setRandomAge();
	};
	onChangeName = (): void => {
		const input = this.parent.querySelector('input');
		if (input) {
			const name = input.value;
			this.model.set({ name });
		}
	};
	eventsMap(): { [key: string]: () => void } {
		return {
			'click:btn-random-age': this.onSetRandomAge,
			'click:btn-change-name': this.onChangeName,
		};
	}
	template(): string {
		return `
    <div>
    <h1>
    UserForm
    </h1>
    <div>User Name: ${this.model.get('name')}</div>
    <div>User Age: ${this.model.get('age')}</div>
    <input/>
    <button class="btn-change-name">Change Name</button>
    <button class="btn-random-age">Set Random Age</button>
    </div>
    `;
	}
}
