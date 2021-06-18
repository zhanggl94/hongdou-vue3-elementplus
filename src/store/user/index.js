import { createStore } from 'vuex';

export default createStore({
    state: {
        userInfo: {
            id: '',
            name: '',
            token: ''
        }
    }
});