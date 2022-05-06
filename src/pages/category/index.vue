<template>
  <view class="content">
    <view class="profile-header">
      <view class="profile-header_avatar">
        <image src="../../static/logo.png" mode="scaleToFill" />
      </view>
      <view class="profile-header_content">
        <view class="header-content_name">用户1551235288</view>
        <view class="header-content_id">id: 158835580</view>
      </view>
    </view>
    <view class="profile-body">
      <view class="profile-menu_list">
        <view class="menu-list_item">
          <image src="" mode="scaleToFill" />
          <view class="list-item_content">我的订单</view>
          <view class="list-item_arrow">〉</view>
        </view>
        <view class="menu-list_item">
          <image src="" mode="scaleToFill" />
          <view class="list-item_content">收货地址</view>
          <view class="list-item_arrow">〉</view>
        </view>
        <view class="menu-list_item">
          <image src="" mode="scaleToFill" />
          <view class="list-item_content">联系客服</view>
          <view class="list-item_arrow">〉</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { loginService } from '../../serve/api/login';
const title = ref('Hello lallala')

const login = () => {
  loginService.signin().then((res) => {
    console.log(res)
  })
}

</script>

<style  scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ff6d6d;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
