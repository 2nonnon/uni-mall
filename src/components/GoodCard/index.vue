<template>
    <view class="good-card" v-for="item in goods" :key="item.id">
        <image :src="item.cover_url" mode="aspectFit" />
        <view class="good-card_content">
            <view class="good-content_up">
                <view class="content-up_name">{{ item.name }}</view>
                <view class="content-up_price">
                    <price-vue :has-fix="true" :num-font="14" :cur-font="13" :price="[item.market_price]"></price-vue>
                </view>
            </view>
            <view class="good-content_down">
                <view class="content-up_attr">{{ item.attr }}</view>
                <view class="content-up_count">{{ `x${item.quantity}` }}</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import PriceVue from '../../components/Price/Price.vue';
import { IOrderDetail } from '../../serve/api/types/order.type';

defineProps<{ goods: IOrderDetail[] }>()
</script>

<style scoped>
.good-card {
  display: flex;
  width: 100%;
  gap: 20rpx;
}

.good-card image {
  height: 150rpx;
  width: 150rpx;
  border: 1px solid #eee;
  border-radius: 10rpx;
}

.good-card_content {
  font-size: 14px;
  flex: 1;
}

.good-content_up {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10rpx;
}

.content-up_name {
  width: 380rpx;
  line-height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.good-content_down {
  display: flex;
  justify-content: space-between;
  color: #ccc;
}

.content-up_attr {
  width: 420rpx;
  line-height: 20px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
}
</style>
