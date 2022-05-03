export default class BaseHttpService {
  private baseUrl = import.meta.env.VITE_API_BASEURL
  private _accessToken = ''

  protected async get<T>(
    endpoint: string,
    options = {}
  ): Promise<T> {
    Object.assign(options, this._getCommonOptions())

    return new Promise<T>((resolve, reject) => {
      uni.request({
        method: 'GET',
        url: `${this.baseUrl}/${endpoint}`,
        header: options,
        success: (res) => {
          const data = res.data as T
          resolve(data)
        },
        fail: (err) => {
          reject(err)
        }
      });
    })
  }

  protected async post<T>(
    endpoint: string,
    data = {},
    options = {}
  ): Promise<T> {
    Object.assign(options, this._getCommonOptions())

    return new Promise<T>((resolve, reject) => {
      uni.request({
        method: 'POST',
        url: `${this.baseUrl}/${endpoint}`,
        header: options,
        data,
        success: (res) => {
          const data = res.data as T
          resolve(data)
        },
        fail: (err) => {
          reject(err)
        }
      });
    })
  }

  protected async delete<T>(
    endpoint: string,
    options = {}
  ): Promise<T> {
    Object.assign(options, this._getCommonOptions())

    return new Promise<T>((resolve, reject) => {
      uni.request({
        method: 'DELETE',
        url: `${this.baseUrl}/${endpoint}`,
        header: options,
        success: (res) => {
          const data = res.data as T
          resolve(data)
        },
        fail: (err) => {
          reject(err)
        }
      });
    })
  }

  protected _handleHttpError(error: any) {
    console.log(error.response.data)
    const { statusCode } = error.response.data
    if (statusCode === 401) {
      this._handle401()
    }
    return Promise.reject(error)
  }

  protected _handle401(): void {
    console.log(401)
  }

  protected _getCommonOptions() {
    const token = this._accessToken

    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8'
      }
    }
  }

  protected get accessToken(): string | null {
    return this._accessToken ? this._accessToken : this.loadToken()
  }

  protected saveToken(accessToken: string): void {
    this._accessToken = accessToken
    return uni.setStorageSync('accessToken', accessToken)
  }

  protected loadToken(): string {
    const token = uni.getStorageSync('accessToken') ?? ''
    this._accessToken = token
    return token
  }

  protected removeToken(): void {
    this._accessToken = ''
    uni.removeStorageSync('accessToken')
  }
}
