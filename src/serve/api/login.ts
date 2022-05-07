import BaseHttpService from '../base-http.service'
import { ISigninResponse } from './types/login.type'

class LoginService extends BaseHttpService {
  async signin (): Promise<ISigninResponse | void> {
    return new Promise((resovle, reject) => {
      uni.login({
        provider: 'weixin',
        success: async (loginRes) => {
          console.log(loginRes.code);
          const res = await this.get<ISigninResponse>(`auth/wxsignin/${loginRes.code}`)
          this.saveToken(res.accessToken)
          resovle(res)
        }
      })
    })
  }

  signout () {
    this.removeToken()
  }
}

export const loginService = new LoginService()
