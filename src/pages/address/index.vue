<template>
  <view class="address-dialog">
    <view class="address-wrapper" v-if="isChoose">
      <view class="address-header">
        <view class="address-title">选择收货地址</view>
      </view>
      <view class="address-list">
        <view
          class="address-list-item"
          :class="{ 'is-choosed': item.isChoosed }"
          v-for="item in data"
          :key="item.id"
          @click="handleChoose(item.id)"
        >
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
          <view
            class="address-list-item-edit"
            @click="handleToEditAddress(EditStatus.UPDATE, item.id)"
          >
            编辑
          </view>
        </view>
      </view>
      <view class="address-empty" v-if="notHasAddress">
        <view class="address-empty-text">您还没有添加过地址哦~</view>
      </view>
      <view class="address-button">
        <view
          class="address-button-text"
          @click="handleToEditAddress(EditStatus.CREATE)"
        >
          新增收货地址
        </view>
      </view>
    </view>
    <EditAddressDialogVue
      v-else
      @close-edit="handleCloseEdit"
      :id="editId"
      :status="_status"
    ></EditAddressDialogVue>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { addressService } from '../../serve/api/address';
import { IAddress } from '../../serve/api/types/address.type';
import EditAddressDialogVue from './EditAddressDialog/EditAddressDialog.vue'

const isChoose = ref(true)
const data = reactive<IAddress[]>([])
const notHasAddress = computed(() => {
  return data.length === 0
})

enum EditStatus {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE'
}

const _status = ref(EditStatus.CREATE)
const editId = ref('')

const emit = defineEmits(['close-address', 'choose-address'])

const handleClose = () => {
  emit('close-address')
}

const handleToEditAddress = (status: EditStatus, id?: string) => {
  isChoose.value = false
  _status.value = status
  editId.value = id ?? ''
}

type SortFunc = (arr: IAddress[]) => void

const sortByChoosed: SortFunc = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    if (arr[i].isChoosed) {
      ;[arr[i], arr[i - 1]] = [arr[i - 1], arr[i]]
    }
  }
}

const load = () => {
  addressService.getAddresses().then((res) => {
    console.log('get all addresses', res)
    data.length = 0
    data.push(...res)
    sortByChoosed(data)
  })
}

const handleCloseEdit = () => {
  isChoose.value = true
  load()
}

const handleChoose = (id: string) => {
  addressService.wxUpdateAddressChoose(id).then((res) => {
    console.log('choose', res)
    emit('choose-address', res)
    handleClose()
  })
}

onMounted(() => {
  load()
})
</script>

<style scoped>
.address-dialog {
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.address-wrapper {
  position: relative;
  box-sizing: border-box;
  width: 700px;
  height: 519px;
  background-color: #fff;
  border-radius: 16px;
}
.address-header {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  position: relative;
  padding-top: 25px;
  margin-bottom: 28px;
}
.address-title {
  font-size: 20px;
  font-family: MicrosoftYaHei, sans-serif;
  color: #1e1f20;
  line-height: 28px;
}
.address-close-icon {
  cursor: pointer;
  width: 20px;
  height: 20px;
  position: absolute;
  right: 28px;
  top: 28px;
}
.address-list {
  padding: 0 40px;
  margin-bottom: 20px;
  height: 343px;
  overflow-y: auto;
}
.address-list-item {
  cursor: pointer;
  position: relative;
  height: 71px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.address-list-item:hover {
  border: 1px solid #eee;
}
.address-list-item.is-choosed {
  border: 2px solid #ff6d6d;
}
.address-list-item-content {
  padding: 15px 20px;
}
.address-list-item-info {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC, sans-serif;
  font-weight: 400;
  color: #333;
  line-height: 16px;
  display: flex;
  align-items: center;
}
.address-list-item-phone {
  padding-left: 20px;
}
.address-list-item-default {
  margin-left: 5px;
  border-radius: 2px;
  padding: 3px 5px;
  font-size: 10px;
  background: #ff6d6d;
  font-family: MicrosoftYaHei, sans-serif;
  color: #fff;
  line-height: 10px;
}
.address-list-item-location {
  margin-top: 10px;
  font-size: 14px;
  font-family: MicrosoftYaHei, sans-serif;
  color: #999;
  line-height: 14px;
  max-width: 518px;
}
.address-list-item-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.address-list-item-edit {
  top: 28px;
  right: 20px;
  position: absolute;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC, sans-serif;
  font-weight: 400;
  color: #ff6d6d;
  line-height: 16px;
  display: none;
}
.address-list-item:hover .address-list-item-edit {
  display: inline-block;
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
  font-family: PingFangSC-Regular, PingFang SC, sans-serif;
  font-weight: 400;
  color: #ccc;
  line-height: 20px;
}
.address-button {
  background-color: #ff6d6d;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
  margin: 0 auto 0;
  width: 180px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.address-button-text {
  font-size: 16px;
  font-family: MicrosoftYaHei, sans-serif;
  color: #fff;
  line-height: 20px;
}
</style>
