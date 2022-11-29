import AuthService from '../services/auth.service';
const token = localStorage.getItem('token');

const initialState = token ? { status: {loggedIn: true}, token: token} 
	: { status: {loggedIn: false}, token: null};

export const auth = {
	namespaced: true,
	state: initialState,
	actions: {
		login({commit}) {
			return AuthService.login().then(res => {
				commit('loginSuccess', res);
				return res
			}, 
			error => {
				commit('loginFailure', error);
				return error
			})
		}
	},
	mutations: {
		loginSuccess(state, token) {
			state.status.loggedIn = true
			state.token = token;
		},
		loginFailure(state, error) {
			state.status.loggedIn = false;
			state.token = null;
			console.log(error);
		}
	}
}