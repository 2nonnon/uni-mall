<template>
  <view class="order-confirm">
    <view class="order-status">
      <view class="order-status_content">{{ orderStatusReMap[order.status as keyof typeof orderStatusReMap] }}</view>
    </view>
    <view class="order-address">
      <view class="order-address_header">
        <view>{{ address[0] }}</view>
        <view>{{
            `${address[1]?.slice(0, 3)}****${address[1]?.slice(7)}`
        }}</view>
      </view>
      <view class="order-address_footer">
        <view class="address-info">{{ address.slice(2).join(' ') }}</view>
      </view>
    </view>
    <view class="order-body">
      <good-card :goods="order.orderDetails"></good-card>
      <view class="other-info">
        <view class="other-info_row">
          <view class="row_label">运费：</view>
          <view class="row_value">
            <price-vue :price="[0]" :has-fix="true" :cur-font="13" :num-font="14"></price-vue>
          </view>
        </view>
        <view class="other-info_end">
          <view class="row_label">需付款</view>
          <view class="end_value">
            <price-vue :price="[order.paid]" :has-fix="true" :cur-font="13" :num-font="14"></price-vue>
          </view>
        </view>
      </view>
    </view>
    <view class="order-info">
      <text class="order-info_title">订单信息</text>
      <view class="order-info_item">
        <view class="info-item_label">订单编号</view>
        <view class="info-item_value">{{ order.id }}</view>
      </view>
      <view class="order-info_item">
        <view class="info-item_label">创建时间</view>
        <view class="info-item_value">{{ getParseDate(parseInt(order.create_time)) }}</view>
      </view>
      <view class="order-info_item" v-if="order.deal_time">
        <view class="info-item_label">完成时间</view>
        <view class="info-item_value">{{ getParseDate(parseInt(order.deal_time)) }}</view>
      </view>
      <view class="order-info_item">
        <view class="info-item_label">订单备注</view>
        <view class="info-item_value">{{ order.remark ?? '无' }}</view>
      </view>
    </view>
    <button
      open-type="contact"
      class="order-service button-reset"
    >
      联系客服
    </button>
  </view>
</template>

<script setup lang="ts">
import PriceVue from '../../components/Price/Price.vue'
import GoodCard from '../../components/GoodCard/index.vue'
import { getParseDate } from '../../utils/getParseDate';
import { onLoad } from '@dcloudio/uni-app';
import { reactive } from 'vue'
import { orderService } from '../../serve/api/order';
import { IOrder } from '../../serve/api/types/order.type';
import { useOrder } from '../../composables/useOrder';

const {
  orderStatusReMap,
} = useOrder()

const order = reactive({} as IOrder)

const address = reactive<string[]>([])

const loadOrder = (id: number) => {
  orderService.getOrderById(id).then((res) => {
    console.log(res)
    Object.assign(order, res)
    address.push(...order.receive_info.split(' '))
  })
}

onLoad((option) => {
  console.log(option.id)
  loadOrder(parseInt(option.id!, 10))
})
</script>

<style scoped>
.order-confirm {
  background-color: #eee;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  min-height: 100vh;
}

.order-status {
  background-color: #fff;
  padding: 30rpx;
}

.order-status_content {
  font-size: 16px;
}

.order-address {
  padding: 30rpx;
  background-color: #fff;
  font-size: 14px;
}

.order-address_header,
.order-address_footer {
  display: flex;
  gap: 20rpx;
}

.order-address_header {
  margin-bottom: 10rpx;
}

.order-address_footer {
  color: #9696a1;
}

.order-body {
  padding: 30rpx;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.other-info {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  font-size: 14px;
}

.other-info_row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.row_label {
  font-size: 14px;
  line-height: 20px;
}

.other-info_end {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10rpx;
}

.end_value {
  font-weight: bolder;
}

.order-info {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 30rpx;
  gap: 30rpx;
}

.order-info_title {
  font-size: 16px;
}

.order-info_item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #9696a1;
}

.button-reset {
  font-size: 14px;
  background-color: inherit;
  line-height: inherit;
  margin: 0;
  width: 100%;
  height: 100%;
}

.button-reset::after {
  border: none;
}

.order-service {
  padding: 30rpx 0;
  width: 100%;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}
</style>
