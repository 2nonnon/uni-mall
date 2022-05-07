<template>
  <view class="content">
    <view class="profile-header">
      <view class="profile-header_avatar">
        <image src="../../static/avatar/profile.png" mode="scaleToFill" />
      </view>
      <view class="profile-header_content" v-if="hasSignIn">
        <view class="header-content_name">用户1551235288</view>
      </view>
      <view class="profile-header_signin" v-else>
        <button open-type="" hover-class="button-hover" @click="handleSignIn">
          登录
        </button>
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
    <view class="profile-footer">
      <view class="profile-footer_signout" v-if="hasSignIn">
        <button open-type="" hover-class="button-hover" @click="handleSignOut">
          退出登录
        </button>
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
  display: flex;
  flex-direction: column;
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
  margin-top: 30rpx;
  background-color: #fff;
  flex: 1;
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
  padding: 30rpx;
  display: flex;
  justify-content: center;
}
</style>
