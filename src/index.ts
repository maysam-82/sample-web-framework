import { User } from './models/User';

const user = new User({ name: 'TEST USER', age: 1234 });
user.save();
