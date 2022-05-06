import BaseHttpService from '../base-http.service'
import { CreateCartDto, DeleteCartsByIdsDto, ICart } from './types/cart.type'

class CartService extends BaseHttpService {
    private BASE_URL = 'carts'

    async getCarts() {
        return await this.get<ICart[]>(`${this.BASE_URL}`)
    }

    async getTotal() {
        return await this.get<number>(`${this.BASE_URL}/total`)
    }

    async createCart(form: CreateCartDto) {
        return await this.post<ICart>(`${this.BASE_URL}`, form)
    }

    async deleteCart(id: number) {
        return await this.delete<void>(`${this.BASE_URL}/${id}`)
    }

    async deleteCartByIds(form: DeleteCartsByIdsDto) {
        return await this.post<ICart>(`${this.BASE_URL}/delete/ids`, form)
    }

    async wxUpdateCart(id: number, form: CreateCartDto) {
        return await this.post<ICart>(`${this.BASE_URL}/${id}`, form)
    }
}

export const cartService = new CartService()