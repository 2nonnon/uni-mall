import { ICategories } from './types/category.type'
import BaseHttpService from '../base-http.service'

class CategoryService extends BaseHttpService {
  private BASE_URL = 'categories'

  async getCategories () {
    return await this.get<ICategories[]>(this.BASE_URL)
  }
}

export const categoryService = new CategoryService()
