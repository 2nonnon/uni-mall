import BaseHttpService from '../base-http.service'
import { CreateOrderDto, GetOrdersPageDto, IOrder, IOrdersPage, UpdateOrderReceiveInfoDto, UpdateOrderStatusDto } from './types/order.type'

class OrderService extends BaseHttpService {
    private BASE_URL = 'orders'

    async getOrderById (id: number) {
      return await this.get<IOrder>(`${this.BASE_URL}/${id}`)
    }

    async getOrdersPage (data: GetOrdersPageDto) {
      return await this.post<IOrdersPage>(`${this.BASE_URL}/page`, data)
    }

    async createOrder (data: CreateOrderDto) {
      return await this.post<IOrder>(`${this.BASE_URL}`, data)
    }

    async deleteOrder (id: number) {
      return await this.delete<void>(`${this.BASE_URL}/${id}`)
    }

    async updateOrderStatus (id: number, data: UpdateOrderStatusDto) {
      return await this.post<IOrder>(`${this.BASE_URL}/${id}/status`, data)
    }

    async updateOrderReceiveInfo (id: number, data: UpdateOrderReceiveInfoDto) {
      return await this.post<IOrder>(`${this.BASE_URL}/${id}/receive`, data)
    }

    async updateOrder (id: number, data: UpdateOrderStatusDto & UpdateOrderReceiveInfoDto) {
      return await this.post<IOrder>(`${this.BASE_URL}/${id}/update`, data)
    }
}

export const orderService = new OrderService()
