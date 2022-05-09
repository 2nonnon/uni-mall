<template>
  <view class="goodlist-container">
    <view class="goodlist-header">
      <view class="goodlist-header_search">
        <input class="search-input" v-model="search" placeholder="雷电将军" placeholder-class="input-placeholder"
          @confirm="handleSearch()">
        <icon class="search-icon" type="search" :size="14" color="" />
      </view>
      <view class="goodlist-header_bar">
        <view class="goodlist-header_sort">
          <view class="sort-item" :class="{ 'sort-item_active': item === sort }" v-for="item in sortItems" :key="item"
            @click="handleSort(item)">{{
                sortMap[item]
            }}</view>
        </view>
        <view class="goodlist-header_category" @click="handleToCategory">分类</view>
      </view>
    </view>
    <scroll-view scroll-y refresher-enabled :refresher-triggered="refresherTriggered"
      @refresherrefresh="handleRefresherrefresh()" :scroll-top="scrollTop" @scrolltolower="handleScrollToLower()"
      class="goodlist-body" v-if="hasGood">
      <view class="goodlist-card_container">
        <view class="goodlist-card" v-for="item in goodlist" :key="item.id" @click="handleToDetail(item.id)">
          <view class="card-image">
            <image :src="item.cover_url" mode="aspectFit" />
          </view>
          <view class="card-content">
            <view class="card-content_wrapper">
              <image v-if="item.tag > 0" :src="tagMap[item.tag]" mode="aspectFit" />
              <text class="card-content_name">{{ item.name }}</text>
            </view>
            <view class="card-content_price">
              <price-vue :price="[item.market_price]" :has-fix="true" :cur-font="12" :num-font="16"></price-vue>
            </view>
          </view>
        </view>
        <view class="card-placeholder" v-if="placeholder" />
      </view>
    </scroll-view>
    <empty-placeholder class="goodlist-empty"
      url="../../static/status/f5f2cc4fe8253c706d0f69dd7ba23326_5226366700752376093.png" text="没有找到相关商品" v-else>
    </empty-placeholder>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { goodService } from '../../serve/api/good';
import { GetGoodsPageDto, IGood, Sort } from '../../serve/api/types/good.type';
import PriceVue from '../../components/Price/Price.vue';
import EmptyPlaceholder from "../../components/EmptyPlaceholder/index.vue"
import { useCategory } from '../../composables/useCategory';

const { currentCategory } = useCategory()
const refresherTriggered = ref(false)
const search = ref('')

const sortMap = {
  [Sort.PRICE]: '价格↑',
  [Sort.PRICE_DES]: '价格↓',
  [Sort.SOLED]: '销量',
  [Sort.TIME]: '上架时间'
}
const tagMap = {
  1: '../../static/status/b62a22805ff37997c816cb91984d71be_1387051523058128219.png',
  3: '../../static/status/52a332d5a64c66bd3471f5ed39c35868_7340073586395887667.png'
}
const sortItems = Object.values(Sort)
const sort = ref<Sort>(Sort.TIME)

const total = ref(0)
const goodlist = reactive<IGood[]>([])
const placeholder = computed(() => {
  return goodlist.length === total.value && total.value % 2 !== 0
})
const scrollTop = ref(0)
const baseConfig = reactive({
  current_page: 1,
  page_size: 12
})
const hasGood = computed(() => {
  return goodlist.length > 0
})

const generateConfig = (): GetGoodsPageDto => {
  const config = Object.assign({}, baseConfig) as GetGoodsPageDto
  config.sort = sort.value
  config.category = currentCategory.value?.id
  return config
}

const initGoodList = () => {
  goodlist.length = 0
  baseConfig.current_page = 1
}

const load = (options: GetGoodsPageDto) => {
  goodService.getGoods(options).then((res) => {
    total.value = res.total
    goodlist.push(...res.goods)
    if (refresherTriggered.value) refresherTriggered.value = false
  })
}

const handleScrollToLower = () => {
  console.log(11111111111)
  baseConfig.current_page += 1
  load(generateConfig())
}

const handleRefresherrefresh = () => {
  if (refresherTriggered.value) return
  refresherTriggered.value = true
  initGoodList()
  load(generateConfig())
}

const handleSearch = () => {
  initGoodList()
  load(Object.assign({ search: search.value }, baseConfig) as GetGoodsPageDto)
}

const handleSort = (item: Sort) => {
  sort.value = item
  initGoodList()
  load(generateConfig())
}

const handleToCategory = () => {
  uni.navigateTo({
    url: `../category/index`,
  })
}

const handleToDetail = (id: number) => {
  uni.navigateTo({
    url: `../detail/index?id=${id}`,
  })
}

watch(currentCategory, () => {
  console.log(currentCategory.value)
  initGoodList()
  load(generateConfig())
})

onMounted(() => {
  load(generateConfig())
})
</script>

<style scoped>
.goodlist-container {
  --height: 80rpx;
  min-height: 100vh;
}

.goodlist-header {
  padding-top: var(--status-bar-height);
}

.goodlist-header_search {
  height: var(--height);
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
  font-size: 14px;
  background-color: #eee;
  border-radius: 999rpx;
  padding-left: 72rpx;
  box-sizing: border-box;
  margin-left: 30rpx;
}

.goodlist-header_bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding: 0 30rpx;
}

.goodlist-header_sort {
  display: flex;
  height: var(--height);
  gap: 30rpx;
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

.goodlist-empty {
  height: calc(100vh - var(--status-bar-height) - 2 * var(--height));
  width: 100%;
}

.goodlist-body {
  height: calc(100vh - var(--status-bar-height) - 2 * var(--height));
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

.card-image image {
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

.card-content_wrapper {
  line-height: 20px;
  font-size: 14px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
}

.card-content_wrapper image {
  height: 20px;
  vertical-align: -25%;
  width: 90rpx;
  margin-right: 10rpx;
}

.card-content_price {
  margin-top: 10px;
  font-weight: bolder;
  font-style: italic;
}

.card-placeholder {
  flex: 1 0 40%;
}
</style>
