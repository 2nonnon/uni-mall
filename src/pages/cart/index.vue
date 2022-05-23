<template>
  <view class="cart">
    <view class="cart-main">
      <view class="goods-list" v-if="hasCart">
        <view class="good-card" v-for="item in cartlist" :key="item.id">
          <checkbox class="card-checkbox" :checked="item.checked" @click="checkCart(item)" />
          <view class="good-img" @click="handleToGoodDetail(item.goodId)">
            <image :src="item.sku.img_url" mode="aspectFit" />
          </view>
          <view class="good-card_info">
            <view class="good-info_header">
              <view class="good-name" @click="handleToGoodDetail(item.goodId)">{{ item.goodName }}</view>
              <view class="good-delete" @click="deleteCart(item.id)">
                <icon type="cancel" size="20" />
              </view>
            </view>
            <view class="good-attr" @click="handleToGoodDetail(item.goodId)">{{ item.sku.name }}</view>
            <view class="good-info_footer">
              <view class="good-price" @click="handleToGoodDetail(item.goodId)">
                <price-vue :num-font="14" :cur-font="12" :has-fix="true" :price="[item.sku.market_price]"></price-vue>
              </view>
              <view class="good-count">
                <counter-vue v-model="item.quantity"></counter-vue>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="cart-footer" v-if="hasCart">
      <view class="submit-bar">
        <view class="submit-checkall">
          <checkbox class="card-checkbox" :checked="checkAll" @click="checkAllCart" />
          <text>全选</text>
        </view>
        <view class="submit-container">
          <view class="submit-info">
            <view class="submit-info_text">不含运费 合计</view>
            <view class="good-price">
              <price-vue :price="[totalPrice]" :has-fix="true" :cur-font="13" :num-font="16"></price-vue>
            </view>
          </view>
          <view>
            <view :class="{ 'good-settle_disable': notHasChecked }" class="good-settle" @click="handleSettle">
              结算
            </view>
          </view>
        </view>
      </view>
    </view>
    <empty-placeholder class="cart-empty"
      url="../../static/status/432e3e45a99c0e0d5b462045e478fdc8_6064925561101343264.webp" text="您的购物车空空如也~" v-else>
    </empty-placeholder>
  </view>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import CounterVue from "../../components/Counter/Counter.vue";
import PriceVue from "../../components/Price/Price.vue";
import { useCart } from "../../composables/useCart"
import { orderService } from "../../serve/api/order";
import EmptyPlaceholder from "../../components/EmptyPlaceholder/index.vue"

const {
  hasCart,
  cartlist,
  checkAll,
  notHasChecked,
  totalPrice,
  checkCart,
  checkAllCart,
  loadCartlist,
  deleteCart,
  deleteCarts } = useCart()

const handleToGoodDetail = (id: string) => {
  uni.navigateTo({
    url: `../detail/index?id=${id}`
  })
}

const handleSettle = () => {
  if (notHasChecked.value) return
  const ids: number[] = [];
  const settleGoods = cartlist.filter((item) => item.checked);
  const paid = settleGoods.reduce((res, cur) => {
    ids.push(cur.id);
    return res + cur.quantity * cur.sku.market_price;
  }, 0);
  const orderDetails = settleGoods.map((item) => {
    return {
      goodId: item.id,
      cover_url: item.sku.img_url,
      name: item.goodName,
      attr: item.sku.name,
      quantity: item.quantity,
      market_price: item.sku.market_price,
      paid: item.quantity * item.sku.market_price,
    };
  });
  orderService
    .createOrder({
      paid: paid,
      orderDetails: orderDetails,
    })
    .then((res) => {
      console.log("create order", res);
      console.log(ids);
      deleteCarts(ids)
      uni.navigateTo({
        url: `../confirm/index?id=${res.id}`,
      })
    });
};

onMounted(() => {
  loadCartlist();
});
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

.card-checkbox {
  transform: scale(.7);
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
  width: 300rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.good-attr {
  font-size: 14px;
  line-height: 20px;
  width: 300rpx;
  height: 40px;
  color: #9696a1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
}

.good-price {
  font-weight: bolder;
}

.cart-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

.submit-bar {
  background-color: #fff;
  padding: 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.submit-checkall {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.submit-container,
.submit-info {
  display: flex;
  align-items: center;
}

.submit-container {
  gap: 20rpx;
}

.submit-info {
  align-items: flex-end;
}

.submit-info_text {
  font-size: 14px;
  line-height: 20px;
  margin-right: 10rpx;
}

.good-settle {
  width: 180rpx;
  min-width: 180rpx;
  height: 56rpx;
  font-size: 14px;
  line-height: 20px;
  border-radius: 28rpx;
  color: #fff;
  background-color: #ff6d6d;
  font-weight: bold;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.good-settle_disable {
  color: #c5c5cb;
  background-color: #f3f3f4;
}
</style>
