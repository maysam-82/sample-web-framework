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
	onSaveUser = (): void => {
		this.model.save();
	};
	eventsMap(): { [key: string]: () => void } {
		return {
			'click:btn-random-age': this.onSetRandomAge,
			'click:btn-change-name': this.onChangeName,
			'click:btn-save': this.onSaveUser,
		};
	}
	template(): string {
		return `
    <input placeholder=${this.model.get('name')}>
    <button class="btn-change-name">Change Name</button>
    <button class="btn-random-age">Set Random Age</button>
    <button class="btn-save">Save User</button>
    `;
	}
}
