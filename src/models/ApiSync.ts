import axios, { AxiosResponse, AxiosPromise } from 'axios';
// Add Generic Constraint to tell Typescript that whatever value type T has got, it always has some given property i.e. `id` in this class.
interface IHasID {
	id?: number;
}
// T should have a property according to `IHasID` interface.
export class ApiSync<T extends IHasID> {
	constructor(public url: string) {}
	// Save information about an specific user to the backend
	save(data: T): AxiosPromise {
		const { id } = data;
		if (id) {
			return axios.put(`${this.url}/${id}`, data);
		} else {
			return axios.post(this.url, data);
		}
	}
	// Fetch information about an specific user from backend
	fetch(id: number): AxiosPromise {
		return axios.get(`${this.url}/${id}`);
	}
}
