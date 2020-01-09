const USER_KEY = "USER_KEY"
const TOKEN_KEY = "JWT_TOKEN_KEY"
//const ROLE = "ROLE"

class Auth {
  constructor() {
    this.token = null
    this.user = null
    this.token = localStorage.getItem(TOKEN_KEY)
    const userJson = localStorage.getItem(USER_KEY)
    if (userJson) {
      this.user = JSON.parse(userJson)
    }
  }

  static getInstance() {
    if (!this._instance) {
      this._instance = new Auth()
    }
    return this._instance
  }

  setUserToken(user, token) {
    this.user = user
    this.token = token
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    localStorage.setItem(TOKEN_KEY, token)
    //localStorage.setItem(ROLE, "admin")
  }

  clearUserToken() {
    this.user = null;
    this.token = null;
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(TOKEN_KEY)
    //localStorage.removeItem(ROLE)
  }

  get is_authed() {
    if (this.user && this.token) {
      return true
    } else {
      return false
    }
  }
}


export default Auth.getInstance()