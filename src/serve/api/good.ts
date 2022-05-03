import { CreateGoodDto, GetGoodsPageDto, IGoodDetail, IGoodsPage, UpdateGoodSkuDto, UpdateGoodSpuDto } from './types/good.type'
import BaseHttpService from '../base-http.service'

class GoodService extends BaseHttpService {
  private BASE_URL = 'goods'

  async getGoods (form: GetGoodsPageDto) {
    return await this.post<IGoodsPage>(`${this.BASE_URL}/page`, form)
  }

  async getGoodDetailById (id: string) {
    return await this.get<IGoodDetail>(`${this.BASE_URL}/detail/${id}`)
  }
}

export const goodService = new GoodService()
