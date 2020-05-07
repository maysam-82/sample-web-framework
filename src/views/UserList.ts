import { CollectionView } from './CollectionView';
import { User, IUserProps } from '../models/User';
import { UserShow } from './UserShow';

export class UserList extends CollectionView<User, IUserProps> {
	renderItem(model: User, itemParent: Element): void {
		new UserShow(itemParent, model).render();
	}
}
