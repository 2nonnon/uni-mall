<template>
  <view class="content">
    <view class="profile-header">
      <view class="profile-header_avatar">
        <image :src="profile" mode="scaleToFill" />
      </view>
      <view class="profile-header_content" v-if="hasSignIn">
        <view class="header-content_name">{{ userInfo?.username }}</view>
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
          <image src="../../static/icon/order.png" mode="scaleToFill" />
          <view class="list-item_content">我的订单</view>
          <image class="list-item_arrow" src="../../static/icon/arrow-right.png" mode="scaleToFill" />
        </view>
        <view class="menu-list_item" @click="handleToCollection">
          <image src="../../static/icon/collection.png" mode="scaleToFill" />
          <view class="list-item_content">我的收藏</view>
          <image class="list-item_arrow" src="../../static/icon/arrow-right.png" mode="scaleToFill" />
        </view>
        <view class="menu-list_item" @click="handleToAddress">
          <image src="../../static/icon/map.png" mode="scaleToFill" />
          <view class="list-item_content">收货地址</view>
          <image class="list-item_arrow" src="../../static/icon/arrow-right.png" mode="scaleToFill" />
        </view>
        <button open-type="contact" class="menu-list_item button-reset">
          <image src="../../static/icon/service.png" mode="scaleToFill" />
          <view class="list-item_content">联系客服</view>
          <image class="list-item_arrow" src="../../static/icon/arrow-right.png" mode="scaleToFill" />
        </button>
      </view>
    </view>
    <!-- <button open-type="chooseAvatar" hover-class="button-hover" @chooseavatar="onChooseAvatar">
      Avatar
    </button>
    <input
      v-model="userInfo!.username"
      placeholder="请输入昵称"
      type="nickname"
    />
    <input v-model="userInfo!.username" type="nickname" class="weui-input" placeholder="请输入昵称"/> -->
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
import { computed, onMounted } from 'vue';
import { useUser } from '../../composables/useUser'

const { hasSignIn, userInfo, getUserInfo, handleSignIn, handleSignOut } = useUser()
const profile = computed(() => {
  if (hasSignIn) {
    if (userInfo.value?.profile) return userInfo.value?.profile
    else return '../../static/avatar/avatar40017.webp'
  } else {
    return '../../static/avatar/profile.png'
  }
})

const handleToOrderList = () => {
  uni.navigateTo({
    url: `../orderlist/index`,
  })
}

const handleToCollection = () => {
    uni.navigateTo({
    url: `../collection/index`,
  })
}

const handleToAddress = () => {
  uni.navigateTo({
    url: `../address/index`,
  })
}

// const onChooseAvatar = (e: any) => {
//   console.log(e.detail.avatarUrl)
//   userInfo.value!.profile = e.detail.avatarUrl
// }

onMounted(() => {
  if (hasSignIn) {
    getUserInfo()
  }
})
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
  border-radius: 50%;
  overflow: hidden;
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
  align-items: center;
  padding: 30rpx 10rpx 30rpx 20rpx;
  font-size: 14px;
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

.menu-list_item:not(:last-child) {
  border-bottom: 1rpx solid #eee;
}

.menu-list_item image {
  width: 50rpx;
  height: 50rpx;
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
