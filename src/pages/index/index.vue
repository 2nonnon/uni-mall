<template>
  <view class="content">
    <view class="goodlist-header">
      <view class="goodlist-header_search">
        <input class="goodlist-header_input" v-model="title" placeholder="" placeholder-class="input-placeholder" @input="" />
      </view>

    </view>

  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { goodService } from '../../serve/api/good';
const title = ref('Hello')

const load = () => {
  goodService.getGoods({current_page: 1, page_size: 10}).then((res) => {
    console.log(res)
  })
}

onMounted(() => {
  load()
})
</script>

<style scoped>
.content {
  min-height: 100vh;
  position: relative;
}
.goodlist-header {
  position: sticky;
  top: 25px;
}
.goodlist-header_search {
  height: 72rpx;
}
.goodlist-header_input {
  height: 100%;
  width: 480rpx;
  border: 1rpx solid #eee;
  background-color: #eee;
  border-radius: 999rpx;
  padding-left: 30rpx;
  box-sizing: border-box;
  margin-left: 30rpx;
}
</style>
