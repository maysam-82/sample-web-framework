import axios, { AxiosResponse } from 'axios';
import { Events } from './Events';
//  Generic P is going to be the type that specifies the structure of JSON data the we get back.
export class Collection<T, P> {
	models: T[] = [];
	events: Events = new Events();
	// deserialize function is going to take a JSON data an then turn it into an actual instance of an object.
	constructor(public url: string, public deserialize: (json: P) => T) {}
	get on() {
		return this.events.on;
	}
	get trigger() {
		return this.events.trigger;
	}
	fetch(): void {
		axios.get(this.url).then((response: AxiosResponse) => {
			response.data.map((value: P): void => {
				this.models.push(this.deserialize(value));
			});
			this.trigger('change');
		});
	}
}
