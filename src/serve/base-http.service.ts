export default class BaseHttpService {
  private baseUrl = import.meta.env.VITE_API_BASEURL
  private _accessToken = ''

  protected async get<T>(
    endpoint: string,
    options = {}
  ): Promise<T> {
    Object.assign(options, this._getCommonOptions())

    return new Promise<T>((resolve, reject) => {
      console.log(options)
      uni.request({
        method: 'GET',
        url: `${this.baseUrl}/${endpoint}`,
        header: options,
        success: (res) => {
          if (res.statusCode === 200 || res.statusCode === 201) resolve(res.data as T)
          else {
            this._handleHttpError(res)
            reject(res.data)
          }
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
          if (res.statusCode === 200 || res.statusCode === 201) resolve(res.data as T)
          else {
            this._handleHttpError(res)
            reject(res.data)
          }
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
          if (res.statusCode === 200 || res.statusCode === 201) resolve(res.data as T)
          else {
            this._handleHttpError(res)
            reject(res.data)
          }
        }
      });
    })
  }

  protected _handleHttpError(error: any) {
    const { statusCode } = error
    if (statusCode === 401) {
      this._handle401()
    }
  }

  protected _handle401(): void {
    this.removeToken()
  }

  protected _getCommonOptions() {
    const token = this.accessToken

    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8'
      }
  }

  get accessToken(): string | null {
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
