import { GetGoodsPageDto, IGood, IGoodDetail, IGoodsPage } from './types/good.type'
import BaseHttpService from '../base-http.service'

class GoodService extends BaseHttpService {
  private BASE_URL = 'goods'

  async getGoods (form: GetGoodsPageDto) {
    return await this.post<IGoodsPage>(`${this.BASE_URL}/page`, form)
  }

  async getGoodByIds (ids: string[]) {
    return await this.post<IGood[]>(`${this.BASE_URL}/ids`, ids)
  }

  async getGoodDetailById (id: string) {
    return await this.get<IGoodDetail>(`${this.BASE_URL}/detail/${id}`)
  }
}

export const goodService = new GoodService()
