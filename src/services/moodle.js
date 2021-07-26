import axios from "axios";
//const moodleUrl = 'http://192.168.1.105'
//const token = '237606d8371ff1511323eaca7bb0f7bc'
const token = localStorage.token
const moodleUrl = localStorage.url
const wsfunction = 'core_user_create_users'
class MoodleService {
    createUser(data) {
        return axios.get(`${moodleUrl}/webservice/rest/server.php`, { params: data })
    }

    mapDataUser(data){
        return {
            'wstoken': token,
            'wsfunction':wsfunction,
            'moodlewsrestformat':'json',
            'users[0][username]':data.userName,  
            'users[0][password]':data.password,
            'users[0][firstname]':data.firstName,
            'users[0][lastname]':data.lastName,
            'users[0][email]':data.email
        }
    }

    getUsers() {
        const data = {
            'wstoken': token,
            'wsfunction':'core_user_get_users',
            'moodlewsrestformat':'json',
            'criteria[1][key]':'email',
            'criteria[1][value]':'%%'
        }
        return axios.get(`${moodleUrl}/webservice/rest/server.php`, { params: data })
    }

    getUsersByEmail(email) {
        const data = {
            'wstoken': token,
            'wsfunction':'core_user_get_users',
            'moodlewsrestformat':'json',
            'criteria[1][key]':'email',
            'criteria[1][value]':email
        }
        return axios.get(`${moodleUrl}/webservice/rest/server.php`, { params: data })
    }

    deleteUsersById(id) {
        const data = {
            'wstoken': token,
            'wsfunction':'core_user_delete_users',
            'moodlewsrestformat':'json',
            'userids[0]':id
        }
        return axios.get(`${moodleUrl}/webservice/rest/server.php`, { params: data })
    }

    updateUsers(data) {
        const body = {
            'wstoken': token,
            'wsfunction':'core_user_update_users',
            'moodlewsrestformat':'json',
            'users[0][id]':data.id,
            'users[0][username]':data.userName,  
            'users[0][password]':data.password,
            'users[0][firstname]':data.firstName,
            'users[0][lastname]':data.lastName,
            'users[0][email]':data.email
        }
        return axios.get(`${moodleUrl}/webservice/rest/server.php`, { params: body })
    }
    
    createCourses(data){
        const body = {
            'wstoken': token,
            'wsfunction':'core_course_create_courses',
            'moodlewsrestformat':'json',
            'courses[0][fullname]':data.fullname,  
            'courses[0][shortname]':data.shortname,
            'courses[0][categoryid]':data.categoryid,
            'courses[0][idnumber]':data.idnumber,
            'courses[0][summary]':data.summary,
            'courses[0][visible]':data.visible
        }
        return axios.get(`${moodleUrl}/webservice/rest/server.php`, { params: body })
    }

    getCourses() {
        const data = {
            'wstoken': token,
            'wsfunction':'core_course_get_courses',
            'moodlewsrestformat':'json',
        }
        return axios.get(`${moodleUrl}/webservice/rest/server.php`, { params: data })
    }

    getCoursesById(id) {
        const data = {
            'wstoken': token,
            'wsfunction':'core_course_get_courses',
            'moodlewsrestformat':'json',
            'options[ids][0]':id
        }
        return axios.get(`${moodleUrl}/webservice/rest/server.php`, { params: data })
    }

    deleteCoursesById(id) {
        const data = {
            'wstoken': token,
            'wsfunction':'core_course_delete_courses',
            'moodlewsrestformat':'json',
            'courseids[0]':id
        }
        return axios.get(`${moodleUrl}/webservice/rest/server.php`, { params: data })
    }

    updateCourses(data){
        const body = {
            'wstoken': token,
            'wsfunction':'core_course_update_courses',
            'moodlewsrestformat':'json',
            'courses[0][fullname]':data.fullname,  
            'courses[0][shortname]':data.shortname,
            'courses[0][categoryid]':data.categoryid,
            'courses[0][idnumber]':data.idnumber,
            'courses[0][summary]':data.summary,
            'courses[0][visible]':data.visible,
            'courses[0][id]':data.id
        }
        return axios.get(`${moodleUrl}/webservice/rest/server.php`, { params: body })
    }

    getEnroledUsersByCourseId(id) {
        const data = {
            'wstoken': token,
            'wsfunction':'core_enrol_get_enrolled_users',
            'moodlewsrestformat':'json',
            'courseid':id
        }
        return axios.get(`${moodleUrl}/webservice/rest/server.php`, { params: data })
    }
    
    getCoursesByUserId(id) {
        const data = {
            'wstoken': token,
            'wsfunction':'core_enrol_get_users_courses',
            'moodlewsrestformat':'json',
            'userid':id
        }
        return axios.get(`${moodleUrl}/webservice/rest/server.php`, { params: data })
    }

    enrolUsers(data){
        const body = {
            'wstoken': token,
            'wsfunction':'enrol_manual_enrol_users',
            'moodlewsrestformat':'json',
            'enrolments[0][roleid]':data.roleId,
            'enrolments[0][userid]':data.userId,
            'enrolments[0][courseid]':data.courseId
        }
        return axios.get(`${moodleUrl}/webservice/rest/server.php`, { params: body })
    }

    getCategory() {
        const body = {
            'wstoken': token,
            'wsfunction':'core_course_get_categories',
            'moodlewsrestformat':'json',
        }
        return axios.get(`${moodleUrl}/webservice/rest/server.php`, { params: body })
    }

}

export default new MoodleService();