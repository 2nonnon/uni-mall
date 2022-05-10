<template>
  <view class="address-wrapper">
    <view class="address-form">
      <view class="address-field">
        <view class="address-key">收货人</view>
        <view class="address-value">
          <view class="address-input">
            <input type="text" placeholder="请填写收货人姓名" class="input" v-model="address.receiver" />
          </view>
        </view>
      </view>
      <view class="address-field">
        <view class="address-key">选择地区</view>
        <view class="address-value">
          <picker mode="region" @change="handleRegionChange">
            <view class="address-picker">{{ location.region }}</view>
          </picker>
        </view>
      </view>
      <view class="address-field">
        <view class="address-key">详细地址</view>
        <view class="address-value">
          <view class="address-input">
            <input type="text" placeholder="街道、楼牌号等" class="input" v-model="location.detail" />
          </view>
        </view>
      </view>
      <view class="address-field">
        <view class="address-key">手机号码</view>
        <view class="address-value">
          <view class="address-input">
            <input type="text" placeholder="请填写收货人手机号" class="input" v-model="address.mobile" />
          </view>
        </view>
      </view>
      <view class="address-field">
        <view class="address-key">默认选择</view>
        <view class="address-value radio" @click="hanldeToggleDefault">
          <view class="address-radio" :class="{ active: address.isDefault }"></view>
          <view class="address-radio-text">设为默认地址</view>
        </view>
      </view>
    </view>
    <view class="address-button-wrapper">
      <view class="address-button line" v-if="isEdit">
        <view class="address-button-text" @click="handleDeleteAddress(address.id)">
          删除地址
        </view>
      </view>
      <view class="address-button" :class="{ disabled: !isValidate }">
        <view class="address-button-text" @click="handleSaveAddress">
          保存地址
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { computed, reactive, ref, watchEffect } from 'vue'
import { addressService } from '../../serve/api/address';
import { CreateAddressDto, IAddress } from '../../serve/api/types/address.type';

enum EditStatus {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE'
}

const status = ref(EditStatus.CREATE)

const isEdit = computed(() => {
  return status.value === EditStatus.UPDATE
})

const address = reactive<IAddress>({
  id: '',
  receiver: '',
  mobile: '',
  destination: '',
  remark: '',
  isChoosed: false,
  isDefault: false
})

const isValidate = computed(() => {
  return address.destination && address.receiver && address.mobile
})

interface Location {
  region: string
  detail: string
}

const location = reactive<Location>({ region: '省市区县、乡镇等' } as Location)

const handleRegionChange = (e: { detail: { value: string[] } }) => {
  console.log(e.detail.value)
  location.region = e.detail.value.join(' ')
}

const hanldeToggleDefault = () => {
  address.isDefault = !address.isDefault
}
const handleDeleteAddress = (id: string) => {
  addressService.deleteAddress(id).then((res) => {
    console.log('delete', res)
    uni.navigateBack({})
  })
}

const policies = {
  [EditStatus.CREATE]: (data: CreateAddressDto) => {
    addressService.createAddress(data).then((res) => {
      console.log('create address', res)
      uni.navigateBack({})
    })
  },
  [EditStatus.UPDATE]: (data: CreateAddressDto) => {
    addressService.wxUpdateAddress(address.id, data).then((res) => {
      console.log('update address', res)
      uni.navigateBack({})
    })
  }
}
const handleSaveAddress = () => {
  const data: CreateAddressDto = {
    receiver: address.receiver,
    mobile: address.mobile,
    destination: address.destination,
    isDefault: address.isDefault
  }
  policies[status.value](data)
}
const initLocation = () => {
  const tmp = address.destination.split(' ')
  if (tmp?.length === 4) {
    location.detail = tmp.pop() as string
    location.region = tmp.join(' ')
  }
}
watchEffect(() => {
  address.destination = Object.values(location).join(' ')
})

onLoad((options) => {
  console.log(addressService.getCities())
  status.value = options.status as EditStatus
  if (options.id) {
    addressService.getAddressById(options.id).then((res) => {
      Object.assign(address, res)
      initLocation()
    })
  }
})
</script>

<style scoped>
.address-wrapper {
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.address-form {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.address-field {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 30rpx;
  font-size: 14px;
  font-family: MicrosoftYaHei, sans-serif;
  color: #333;
  line-height: 14px;
}

.address-field:not(:last-child) {
  border-bottom: 1px solid #eee;
}

.address-key {
  flex-shrink: 0;
  width: 120rpx;
}

.address-value {
  flex: 1;
}

.address-picker {
  height: 48rpx;
  line-height: 48rpx;
}

.input {
  height: 48rpx;
  box-sizing: border-box;
  width: 100%;
  background: #fff;
  color: #333;
  outline: none;
  font: inherit;
}

.input::placeholder {
  color: #ccc;
}

.radio {
  display: flex;
  align-items: center;
}

.address-radio {
  width: 18px;
  height: 18px;
  border: 1px solid #ccc;
  border-radius: 50%;
  box-sizing: border-box;
  margin-right: 10rpx;
}

.address-radio.active {
  background: #fff;
  border: 5px solid #ff6d6d;
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

.address-button.disabled {
  background-color: #f1f1f1;
  cursor: not-allowed;
}

.address-button.line {
  border: 1px solid #ff6d6d;
  background-color: #fff;
  margin-right: 20px;
}

.address-button-text {
  font-size: 16px;
  font-family: MicrosoftYaHei, sans-serif;
  color: #fff;
  line-height: 20px;
}

.address-button.line .address-button-text {
  color: #ff6d6d;
}
</style>
