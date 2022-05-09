<template>
  <view class="order-confirm">
    <view class="order-address">
      <view class="order-address_has" v-if="hasAddress">
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
      <view class="order-address_empty" v-else>
        <view class="address-empty_tip">无收货地址，请点击前往设置</view>
        <view class="order-address_more">〉</view>
      </view>
    </view>
    <view class="order-body">
      <good-card :goods="data.orderDetails"></good-card>
      <view class="other-info">
        <view class="other-info_row">
          <view class="row_label">运费：</view>
          <view class="row_value">
            <price-vue :price="[0]" :has-fix="true" :cur-font="13" :num-font="14"></price-vue>
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
        <input placeholder="选填，建议先和客服协商一致" placeholder-class="input-placeholder" selection-start="0" selection-end="0"
          @input="" />
      </view>
    </view>
    <view class="confirm-footer">
      <view class="confirm-footer_wrapper">
        <view class="confirm-footer_info">
          <view class="confirm-footer_text">共3件, 需付款</view>
          <view class="confirm-footer_price">
            <price-vue :price="[data.paid]" :has-fix="true" :cur-font="14" :num-font="18"></price-vue>
          </view>
        </view>
        <view :class="{ 'good-settle_disable': hasAddress }" class="good-settle" @click="handleSettle">
          提交订单
        </view>
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
  gap: 20rpx;
  min-height: 100vh;
}

.order-address {
  padding: 30rpx;
  background-color: #fff;
}

.order-address_header,
.order-address_footer {
  display: flex;
  gap: 10rpx;
}

.order-address_header {
  justify-content: space-between;
  margin-bottom: 10rpx;
  font-size: 16px;
}

.order-address_more {
  color: #9696a1;
  font-size: 14px;
  font-weight: bold;
}

.order-address_footer {
  color: #9696a1;
  font-size: 14px;
}

.order-address_empty {
  display: flex;
  justify-content: space-between;
}

.address-empty_tip {
  font-size: 18px;
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

.value_text {
  color: #9696a1;
  font-weight: 400;
}

.order-remark {
  display: flex;
  background-color: #fff;
  padding: 30rpx;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  gap: 30rpx;
}

.order-remark_input {
  flex: 1;
}

.order-remark_input input {
  direction: rtl;
  color: #9696a1;
}

.confirm-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
}

.confirm-footer_wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 30rpx;
  gap: 20rpx;
}

.confirm-footer_info {
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.confirm-footer_price {
  font-weight: bolder;
}

.good-settle {
  width: 220rpx;
  min-width: 220rpx;
  height: 80rpx;
  font-size: 14px;
  line-height: 20px;
  border-radius: 40rpx;
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
