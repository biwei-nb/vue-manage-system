import axios from "axios"
import auth from "./auth"
//import { router } from "../routers";

//const BASE_URL = 'http://home.biwei-ningbo.com:10000/api'
const BASE_URL = 'http://127.0.0.1/api'

class Http {
  constructor() {
    this.http = axios.create({
      baseURL: BASE_URL,
      timeout: 5000
    });

    // 请求之前的拦截器，用来设置JWT
    this.http.interceptors.request.use(config => {
      const token = auth.token
      if (token) {
        config.headers.common.Authorization = "JWT " + token
      }
      return config
    })

    // 响应之后的拦截器
    // this.http.interceptors.response.use(response => {
    //     if (response.status === 200) {
    //       return response;
    //     } else {
    //       Promise.reject();
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //     return Promise.reject();
    //   })

  }

  login(params) {
    const url = "/login/"
    return this.http.post(url, params)
  }

  getExchangeList(page, size) {
    const url = "/exchange_info/?page=" + page + "&size=" + size
    return this.http.get(url)
  }

  getExchange(id) {
    const url = "/exchange_info/" + id + "/"
    return this.http.get(url)
  }

  addExchange(parmas) {
    const url = "/exchange_info/"
    return this.http.post(url, parmas)
  }

  updateExchange(id, parmas) {
    const url = "/exchange_info/" + id + "/"
    return this.http.put(url, parmas)
  }

  deleteExchange(id) {
    const url = "/exchange_info/" + id + "/"
    return this.http.delete(url)
  }

}

export default new Http()