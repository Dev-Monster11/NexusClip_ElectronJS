import axios from "axios";

export class Http {
  baseUrl;

  constructor(baseUrl = "") {
    this.baseUrl = baseUrl;
  }

  async get(path, headers = {}) {
    return axios({
      url: `${this.baseUrl}/${path}`,
      method: "GET",
      headers: {
        ...headers,
      },
    })
      .then((response) => response.data)
      .catch((error) => error.response.data);
  }

  async post(path, data, headers = {}) {
    return axios({
      url: `${this.baseUrl}/${path}`,
      data,
      method: "POST",
      headers: {
        ...headers,
      },
    })
      .then((response) => response.data)
      .catch((error) => error.response.data);
  }
}
