<template>
  <view class="order-confirm">
    <view class="order-address">
      <view class="order-address_header">
        <view class="address-info">{{ address.destination }}</view>
        <view class="order-address_more">〉</view>
      </view>
      <view class="order-address_footer">
        <view>{{ address.receiver }}</view>
        <view>{{
            `${address.mobile?.slice(0, 3)}****${address.mobile?.slice(7)}`
        }}</view>
      </view>
    </view>
    <view class="order-body">
      <good-card :goods="data.orderDetails"></good-card>
      <view class="other-info">
        <view class="other-info_row">
          <view class="row_label">运费：</view>
          <view class="row_value">
            <price-vue :price="[0]" :has-fix="true" :cur-font="14" :num-font="14"></price-vue>
          </view>
        </view>
        <view class="other-info_row">
          <view class="row_label">优惠券：</view>
          <view class="row_value">
            <text class="value_text">暂无可用优惠券</text>
          </view>
        </view>
      </view>
    </view>
    <view class="order-remark">
      <text class="order-remark_title">备注</text>
      <view class="order-remark_input">
        <input placeholder="选填，建议先和客服协商一致" placeholder-class="input-placeholder" @input="" />
      </view>
    </view>
    <view class="confirm-footer">
      <view class="confirm-footer_info">
        <view class="confirm-footer_text">共3件, 需付款</view>
        <view class="confirm-footer_price">
          <price-vue :price="[data.paid]" :has-fix="true" :cur-font="18" :num-font="18"></price-vue>
        </view>
      </view>
      <view :class="{ 'good-settle_disable': hasAddress }" class="good-settle" @click="handleSettle">
        结算
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import PriceVue from '../../components/Price/Price.vue'
import GoodCard from '../../components/GoodCard/index.vue'
import { onLoad } from '@dcloudio/uni-app';
import { reactive, computed, watchEffect } from 'vue'
import { addressService } from '../../serve/api/address';
import { orderService } from '../../serve/api/order';
import { IAddress } from '../../serve/api/types/address.type';
import { IOrder, OrderStatus } from '../../serve/api/types/order.type';

const data = reactive({} as IOrder)

enum AddressIsDefault {
  IsDefault = 1,
  IsNotDefaylt = 0
}

const handleOpenChooseAddress = () => {
  console.log('choose address')
}

const address = reactive({} as IAddress)
const hasAddress = computed(() => Boolean(address.id))

const getDefaultAddress = () => {
  addressService.getDefaultAddresses().then((res) => {
    Object.assign(address, res)
  })
}

const handleChooseAddress = (data: IAddress) => {
  console.log('choose address', data)
  Object.assign(address, data)
}

const handleSettle = () => {
  orderService.updateOrder(data.id, {
    receive_info: data.receive_info,
    status: OrderStatus.TO_PAID
  })
    .then((res) => {
      console.log('settle', res)
    })
}

const load = (id: number) => {
  orderService.getOrderById(id).then((res) => {
    console.log(res)
    Object.assign(data, res)
  })
}

watchEffect(() => {
  data.receive_info = `${address.receiver} ${address.mobile} ${address.destination}`
})

onLoad((option) => {
  console.log(option.id)
  load(parseInt(option.id!, 10))
  getDefaultAddress()
})
</script>

<style scoped>
.order-confirm {
  background-color: #eee;
  display: flex;
  flex-direction: column;
  gap: 30rpx;
  min-height: 100vh;
}

.order-address {
  padding: 30rpx;
  background-color: #fff;
}

.order-address_header,
.order-address_footer {
  display: flex;
}

.order-body {
  padding: 30rpx;
  background-color: #fff;
}

.other-info {
  display: flex;
  flex-direction: column;
}

.other-info_row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.row_label {
  font-size: 14px;
  line-height: 20px;
  color: #9696a1;
}

.row_value {
  font-weight: 700;
  text-align: right;
}

.value_text {
  color: #9696a1;
  font-weight: 400;
}

.order-remark {
  display: flex;
  background-color: #fff;
  padding: 30rpx;
}

.confirm-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 30rpx;
}

.confirm-footer_info {
  display: flex;
}

.good-settle {
  width: 180rpx;
  min-width: 180rpx;
  height: 56rpx;
  font-size: 14px;
  line-height: 20px;
  border-radius: 28rpx;
  color: #fff;
  background-color: #ff6d6d;
  font-weight: bold;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.good-settle_disable {
  color: #c5c5cb;
  background-color: #f3f3f4;
}
</style>
