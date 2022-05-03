import BaseHttpService from '../base-http.service'
import { GetOrdersPageDto, IOrder, IOrdersPage, UpdateOrderReceiveInfoDto, UpdateOrderStatusDto } from './types/order.type'

class OrderService extends BaseHttpService {
    private BASE_URL = 'orders/admin'

    async getOrderById (id: string) {
      return await this.get<IOrder>(`${this.BASE_URL}/${id}`)
    }

    async getOrdersPage (data: GetOrdersPageDto) {
      return await this.post<IOrdersPage>(`${this.BASE_URL}/page`, data)
    }

    async updateOrderStatus (id: string, data: UpdateOrderStatusDto) {
      return await this.post<IOrder>(`${this.BASE_URL}/${id}/status`, data)
    }

    async updateOrderReceiveInfo (id: string, data: UpdateOrderReceiveInfoDto) {
      return await this.post<IOrder>(`${this.BASE_URL}/${id}/receive`, data)
    }
}

export const orderService = new OrderService()
