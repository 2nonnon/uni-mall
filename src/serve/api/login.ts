import BaseHttpService from '../base-http.service'
import { ISigninResponse, IUser } from './types/login.type'

class LoginService extends BaseHttpService {
  private base = 'users'

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

  async getUserInfo () {
    return await this.get<IUser>(this.base)
  }

  async addCollection (id: number) {
    return await this.get<number>(`${this.base}/${id}/collection`)
  }

  async deleteCollection (id: number) {
    return await this.delete(`${this.base}/${id}/collection`)
  }

  signout () {
    this.removeToken()
  }
}

export const loginService = new LoginService()
