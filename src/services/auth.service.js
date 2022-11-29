import axios from 'axios';

class AuthService {
	login() {
		
		return axios.get(localStorage.getItem('api_url')+'aluno/46193/token').then(res => {
			if(res.data.token) {
				localStorage.setItem('token', res.data.token);
			}
			return true;
		})
		/*
		return axios.get(localStorage.getItem('app_url')+'angloplay/user_id').then(res => {
			var id = res.data
			return axios.get(localStorage.getItem('api_url')+'aluno/'+id+'/token').then(res => {
				if(res.data.token) {
					localStorage.setItem('token', res.data.token);
				}
				return true;
			})
		});*/
	}
}

export default new AuthService();
