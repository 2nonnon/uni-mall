export enum OrderStatus {
  Pre = 'Pre',
  TO_PAID = 'TO_PAID',
  TO_SEND = 'TO_SEND',
  TO_DEAL = 'TO_DEAL',
  TO_SERVICE = 'TO_SERVICE',
  HAS_CLOSED = 'HAS_CLOSED',
}
export interface IOrderDetail {
  id: number;
  goodId: number;
  cover_url: string;
  name: string;
  attr: string;
  quantity: number;
  paid: number;
  market_price: number;
  status: OrderStatus;
  deal_time: string;
}
export interface IOrder {
  id: number;
  receive_info: string;
  paid: number;
  remark?: string;
  status: OrderStatus;
  create_time: string;
  paid_time: string;
  send_time: string;
  deal_time: string;
  orderDetails: IOrderDetail[];
}
export interface GetOrdersPageDto {
  current_page: number;
  page_size: number;
  status?: OrderStatus;
}
export interface UpdateOrderReceiveInfoDto {
  receive_info: string;
}
export interface UpdateOrderStatusDto {
  status: OrderStatus;
}
export interface ConfirmOrderDto  {
  remark?: string;
  receive_info: string;
  status: OrderStatus;
}

export interface IOrdersPage {
  total: number;
  orders: IOrder[];
}
export interface CreateOrderDto {
  paid: number;
  orderDetails: {
    goodId: number;
    cover_url: string;
    name: string;
    attr: string;
    quantity: number;
    market_price: number;
    paid: number;
  }[];
}
