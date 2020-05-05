export class Attributes<T> {
	constructor(private data: T) {}
	// K just represents some kind of type just like T.
	//  `K extends keyof T` sets up a generic contstrains. It contstrains limits the type that `K` can be.  It means value of the `K` can only be one of the keys of `T`.
	// `(key: K)` means that whatever argument we are passing in is going to be of type `K`.
	// `T[K]` means look up the interface of `T` and return a value at key of `K`.
	//  Example:
	// IUserProps, `K` can only be name, age or id and returns the corresponding type that is string, number or number.
	get<K extends keyof T>(key: K): T[K] {
		return this.data[key];
	}
	set(update: T): void {
		Object.assign(this.data, update);
	}
}
