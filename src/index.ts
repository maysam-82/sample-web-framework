import { User } from './models/User';

const user = new User({ name: 'TEST USER', age: 1234 });

console.log(user.get('name'));
user.on('change', () => {
	console.log('changed !!!');
});

user.trigger('change');
