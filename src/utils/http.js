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

  // Exchange
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

  // App ID
  getAppIDList(page, size) {
    const url = "/app_id/?page=" + page + "&size=" + size
    return this.http.get(url)
  }

  getAppID(id) {
    const url = "/app_id/" + id + "/"
    return this.http.get(url)
  }

  addAppID(parmas) {
    const url = "/app_id/"
    return this.http.post(url, parmas)
  }

  updateAppID(id, parmas) {
    const url = "/app_id/" + id + "/"
    return this.http.put(url, parmas)
  }

  deleteAppID(id) {
    const url = "/app_id/" + id + "/"
    return this.http.delete(url)
  }
  
  //server attr
  getServerAttrList(page, size) {
    const url = "/server_attr/?page=" + page + "&size=" + size
    return this.http.get(url)
  }

  getServerAttr(id) {
    const url = "/server_attr/" + id + "/"
    return this.http.get(url)
  }

  addServerAttr(parmas) {
    const url = "/server_attr/"
    return this.http.post(url, parmas)
  }

  updateServerAttr(id, parmas) {
    const url = "/server_attr/" + id + "/"
    return this.http.put(url, parmas)
  }

  deleteServerAttr(id) {
    const url = "/server_attr/" + id + "/"
    return this.http.delete(url)
  }
  
  //server type
  getServerTypeList(page, size) {
    const url = "/server_type/?page=" + page + "&size=" + size
    return this.http.get(url)
  }

  getServerType(id) {
    const url = "/server_type/" + id + "/"
    return this.http.get(url)
  }

  addServerType(parmas) {
    const url = "/server_type/"
    return this.http.post(url, parmas)
  }

  updateServerType(id, parmas) {
    const url = "/server_type/" + id + "/"
    return this.http.put(url, parmas)
  }

  deleteServerType(id) {
    const url = "/server_type/" + id + "/"
    return this.http.delete(url)
  }

  //year_month
  getYearMonthList(page, size) {
    const url = "/year_month/?page=" + page + "&size=" + size
    return this.http.get(url)
  }

  getYearMonth(id) {
    const url = "/year_month/" + id + "/"
    return this.http.get(url)
  }

  addYearMonth(parmas) {
    const url = "/year_month/"
    return this.http.post(url, parmas)
  }

  updateYearMonth(id, parmas) {
    const url = "/year_month/" + id + "/"
    return this.http.put(url, parmas)
  }

  deleteYearMonth(id) {
    const url = "/year_month/" + id + "/"
    return this.http.delete(url)
  }

  //futures
  getFutureList(page, size) {
    const url = "/futures_instrument/?page=" + page + "&size=" + size
    return this.http.get(url)
  }

  getFuture(id) {
    const url = "/futures_instrument/" + id + "/"
    return this.http.get(url)
  }

  addFuture(parmas) {
    const url = "/futures_instrument/"
    return this.http.post(url, parmas)
  }

  updateFuture(id, parmas) {
    const url = "/futures_instrument/" + id + "/"
    return this.http.put(url, parmas)
  }

  deleteFuture(id) {
    const url = "/futures_instrument/" + id + "/"
    return this.http.delete(url)
  }

  //server_info
  getServerInfoList(page, size) {
    const url = "/server_info/?page=" + page + "&size=" + size
    return this.http.get(url)
  }

  getServerInfo(id) {
    const url = "/server_info/" + id + "/"
    return this.http.get(url)
  }

  addServerInfo(parmas) {
    const url = "/server_info/"
    return this.http.post(url, parmas)
  }

  updateServerInfo(id, parmas) {
    const url = "/server_info/" + id + "/"
    return this.http.put(url, parmas)
  }

  deleteYServerInfo(id) {
    const url = "/server_info/" + id + "/"
    return this.http.delete(url)
  }

  //server_user
  getServerUserList(page, size) {
    const url = "/server_user/?page=" + page + "&size=" + size
    return this.http.get(url)
  }

  getServerUserList(id) {
    const url = "/server_user/" + id + "/"
    return this.http.get(url)
  }

  addServerUser(parmas) {
    const url = "/server_user/"
    return this.http.post(url, parmas)
  }

  updateServerUser(id, parmas) {
    const url = "/server_user/" + id + "/"
    return this.http.put(url, parmas)
  }

  deleteServerUser(id) {
    const url = "/server_user/" + id + "/"
    return this.http.delete(url)
  }

  //Share
  getShareList(page, size) {
    const url = "/share/?page=" + page + "&size=" + size
    return this.http.get(url)
  }

  getShare(id) {
    const url = "/share/" + id + "/"
    return this.http.get(url)
  }

  addShare(parmas) {
    const url = "/share/"
    return this.http.post(url, parmas)
  }

  updateShare(id, parmas) {
    const url = "/share/" + id + "/"
    return this.http.put(url, parmas)
  }

  deleteShare(id) {
    const url = "/share/" + id + "/"
    return this.http.delete(url)
  }

  //share_options
  getShareOptionsList(page, size) {
    const url = "/share_option/?page=" + page + "&size=" + size
    return this.http.get(url)
  }

  getShareOptions(id) {
    const url = "/share_option/" + id + "/"
    return this.http.get(url)
  }

  addShareOptions(parmas) {
    const url = "/share_option/"
    return this.http.post(url, parmas)
  }

  updateShareOptions(id, parmas) {
    const url = "/share_option/" + id + "/"
    return this.http.put(url, parmas)
  }

  deleteShareOptions(id) {
    const url = "/share_option/" + id + "/"
    return this.http.delete(url)
  }
  
}

export default new Http()