<template>
  <view class="orderlsit-container">
    <view class="orderlist-nav">
      <view class="orderlist-nav_item" :class="{ 'nav-item_active': '全部' === activeNav }" @click="loadOrders">
        全部
      </view>
      <view class="orderlist-nav_item" :class="{ 'nav-item_active': item === activeNav }"
        v-for="item in Object.keys(orderStatusMap)" :key="item" @click="handleFilteOrder(item, orderStatusMap[item as keyof typeof orderStatusMap])">
        {{ item }}
      </view>
    </view>
    <view class="orderlist-body" v-if="hasOrder">
      <view class="orderlist-card" v-for="order in orderlist" :key="order.id" @click="handleToOrderDetail(order.id)">
        <view class="order-status">{{ orderStatusReMap[order.status as keyof typeof orderStatusReMap] }}</view>
        <good-card style="width: 100%;" :goods="order.orderDetails"></good-card>
        <view class="order-info">
          <view class="order-info_count">{{ `共${order.orderDetails.reduce((pre, cur) => pre + cur.quantity, 0)}件` }}
          </view>
          <text>需付款</text>
          <view class="order-info_price">
            <price-vue :has-fix="true" :num-font="16" :cur-font="13" :price="[order.paid]"></price-vue>
          </view>
        </view>
      </view>
    </view>
    <empty-placeholder class="orderlist-empty"
      url="../../static/status/a6945b3ad80b13e7f43f8cea003d63f9_7131855251702464767.png" text="暂无订单" v-else>
    </empty-placeholder>
  </view>
</template>

<script setup lang="ts">
import { orderService } from '../../serve/api/order';
import { OrderStatus, IOrder } from '../../serve/api/types/order.type';
import { computed, reactive, ref } from 'vue';
import PriceVue from '../../components/Price/Price.vue';
import GoodCard from '../../components/GoodCard/index.vue'
import EmptyPlaceholder from "../../components/EmptyPlaceholder/index.vue"
import { useOrder } from '../../composables/useOrder';

const {
  orderStatusMap,
  orderStatusReMap,
} = useOrder()

const activeNav = ref('全部')
const orderlist = reactive<IOrder[]>([])
const hasOrder = computed(() => {
  return orderlist.length > 0
})

const loadOrders = () => {
  activeNav.value = '全部'
  orderService.getOrdersPage({ page_size: 10, current_page: 1 }).then(res => {
    orderlist.length = 0
    orderlist.push(...res.orders)
    console.log(orderlist, 1)
  })
}

const handleFilteOrder = (nav: string, status: OrderStatus) => {
  activeNav.value = nav
  orderService.getOrdersPage({ page_size: 10, current_page: 1, status }).then(res => {
    orderlist.length = 0
    orderlist.push(...res.orders)
    console.log(orderlist, 2)
  })
}

const handleToOrderDetail = (id: number) => {
  uni.navigateTo({
    url: `../order/index?id=${id}`,
  })
}

loadOrders()
</script>

<style scoped>
.orderlsit-container {
  min-height: 100vh;
  width: 100%;
  background-color: #eee;
  display: flex;
  flex-direction: column;
}

.orderlist-nav {
  display: flex;
  justify-content: space-evenly;
  background-color: #fff;
  padding: 20rpx 0;
  border-bottom: 1px solid #eee;
}

.orderlist-nav_item {
  color: #ccc;
}

.nav-item_active {
  color: #ff6d6d;
}

.orderlist-body {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.orderlist-card {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 30rpx;
  gap: 30rpx;
  background-color: #fff;
}

.order-status {
  color: #ff6d6d;
}

.order-info {
  display: flex;
  font-size: 14px;
  align-items: center;
}

.order-info_count {
  margin-right: 40rpx;
}

.order-info_price {
  margin-left: 10rpx;
  font-weight: bolder;
  font-style: italic;
}

.orderlist-empty {
  background-color: #fff;
  flex: 1;
}
</style>
