import axios from "axios";
const repositoryUrl = 'https://pages.planestic.udistrital.edu.co/apipages'

class UsersService {

    getUsers() {
        const data = {}
        return axios.get(`${repositoryUrl}/pages`, { params: data })
    }
    deleteUsersById(id) {
        return axios.delete(`${repositoryUrl}/pages`, { params: { id } })
    }

    getUsersByid(id) {
        return axios.get(`${repositoryUrl}/pages`, { params: { id } })
    }
    getUsersByEmail(email) {
        return axios.get(`${repositoryUrl}/pages`, { params: { email: email } })
    }
    createUser(data) {
        return axios.post(`${repositoryUrl}/pages`, data)
    }
    updateUser(data, id) {
        return axios.put(`${repositoryUrl}/pages`, data, { params: { id } })
    }
}
   
export default new UsersService();