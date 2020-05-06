import { Model } from '../models/Model';

export abstract class View<T extends Model<K>, K> {
	//  Element is going to reference any HTMLElements
	// Whenever we create an instance of `UserForm`, we are going to pass in a `parent` property.  We are going to tell this class where should insert its HTML.
	constructor(public parent: Element, public model: T) {
		this.bindModel();
	}
	abstract eventsMap(): { [key: string]: () => void };
	abstract template(): string;
	bindModel = (): void => {
		this.model.on('change', () => {
			this.render();
		});
	};
	// The goal of render method is  take a template from `template` method and append it as a child to the `parent` property.
	bindEvents(fragment: DocumentFragment): void {
		const eventsMap = this.eventsMap();
		for (const eventKey in eventsMap) {
			const [eventName, selector] = eventKey.split(':');
			fragment
				.querySelectorAll(`.${selector}`)
				.forEach((element: Element): void => {
					element.addEventListener(eventName, eventsMap[eventKey]);
				});
		}
	}
	render(): void {
		this.parent.innerHTML = '';
		const templateElement = document.createElement('template');
		templateElement.innerHTML = this.template();
		// the `content` property is the actual reference to the HTML that is inside that template. This `content` property is of type `DocumentFragment`. DocumentFragment is an object that contain a reference to an HTML. Its general purposes is to hold an HTML inside of memory before it gets attached to the DOM.
		this.bindEvents(templateElement.content);

		this.parent.append(templateElement.content);
	}
}
