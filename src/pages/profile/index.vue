<template>
  <view class="content">
    <view class="profile-header">
      <view class="profile-header_avatar">
        <image src="../../static/avatar/profile.png" mode="scaleToFill" />
      </view>
      <view class="profile-header_content" v-if="hasSignIn">
        <view class="header-content_name">用户1551235288</view>
      </view>
      <view class="profile-header_content" v-else>
        <view class="profile-header_signin" @click="handleSignIn">
          点击登录
        </view>
      </view>
    </view>
    <view class="profile-body">
      <view class="profile-menu_list">
        <view class="menu-list_item" @click="handleToOrderList">
          <image src="" mode="scaleToFill" />
          <view class="list-item_content">我的订单</view>
          <view class="list-item_arrow">〉</view>
        </view>
        <view class="menu-list_item" @click="handleToAddress">
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
    <view class="profile-footer" v-if="hasSignIn">
      <view class="profile-footer_wrapper">
        <view class="profile-footer_signout" @click="handleSignOut">
          退出登录
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useUser } from '../../composables/useUser'

const { hasSignIn, handleSignIn, handleSignOut } = useUser()

const handleToOrderList = () => {
  uni.navigateTo({
    url: `../orderlist/index`,
  })
}

const handleToAddress = () => {
  uni.navigateTo({
    url: `../address/index`,
  })
}
</script>

<style  scoped>
.content {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #eee;
}

.profile-header {
  display: flex;
  padding: 30rpx 50rpx;
  background-color: #fff;
}

.profile-header_avatar {
  height: 120rpx;
  width: 120rpx;
}

.profile-header_content {
  height: 120rpx;
  margin-left: 30rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-header_avatar image {
  height: 100%;
  width: 100%;
}

.profile-body {
  margin-top: 20rpx;
  background-color: #fff;
}

.profile-menu_list {
  display: flex;
  flex-direction: column;
}

.menu-list_item {
  display: flex;
  justify-content: flex-start;
  padding: 30rpx;
}

.menu-list_item:not(:last-child) {
  border-bottom: 1rpx solid #eee;
}

.menu-list_item image {
  width: 30rpx;
  height: 30rpx;
}

.list-item_arrow {
  margin-left: auto;
}

.profile-footer {
  width: 100%;
  position: absolute;
  bottom: 40rpx;
}

.profile-footer_wrapper {
  display: flex;
  justify-content: center;
}

.profile-footer_signout {
  width: 80%;
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
</style>
