<template>
  <view class="cart">
    <view class="cart-main">
      <view class="goods-list" v-if="data.length > 0">
        <view class="good-card" v-for="item in data" :key="item.id">
          <checkbox class="card-checkbox" :value="1" :checked="item.checked" @change="handleCheck" />
          <view class="good-img">
            <image :src="item.sku.img_url" mode="aspectFit" />
          </view>
          <view class="good-card_info">
            <view class="good-info_header">
              <view class="good-name">{{ item.goodName }}</view>
              <view class="good-delete" @click="handleDelete(item.id)">
                <icon type="cancel" size="20" />
              </view>
            </view>
            <view class="good-attr">{{ item.sku.name }}</view>
            <view class="good-info_footer">
              <view class="good-price">
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
    <view class="cart-footer">
      <view class="submit-bar">
        <checkbox class="card-checkbox" :value="1" :checked="checkAll" @change="handleCheckAll" />
        <view class="submit-container">
          <view class="submit-info">
            <view class="font-lg">合计（不含运费）：</view>
            <view class="good-price">
              <price-vue :price="[totalPrice]" :has-fix="true" :cur-font="12" :num-font="14"></price-vue>
            </view>
          </view>
          <view>
            <button :disabled="btnDisabled" class="settle" @click="handleSettle">
              结算
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import CounterVue from "../../components/Counter/Counter.vue";
import PriceVue from "../../components/Price/Price.vue";
import { ref, reactive, onMounted, computed } from "vue";
import { ICart } from "../../serve/api/types/cart.type";
import { cartService } from "../../serve/api/cart";
import { orderService } from "../../serve/api/order";

interface CheckableCart extends ICart {
  checked: boolean;
}

const data = reactive<CheckableCart[]>([]);

const checkAll = ref(false);
const btnDisabled = ref(true);

const total = computed<number>(() => {
  return data.reduce((pre, cur) => {
    if (cur.checked) return pre + cur.quantity;
    else return pre;
  }, 0);
});
const totalPrice = computed<number>(() => {
  return data.reduce((pre, cur) => {
    if (cur.checked) return pre + cur.quantity * cur.sku.market_price;
    else return pre;
  }, 0);
});

const btnCheck = () => {
  const has = data.some((item) => item.checked);
  if (has) btnDisabled.value = false;
  else btnDisabled.value = true;
};

const handleCheck = () => {
  const isAll = data.every((item) => item.checked);
  if (isAll) checkAll.value = true;
  else checkAll.value = false;
  btnCheck();
};

const handleCheckAll = () => {
  data.forEach((item) => (item.checked = checkAll.value));
  btnCheck();
};

const handleSettle = () => {
  const ids: number[] = [];
  const settleGoods = data.filter((item) => item.checked);
  const paid = settleGoods.reduce((res, cur) => {
    ids.push(cur.id);
    return res + cur.quantity * cur.sku.market_price;
  }, 0);
  const orderDetaile = settleGoods.map((item) => {
    return {
      goodId: item.sku.id,
      cover_url: item.sku.img_url,
      name: item.sku.name,
      attr: item.sku.name,
      quantity: item.quantity,
      market_price: item.sku.market_price,
      paid: item.quantity * item.sku.market_price,
    };
  });
  orderService
    .createOrder({
      paid: paid,
      orderDetails: orderDetaile,
    })
    .then((res) => {
      console.log("create order", res);
      console.log(ids);
      cartService.deleteCartByIds({ ids });
    });
};

const handleDelete = (id: number) => {
  cartService.deleteCart(id).then((res) => {
    console.log("删除", res);
    load();
  });
};

const load = () => {
  cartService.getCarts().then((res) => {
    console.log("cart----", res);
    data.length = 0;
    data.push(
      ...res.map((item) => {
        const tmp = item as CheckableCart;
        tmp.checked = false;
        return tmp;
      })
    );
    console.log("data----", data);
  });
};

onMounted(() => {
  load();
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


.good-card {
  display: flex;
  align-items: center;
  padding: 30rpx;
  gap: 20rpx;
}

.good-img {
  width: 140rpx;
  height: 140rpx;
  border-radius: 10rpx;
  border: 1px solid #f3f3f4;
}

.good-img image {
  height: 100%;
  width: 100%;
}

.good-card_info {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.good-info_header,
.good-info_footer {
  display: flex;
  justify-content: space-between;
}

.good-name {
  line-height: 20px;
  font-size: 14px;
  width: 400rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.good-attr {
  font-size: 14px;
  line-height: 20px;
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
}

.submit-bar {
  background-color: #fff;
  padding: 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.submit-container,
.submit-info {
  display: flex;
  align-items: center;
}

.submit-info {
  align-items: flex-end;
}

.font-lg {
  font-size: 14px;
  line-height: 20px;
}

button.settle {
  width: 180rpx;
  min-width: 180rpx;
  height: 56rpx;
  font-size: 18px;
  line-height: 24px;
  border-radius: 8px;
  border: 2px solid #ff6d6d;
  padding: 0 28rpx;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.settle {
  color: #fff;
  background-color: #ff6d6d;
  position: relative;
}

.settle::after {
  content: "";
  position: absolute;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0);
  border-radius: 8px;
  opacity: 0;
  width: 100%;
  height: 100%;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.settle:not(:disabled):hover::after {
  opacity: 1;
}

.settle:disabled {
  color: #c5c5cb;
  background-color: #f3f3f4;
  border-color: #f3f3f4;
  cursor: not-allowed;
}

.total_price {
  font-weight: 500;
  color: #ff6d6d;
}
</style>
