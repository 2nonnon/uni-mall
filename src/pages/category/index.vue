<template>
  <view class="category-container">
    <view class="category-parent">
      <view class="category-parent_wrapper" @click="handleChooseCategory(null)">
        <view class="category-parent_name">全部商品</view>
        <image src="../../static/icon/arrow-right.png" mode="scaleToFill" />
      </view>
    </view>
    <view class="category-parent" v-for="parent in categories" :key="parent.name">
      <view class="category-parent_wrapper" @click="handleChooseCategory(parent)">
        <view class="category-parent_name">{{ parent.name }}</view>
        <image src="../../static/icon/arrow-right.png" mode="scaleToFill" />
      </view>
      <view class="category-children_container" v-if="parent.children && parent.children!.length > 0">
        <view class="category-child" v-for="child in parent.children" :key="child.name"
          @click="handleChooseCategory(child)">{{ child.name
          }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { useCategory } from '../../composables/useCategory';

const {
  categories,
  getCategories,
  chooseCategory } = useCategory()

const handleChooseCategory = (item: (typeof chooseCategory extends ((T: infer K) => void) ? K : void)) => {
  chooseCategory(item)
  uni.switchTab({
    url: '../index/index'
  })
}

onLoad(() => {
  getCategories()
})
</script>

<style  scoped>
.category-container {
  width: 100%;
  min-height: 100vh;
  background-color: #eee;
  padding-bottom: 10vh;
}

.category-parent {
  padding: 30rpx;
  border-bottom: 1px solid #eee;
  background-color: #fff;
}

.category-parent_wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
}

.category-parent_wrapper image {
  width: 50rpx;
  height: 50rpx;
}

.category-children_container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  margin-top: 30rpx;
}

.category-child {
  background-color: #eee;
  padding: 20rpx 30rpx;
  border-radius: 20rpx;
  font-size: 14px;
}
</style>
