<template>
  <view class="address-wrapper">
    <view class="address-list">
      <view class="address-list-item" :class="{ 'is-choosed': item.id === choosedAddress?.id }" v-for="item in addressList" :key="item.id"
        @click="ChangeChoosedAddress(item)">
        <view class="address-list-item-content">
          <view class="address-list-item-info">
            <text>{{ item.receiver }}</text>
            <text class="address-list-item-phone">{{
                `${item.mobile.slice(0, 3)}****${item.mobile.slice(7)}`
            }}</text>
            <view class="address-list-item-default" v-if="item.isDefault">
              默认
            </view>
          </view>
          <view class="address-list-item-location address-list-item-ellipsis">
            {{ item.destination }}
          </view>
        </view>
        <view class="address-list-item-edit" @click="handleToEditAddress(EditStatus.UPDATE, item.id)">
          编辑
        </view>
      </view>
    </view>
    <view class="address-empty" v-if="notHasAddress">
      <view class="address-empty-text">您还没有添加过地址哦~</view>
    </view>
    <view class="address-button-wrapper">
      <view class="address-button">
        <view class="address-button-text" @click="handleToEditAddress(EditStatus.CREATE)">
          新增收货地址
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app';
import { useAddress } from '../../composables/useAddress'

const {
        choosedAddress,
        addressList,
        notHasAddress,
        loadAddressList,
        ChangeChoosedAddress
    } = useAddress()

enum EditStatus {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE'
}

const handleToEditAddress = (status: EditStatus, id?: string) => {
  console.log(id)
  uni.navigateTo({
    url: `../editAddress/index?status=${status}&id=${id}`,
  })
}

// type SortFunc = (arr: IAddress[]) => void

// const sortByChoosed: SortFunc = (arr) => {
//   for (let i = arr.length - 1; i > 0; i--) {
//     if (arr[i].isChoosed) {
//       ;[arr[i], arr[i - 1]] = [arr[i - 1], arr[i]]
//     }
//   }
// }

onShow(() => {
  loadAddressList()
})
</script>

<style scoped>
.address-wrapper {
  min-height: 100vh;
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.address-list {
  flex: 1;
  padding: 30rpx;
  overflow-y: auto;
}

.address-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 10rpx;
  padding: 30rpx;
  border: 2px solid #e6e6e6;
}

.address-list-item:not(:last-child) {
  margin-bottom: 10rpx;
}

.address-list-item.is-choosed {
  border: 2px solid #ff6d6d;
}

.address-list-item-info {
  font-size: 14px;
  font-weight: 400;
  color: #333;
  line-height: 16px;
  display: flex;
  align-items: center;
}

.address-list-item-phone {
  padding-left: 30rpx;
}

.address-list-item-default {
  margin-left: 10rpx;
  border-radius: 2rpx;
  padding: 10rpx;
  font-size: 10px;
  background: #ff6d6d;
  color: #fff;
  line-height: 10px;
}

.address-list-item-location {
  margin-top: 20rpx;
  font-size: 14px;
  color: #999;
  line-height: 14px;
  max-width: 500rpx;
}

.address-list-item-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.address-list-item-edit {
  font-size: 16px;
  font-weight: 400;
  color: #ff6d6d;
  line-height: 16px;
}

.address-empty {
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.address-empty-icon {
  width: 60px;
  height: 60px;
}

.address-empty-text {
  margin-top: 7px;
  font-size: 14px;
  font-weight: 400;
  color: #ccc;
  line-height: 20px;
}

.address-button-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30rpx;
  margin-bottom: 80rpx;
}

.address-button {
  flex: 1;
  background-color: #ff6d6d;
  border-radius: 40rpx;
  cursor: pointer;
  user-select: none;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.address-button-text {
  font-size: 16px;
  color: #fff;
  line-height: 20px;
}
</style>
