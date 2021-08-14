import querystring from 'querystring';
import is from 'is_js';

class Api {
  static makeGetUrl
    = (base, where) => base + (is.empty(where) ? '' : `?${querystring.stringify(where)}`);

  static httpHeaders = () => ({
    'X-Requested-With': 'csrf', // csrf header
    'Content-Type': 'application/json',
  });

  static toJson = (response) => response.json();

  static fetchGet = async (base, where = {}) => {
    try {
      return await window.fetch(this.makeGetUrl(base, where), {
        method: 'GET',
        headers: this.httpHeaders(),
      });
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  static fetchPost = async (url, data) => {
    try {
      return await window.fetch(url, {
        method: 'POST',
        headers: this.httpHeaders(),
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  static fetchPatch = async (url, data) => {
    try {
      return await window.fetch(url, {
        method: 'PATCH',
        headers: this.httpHeaders(),
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  static fetchDelete = async (url) => {
    try {
      return await window.fetch(url, {
        method: 'DELETE',
        headers: this.httpHeaders(),
      });
    } catch (e) {
      console.log(e);
      return e;
    }
  };
}

const API_CONFIG = {};
API_CONFIG.BASE_URL = process.env.VUE_APP_BASE_URL;
API_CONFIG.AUTH_URL = process.env.VUE_APP_AUTH_TEMP_URL;
/** *******************
 * API Settings
 * ****************** */

export const chouseiApi = {
  getUser: () => Api.fetchGet(`${API_CONFIG.BASE_URL}/user`).then((d) => Api.toJson(d)),
  getUserSetDate: (where) => Api.fetchGet(`${API_CONFIG.BASE_URL}/date/user`, where).then((d) => Api.toJson(d)),
  getCandidateDate: (month) => Api.fetchGet(`${API_CONFIG.BASE_URL}/date/month/${month}`).then((d) => Api.toJson(d)),
  patchCandidateDateStatus: (id, data) => Api.fetchPatch(`${API_CONFIG.BASE_URL}/date/${id}`, data),
  getLotteryStatus: (month) => Api.fetchGet(`${API_CONFIG.BASE_URL}/lotteryStatus/${month}`).then((d) => Api.toJson(d)),
  getApplicationDate: (month) => Api.fetchGet(`${API_CONFIG.BASE_URL}/date/applicationDate/${month}`).then((d) => Api.toJson(d)),
};

export const authApi = {
  authentication: (data) => Api.fetchPost(`${API_CONFIG.AUTH_URL}/auth-api/authentication`, data).then((d) => Api.toJson(d)),
  checkToken: (data) => Api.fetchPost(`${API_CONFIG.AUTH_URL}/auth-api/check-token`, data).then((d) => Api.toJson(d)),
};
