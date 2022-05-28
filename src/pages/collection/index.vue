<template>
  <view class="cart">
    <view class="cart-main">
      <view class="goods-list" v-if="hasCollection">
        <view class="good-card" v-for="item in data" :key="item.id"  @click="handleToGoodDetail(`${item.id}`)">
          <view class="good-img">
            <image :src="item.cover_url" mode="aspectFit" />
          </view>
          <view class="good-card_info">
            <view class="good-info_header">
              <view class="good-name">{{ item.name }}</view>
            </view>
            <view class="good-info_footer">
              <view class="good-price">
                <price-vue :num-font="14" :cur-font="12" :has-fix="true" :price="[item.market_price]"></price-vue>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <empty-placeholder class="cart-empty"
      url="../../static/status/432e3e45a99c0e0d5b462045e478fdc8_6064925561101343264.webp" text="您的收藏夹空空如也~"
      v-if="!hasCollection">
    </empty-placeholder>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from "vue"
import PriceVue from "../../components/Price/Price.vue"
import EmptyPlaceholder from "../../components/EmptyPlaceholder/index.vue"
import { useUser } from "../../composables/useUser"
import { IGood } from "../../serve/api/types/good.type"
import { goodService } from "../../serve/api/good"

const data = reactive<IGood[]>([])
const { userInfo } = useUser()

const hasCollection = computed(() => {
  return data.length > 0
})

const handleToGoodDetail = (id: string) => {
  uni.navigateTo({
    url: `../detail/index?id=${id}`
  })
}

const load = () => {
  goodService.getGoodByIds(userInfo.value!.collection).then(res => {
    data.length = 0
    data.push(...res)
  })
}

onMounted(() => {
  load()
})
</script>

<style scoped>
.cart {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: #eee;
}

.cart-main {
  background-color: #fff;
}

.good-card {
  display: flex;
}

.cart-empty {
  width: 100%;
  height: 100vh;
}

.good-card {
  display: flex;
  align-items: center;
  padding: 30rpx;
}

.good-card:not(:last-child) {
  border-bottom: 1px solid #f3f3f4;
}

.good-img {
  width: 180rpx;
  height: 180rpx;
  border-radius: 10rpx;
  border: 1px solid #f3f3f4;
  margin-right: 20rpx;
}

.good-img image {
  height: 100%;
  width: 100%;
}

.good-card_info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 50rpx;
}

.good-info_header,
.good-info_footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.good-name {
  line-height: 20px;
  font-size: 14px;
  width: 450rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.good-price {
  font-weight: bolder;
}
</style>
