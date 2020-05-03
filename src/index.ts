import { User } from './models/User';

const user = new User({ name: 'MyName', age: 20 });

user.on('click', () => {
	console.log('clicked');
});
user.on('click', () => {
	console.log('clicked1');
});
user.on('change', () => {
	console.log('changed');
});

user.trigger('click');
user.trigger('change');
