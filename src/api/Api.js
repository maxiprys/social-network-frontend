import axios from 'axios';

const baseURL = 'http://localhost:3800/api';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (err) => {
//     const { response } = err;
//     const isLogout = window.location.pathname.includes('logout');
//     if (!isLogout && response && response.status === 401) {
//       API.goToLogin();
//     } else if (response && response.status >= 500) {
//       // @TODO: show error page or modal
//     }

//     return Promise.reject(err);
//   }
// );

class API {

  static goToLogin() {
    window.location.replace(baseURL + '/login');
  }

  static goToLogout() {
    window.location.replace(baseURL + '/logout');
  }

  static async login(email, password) {
    const { data } = await axiosInstance.post(`/login`, { email, password, gettoken: true });

    return data;
  }

  static async register(name, surname, email, password) {
    const { data } = await axiosInstance.post(`/register`, { name, surname, email, password });

    return data;
  }

  static async getUsers(token) {
    const headers = {
      'Authorization': token,
    }

    const { data } = await axiosInstance.get(`/users`, { headers: headers });

    return data;
  }

  static async getPublications(token, userId) {
    const headers = {
      'Authorization': token,
    }

    let url = '/publications';
    if(userId) url += `/${userId}`;

    const { data } = await axiosInstance.get(url, { headers: headers });

    return data;
  }

  static async savePublication(params, token) {
    let responsePublication, responseImage = null;
    const headers = {
      'Authorization': token,
    }

    responsePublication = await axiosInstance.post(`/publication`, { text: params.text }, { headers });

    let publicationSaved = responsePublication.data.publication;
    if (publicationSaved) {
      let formData = new FormData();
      formData.append('image', params.image);

      responseImage = await axiosInstance.post(`/upload-image-pub/${publicationSaved._id}`, formData, { headers });
    }

    if(responseImage.data.publication) {
      publicationSaved = responseImage.data.publication;
    }

    return publicationSaved;
  }

  static async deletePublication(publicationId, token) {
    const headers = {
      'Authorization': token,
    }

    const { data } = await axiosInstance.delete(`/publication/${publicationId}`, { headers: headers });

    return data;
  }

  static async getFollowing(token) {
    const headers = {
      'Authorization': token,
    }

    const { data } = await axiosInstance.get(`/following`, { headers: headers });

    return data;
  }

  static async getFollowed(token) {
    const headers = {
      'Authorization': token,
    }

    const { data } = await axiosInstance.get(`/followed`, { headers: headers });

    return data;
  }
}

export default API;
