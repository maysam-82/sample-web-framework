import { AxiosPromise, AxiosResponse } from 'axios';

// interface generic
interface IModelAttributes<T> {
	set(value: T): void;
	getAll(): T;
	get<K extends keyof T>(key: K): T[K];
}
interface ISync<T> {
	save(data: T): AxiosPromise;
	fetch(id: number): AxiosPromise;
}

interface IEvents {
	on(eventName: string, callback: Callbak): void;
	trigger(eventName: string): void;
}

interface IHasID {
	id?: number;
}

type Callbak = () => void;

export class Model<T extends IHasID> {
	constructor(
		private attributes: IModelAttributes<T>,
		private events: IEvents,
		private sync: ISync<T>
	) {}

	//  In user.on() in the instance of User class, () only invoking the on method in Event class.
	// get on() {
	// 	return this.events.on;
	// }
	// shortened passthrough methods
	on = this.events.on;

	trigger = this.events.trigger;

	get = this.attributes.get;

	set(update: T): void {
		this.attributes.set(update);
		this.events.trigger('change');
	}
	fetch(): void {
		const id = this.attributes.get('id');
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
			.save(this.attributes.getAll())
			.then((response: AxiosResponse): void => {
				this.trigger('save');
			})
			.catch(() => {
				this.trigger('faile');
			});
	}
}
