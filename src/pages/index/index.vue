<template>
  <view class="content">
    <view class="goodlist-header">
      <view class="goodlist-header_search">
        <input class="search-input" v-model="search" placeholder="雷电将军" placeholder-class="input-placeholder"
          @confirm="handleSearch()">
        <icon class="search-icon" type="search" :size="14" color="" />
      </view>
      <view class="goodlist-header_sort">
        <view class="sort-item" :class="{ 'sort-item_active': item === sort }" v-for="item in sortItems" :key="item"
          @click="handleSort(item)">{{
              sortMap[item]
          }}</view>
      </view>
    </view>
    <scroll-view scroll-y refresher-enabled :refresher-triggered="refresherTriggered"
      @refresherrefresh="handleRefresherrefresh()" :scroll-top="scrollTop" @scrolltolower="handleScrollToLower()"
      class="goodlist-body">
      <view class="goodlist-card_container">
        <view class="goodlist-card" v-for="item in data" :key="item.id" @click="handleToDetail(item.id)">
          <view class="card-image">
            <image :src="item.cover_url" mode="aspectFit" />
          </view>
          <view class="card-content">
            <view class="card-content_name">{{ item.name }}</view>
            <view class="card-content_price">
              <price-vue :price="[item.market_price]"></price-vue>
            </view>
          </view>
        </view>
        <view class="card-placeholder" v-if="placeholder" />
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { goodService } from '../../serve/api/good';
import { GetGoodsPageDto, IGood, Sort } from '../../serve/api/types/good.type';
import PriceVue from '../../components/Price/Price.vue';

const refresherTriggered = ref(false)
const search = ref('')

const sortMap = {
  [Sort.PRICE]: '价格↑',
  [Sort.PRICE_DES]: '价格↓',
  [Sort.SOLED]: '销量',
  [Sort.TIME]: '上架时间'
}
const sortItems = Object.values(Sort)
const sort = ref<Sort>(Sort.TIME)

const currentPage = ref(1)
const pageSize = ref(12)
const total = ref(0)
const data = reactive<IGood[]>([])
const placeholder = computed(() => {
  return data.length === total.value && total.value % 2 !== 0
})
const scrollTop = ref(0)

const generateConfig = (config: GetGoodsPageDto = {} as GetGoodsPageDto): GetGoodsPageDto => {
  config.current_page = currentPage.value
  config.page_size = pageSize.value
  config.sort = sort.value
  return config
}

const load = (options: GetGoodsPageDto) => {
  goodService.getGoods(options).then((res) => {
    total.value = res.total
    data.push(...res.goods)
    if (refresherTriggered.value) refresherTriggered.value = false
  })
}

const handleScrollToLower = () => {
  console.log(11111111111)
  currentPage.value += 1
  load(generateConfig())
}

const handleRefresherrefresh = () => {
  if (refresherTriggered.value) return
  refresherTriggered.value = true
  data.length = 0
  currentPage.value = 1
  load(generateConfig())
}

const handleSearch = () => {
  data.length = 0
  currentPage.value = 1
  load(generateConfig({ search: search.value } as GetGoodsPageDto))
}

const handleSort = (item: Sort) => {
  data.length = 0
  currentPage.value = 1
  sort.value = item
  load(generateConfig())
}

const handleToDetail = (id: number) => {
  uni.navigateTo({
    url: `../detail/index?id=${id}`,
  })
}

onMounted(() => {
  load(generateConfig())
})
</script>

<style scoped>
.content {
  height: 100vh;
}

.goodlist-header {
  padding-top: 25px;
  padding-bottom: 5px;
}

.goodlist-header_search {
  height: 80rpx;
  display: flex;
  align-items: center;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 56rpx;
  top: 50%;
  transform: translate(0, -50%);
}

.search-input {
  height: 70rpx;
  width: 480rpx;
  background-color: #eee;
  border-radius: 999rpx;
  padding-left: 72rpx;
  box-sizing: border-box;
  margin-left: 30rpx;
}

.goodlist-header_sort {
  display: flex;
  height: 80rpx;
  gap: 30rpx;
  font-size: 32rpx;
  padding: 0 30rpx;
}

.sort-item {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sort-item_active {
  color: #ff6d6d;
}

.goodlist-body {
  height: calc(100vh - 25px - 72rpx - 80rpx);
}

.goodlist-card_container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20rpx;
  background-color: #eee;
  padding: 30rpx;
}

.goodlist-card {
  flex: 1 0 40%;
  background-color: #fff;
  border-radius: 10rpx;
  overflow: hidden;
}

.card-image {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.card-image::after {
  content: '';
  display: block;
  width: 100%;
  padding-bottom: 100%;
}

image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}
.card-content {
  padding: 10px;
}
.card-content_name {
  line-height: 20px;
  font-size: 14px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
}
.card-content_price {
  margin-top: 10px;
  font-size: 16px;
  font-weight: bolder;
  font-style: italic;
}
.card-placeholder {
  flex: 1 0 40%;
}
</style>
