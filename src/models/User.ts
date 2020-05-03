interface IUserProps {
	name?: string;
	age?: number;
}

// Use type alias to avoid confusing in codes by adding `()=> {}`
type Callback = () => void;

export class User {
	// `events` is going to be an object, and all the keys of this object are going to be string and then a value for those keys is going to be an array of Callback.
	events: { [key: string]: Callback[] } = {};
	constructor(private data: IUserProps) {}
	get(propName: string): string | number {
		return this.data[propName];
	}
	set(update: IUserProps): void {
		Object.assign(this.data, update);
	}
	on(eventName: string, callback: Callback): void {
		// We need a way to store all these events
		const callbacks = this.events[eventName] || [];
		callbacks.push(callback);
		this.events[eventName] = callbacks;
	}
	trigger(eventName: string): void {
		const callbacks = this.events[eventName];
		if (!callbacks || callbacks.length === 0) {
			return;
		}
		callbacks.map((callback) => {
			callback();
		});
	}
}
