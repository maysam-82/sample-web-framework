import { Collection } from '../models/Collection';

export abstract class CollectionView<T, P> {
	constructor(public parent: Element, public collection: Collection<T, P>) {}
	abstract renderItem(model: T, itemParent: Element): void;
	render(): void {
		this.parent.innerHTML = '';
		const templateEmelent = document.createElement('template');
		for (const model of this.collection.models) {
			const itemParent = document.createElement('div');
			this.renderItem(model, itemParent);
			templateEmelent.content.append(itemParent);
		}
		this.parent.append(templateEmelent.content);
	}
}
