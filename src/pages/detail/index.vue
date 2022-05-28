<template>
  <view class="content">
    <view class="detail-banner_wrapper">
      <swiper circular :current="currentBannerImg" class="detail-banner">
        <swiper-item v-for="item in data.banner" :key="item">
          <image :src="item" mode="aspectFit" class="detail-banner_image" />
        </swiper-item>
      </swiper>
    </view>
    <view class="detail-content">
      <view class="detail-content_wrapper">
        <image v-if="data.tag > 0" :src="tagMap[data.tag as 1 | 3]" mode="aspectFit" />
        <text class="detail-content_name">{{ data.name }}</text>
      </view>
      <view class="detail-content_price">
        <price-vue :price="[data.market_price]"></price-vue>
      </view>
      <view class="detail-content_choose" @click="handleShowChoose">
        <text>请选择商品款式</text>
        <image src="../../static/icon/arrow-right.png" mode="scaleToFill" />
      </view>
    </view>
    <view class="detail-detail">
      <view class="detail-detail_title">商品详情</view>
      <view class="detail-detail_body">
        <image v-for="item in data.detail" :key="item" :src="item" class="detail-detail_image" mode="widthFix" />
      </view>
    </view>
    <view class="detail-footer">
      <view class="detail-footer_icon " @click="handleToggleCollect">
        <image :src="hasCollected ? '../../static/icon/collection-fill.png' : '../../static/icon/collection.png'"
          mode="scaleToFill" />
      </view>
      <button open-type="contact" class="detail-footer_icon button-reset">
        <image src="../../static/icon/service.png" mode="scaleToFill" />
      </button>
      <view class="detail-footer_icon" @click="handleToCart">
        <image src="../../static/icon/cart-Empty.png" mode="scaleToFill" />
      </view>
      <view class="detail-btn detail-btn_add" @click="handleShowChoose">
        加入购物车
      </view>
      <view class="detail-btn detail-btn_buy" @click="handleShowChoose"> 立即购买 </view>
    </view>
    <view class="detail-choose_wrapper" v-if="showChoose">
      <view class="detail-choose_shade" @click="handleCloseChoose"></view>
      <view class="detail-choose">
        <view class="detail-choose_header">
          <view class="detail-choose_image">
            <image :src="skuImg" mode="aspectFit" class="detail-banner_image" />
          </view>
          <view class="detail-choose_content">
            <view class="detail-choose_price">
              <price-vue :price="[price]"></price-vue>
            </view>
            <view class="detail-choose_stock">{{ `剩余${stock}件` }}</view>
          </view>
          <view class="detail-choose_close" @click="handleCloseChoose"> X </view>
        </view>
        <view class="detail-choose_body">
          <view class="detail-sku" v-for="sku in data.attributes" :key="sku.id">
            <view class="detail-sku_key">
              {{ sku.name }}
            </view>
            <view class="detail-sku_value-container">
              <view class="detail-sku_value" :class="{ 'detail-sku_choose': skuChoose.some((_) => _.id === item.id) }"
                v-for="item in sku.children" :key="item.id" @click="handleChooseSku(item)">
                {{ item.name }}
              </view>
            </view>
          </view>
          <view class="detail-counter_wrapper">
            <view class="detail-counter_text">购买数量</view>
            <view class="detail-counter">
              <counter-vue v-model="counter"></counter-vue>
            </view>
          </view>
        </view>
        <view class="detail-choose_footer">
          <view class="detail-btn detail-btn_add detail-detail_btn" @click="handleAddCart">
            加入购物车
          </view>
          <view class="detail-btn detail-btn_buy detail-detail_btn" @click="settleValidate">
            立即购买
          </view>
        </view>
      </view>
    </view>
  </view>
  <message-vue ref="message"></message-vue>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { computed, reactive, ref, watch } from "vue";
import { goodService } from "../../serve/api/good";
import { IGoodDetail, ISku } from "../../serve/api/types/good.type";
import CounterVue from "../../components/Counter/Counter.vue";
import PriceVue from "../../components/Price/Price.vue";
import MessageVue from "../../components/Message/index.vue"
import { IAttribute } from "../../serve/api/types/attribute.type";
import { useCart } from "../../composables/useCart";
import { orderService } from "../../serve/api/order";
import { useUser } from "../../composables/useUser";
const tagMap = {
  1: "../../static/status/b62a22805ff37997c816cb91984d71be_1387051523058128219.png",
  3: "../../static/status/52a332d5a64c66bd3471f5ed39c35868_7340073586395887667.png",
};

const { userInfo, getUserInfo, handleAddCollection,
  handleDeleteCollection } = useUser()

const { addCart } = useCart();

const currentBannerImg = ref(0);
const data = reactive({} as IGoodDetail);
const counter = ref(1);

const showChoose = ref(false);
const skuImg = ref("");
const stock = ref(data.total_stock ?? 0);
const price = ref(data.market_price ?? 0);
const skuChoose = reactive<IAttribute[]>([]);
const choosedId = ref(-1);
const choosedSku = reactive({} as ISku);

const hasCollected = computed(() => {
  return Boolean(userInfo.value?.collection.includes(`${data.id}`))
})

const load = (id: string) => {
  goodService.getGoodDetailById(id).then((res) => {
    Object.assign(data, res);
    skuImg.value = data.cover_url;
    stock.value = data.total_stock
    price.value = data.market_price
    console.log(res);
  });
};

const message = ref<{
  handleShowMessage: (message: string, interval?: number) => void;
} | null>(null)

const settleValidate = () => {
  if (choosedId.value < 0) {
    message.value?.handleShowMessage('请先选择商品款式')
  }
  else handleSettle()
}

const handleShowChoose = () => {
  showChoose.value = true;
};
const handleCloseChoose = () => {
  showChoose.value = false;
};
const handleChooseSku = (attr: IAttribute) => {
  console.log(attr);
  const index = skuChoose.findIndex((item) => item.parentId === attr.parentId);
  console.log(index);
  if (index >= 0) {
    const [pre] = skuChoose.splice(index, 1);
    if (pre.id === attr.id) {
      return;
    }
  }
  console.log(skuChoose);
  skuChoose.push(attr);
};

const handleToggleCollect = () => {
  console.log(userInfo.value, hasCollected.value)
  if (hasCollected.value) {
    console.log(1)
    handleDeleteCollection(data.id)
  } else {
    console.log(2)
    handleAddCollection(data.id)
  }
};
const handleToCart = () => {
  uni.switchTab({
    url: `../cart/index`,
  });
};

const handleAddCart = () => {
  addCart({
    skuId: choosedId.value,
    quantity: counter.value,
    goodId: data.id,
    goodName: data.name,
  });
  showChoose.value = false;
};

const handleSettle = () => {
  const orderDetails = [
    {
      goodId: data.id,
      cover_url: choosedSku.img_url,
      name: data.name,
      attr: choosedSku.name,
      quantity: counter.value,
      market_price: choosedSku.market_price,
      paid: counter.value * choosedSku.market_price,
    },
  ];
  orderService
    .createOrder({
      paid: counter.value * choosedSku.market_price,
      orderDetails: orderDetails,
    })
    .then((res) => {
      console.log("create order", res);
      uni.navigateTo({
        url: `../confirm/index?id=${res.id}`,
      });
    });
};

watch(skuChoose, () => {
  if (skuChoose.length === data.attributes.length) {
    const choosed = data.skus.find((item) => {
      return item.attributes.every((attr) => {
        if (attr.parentId === 0) return true;
        else {
          return skuChoose.some((sku) => sku.id === attr.id);
        }
      });
    });

    if (choosed) {
      Object.assign(choosedSku, choosed);
      stock.value = choosed.stock;
      price.value = choosed.market_price;
      skuImg.value = choosed.img_url;
      choosedId.value = choosed.id;
    }
  }
});

onLoad((option) => {
  console.log(option.id);
  load(option.id!);
  if (!userInfo) getUserInfo()
});
</script>

<style scoped>
.button-reset {
  font-size: 14px;
  background-color: inherit;
  line-height: inherit;
  margin: 0;
  padding: 0;
  height: 100%;
}

.button-reset::after {
  border: none;
}

.content {
  display: flex;
  flex-direction: column;
  background-color: #eee;
}

.detail-banner_wrapper {
  background-color: #fff;
  width: 100%;
}

.detail-banner {
  width: 100%;
}

.detail-banner_image {
  height: 100%;
  width: 100%;
}

.detail-content {
  background-color: #fff;
  padding: 30rpx;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.detail-content_wrapper {
  line-height: 20px;
  font-size: 16px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
}

.detail-content_wrapper image {
  height: 20px;
  vertical-align: -25%;
  width: 100rpx;
  margin-right: 10rpx;
}

.detail-content_price {
  font-size: 24px;
  font-weight: bolder;
}

.detail-content_choose {
  border-top: 1rpx solid #eee;
  color: #7a7e83;
  padding: 20rpx 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.detail-content_choose image {
  width: 50rpx;
  height: 50rpx;
}

.detail-detail {
  background-color: #fff;
  margin-top: 20rpx;
  font-size: 0;
}

.detail-detail_title {
  padding: 20rpx 30rpx;
  font-size: 16px;
}

.detail-detail_image {
  width: 100%;
}

.detail-footer {
  display: flex;
  position: fixed;
  justify-content: space-evenly;
  align-items: center;
  height: 100rpx;
  width: 100%;
  left: 0;
  bottom: 0;
  background-color: #fff;
}

.detail-btn {
  height: 80rpx;
  border: none;
  width: 220rpx;
  border-radius: 40rpx;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}

.detail-btn_add {
  color: #ff6d6d;
  background-color: #ffeeee;
}

.detail-btn_buy {
  color: #fff;
  background-color: #ff6d6d;
}

.detail-choose_wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
}

.detail-choose_shade {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.detail-choose {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  padding: 30rpx;
  padding-bottom: 0;
}

.detail-choose_header {
  display: flex;
  gap: 15rpx;
}

.detail-choose_image {
  width: 200rpx;
  height: 200rpx;
  border: 1rpx solid #eee;
}

.detail-choose_content {
  align-self: flex-end;
}

.detail-choose_price {
  font-weight: bolder;
}

.detail-choose_stock {
  font-size: 14px;
  color: #7a7e83;
}

.detail-choose_close {
  margin-left: auto;
  color: #eee;
  align-self: flex-start;
}

.detail-choose_body {
  padding: 20rpx 0;
  min-height: 15vh;
  max-height: 50vh;
  overflow: auto;
}

.detail-sku {
  padding-top: 10rpx;
}

.detail-sku_value-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30rpx;
  padding: 20rpx 0;
}

.detail-sku_value {
  background-color: #eee;
  border-radius: 10rpx;
  padding: 10rpx 30rpx;
  font-size: 14px;
}

.detail-sku_choose {
  background-color: #ff6d6d;
  color: #fff;
}

.detail-counter_wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1rpx solid #e5e5e5;
  padding: 20rpx 0;
  border-top: 1rpx solid #eee;
}

.detail-choose_footer {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100rpx;
  gap: 30rpx;
}

.detail-footer_icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.detail-footer_icon image {
  height: 60rpx;
  width: 60rpx;
}

.detail-detail_btn {
  flex: 1 1 0;
}
</style>
