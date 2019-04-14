import prod from './configureStore.prod';
import dev from './configureStore.dev';
let store = dev;
// if (process.env.API_ENV !== 'development' || process.env.PLATFORM_ENV !== 'web') {
// 	store = prod;
// } else {
// 	store = dev;
// }

export default store;
