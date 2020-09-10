import config from './config';

export default class Data {

    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };
        if (body !== null) {
            options.body = JSON.stringify(body);
        }
        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
        return fetch(url, options);
    }

    /**
     * Sign- In 
     * @param {string} emailAddress 
     * @param {string} password 
     */
    async getUser(emailAddress, password) {
        const response = await this.api(`/users`, 'GET', null, true, {emailAddress, password});
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }

    /**
     *  Create New User 
     * @param {object} user 
     */
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error();
        }
    }

    /**
     * Get Courses from DB
     */
    async getCourses() {
        const response = await this.api(`/courses`, 'GET');
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else {
            throw new Error();
        }
    }

    async getCourse(id) {
        const response = await this.api('/courses/'+id, 'GET');
        if (response.status === 200){
            return response.json().then(data => data);
        } else if (response.status === 404){
            return response.json().then(data => {
                console.log(data.message)
            })
        } else {
          throw new Error();
        }
    }

    /**
     * Creates New Course 
     * @param {object} course 
     * @param {object} context 
     */
    async createCourse(course, context, password) {
        const emailAddress = context.emailAddress;
        const response = await this.api('/courses/', 'POST', course, true, {emailAddress, password})
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error();
        }
    }

    /**
     * Updates existing Course 
     * @param {object} course 
     * @param {object} context 
     * @param {string} password
     */
    async updateCourse(course, context, password) {
        const id = course.id
        const emailAddress = context.emailAddress;
        const response = await this.api(`/courses/${id}`, 'PUT', course, true, {emailAddress, password});
        if (response.status === 204) {
            return [];
        } else if (response.status === 400){
          return response.json().then(data => {
              return (data.errors);
            });
        }
        else if (response.status === 403 || response.status === 404){
            return response.json().then(data => {
                console.log(data.messages);
          });
        }
        else {
            throw new Error();
        }
    }

    /**
     * Deletes Course 
     * @param {object} course 
     * @param {object} context 
     */
    async deleteCourse(id, context, password) {
        const emailAddress = context.emailAddress;
      
        const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {emailAddress, password});
        if (response.status === 204) {
            return [];
        } else if (response.status === 403) {
            return response.json().then(data => {
                console.log(data.message);
            });
        } else if (response.status === 404) {
            return response.json().then(data => {
                console.log(data.message);
            });
        }
        else {
            throw new Error();
        }
    }
} 