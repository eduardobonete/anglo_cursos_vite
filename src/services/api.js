import axios from "axios";

class ApiService {	
	getAll(service) {
		return axios.get(service);
	}

	get(service, id) {
		return axios.get(`${service}/${id}`);
	}

	create(service, data) {
		return axios.post(service, data);
	}

	update(service, id, data) {
		return axios.put(`${service}/${id}`, data);
	}

	delete(service, id) {
		return axios.delete(`${service}/${id}`);
	}

	deleteAll(service) {
		return axios.delete(service);
	}

	findBy(service, title) {
		return axios.get(`${service}?find=${title}`);
	}
	
	login(user_id) {
		return axios.get('aluno/'+user_id+'/token');
	}

	init() {
		axios.defaults.baseURL = localStorage.getItem('api_url');
		axios.defaults.headers.post['token'] = localStorage.getItem('token') // for POST requests
		axios.defaults.headers.common['token'] = localStorage.getItem('token') // for all requests
	}
}

export default new ApiService();