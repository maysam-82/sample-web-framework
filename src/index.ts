import { User } from './models/User';

const user = new User({ name: 'SAMPLE TEST', age: 1500 });

user.on('save', () => {
	console.log(user);
});

user.save();
