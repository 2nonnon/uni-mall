import { OrderStatus } from "../serve/api/types/order.type"

const orderStatusMap = {
    '待支付': OrderStatus.TO_PAID,
    '待发货': OrderStatus.TO_SEND,
    '待收货': OrderStatus.TO_DEAL,
    '售后': OrderStatus.TO_SERVICE
}

const orderStatusReMap = {
    [OrderStatus.TO_PAID]: '待支付',
    [OrderStatus.TO_SEND]: '待发货',
    [OrderStatus.TO_DEAL]: '待收货',
    [OrderStatus.TO_SERVICE]: '售后',
    [OrderStatus.HAS_CLOSED]: '交易关闭'
}

export const useOrder = () => {
    return {
        orderStatusMap,
        orderStatusReMap,
    }
}