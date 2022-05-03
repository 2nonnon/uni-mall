<template>
  <view class="content">
    <input v-model="title" placeholder="" placeholder-class="input-placeholder" @input="" />
    <image class="logo" src="/static/logo.png" @click="login" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { loginService } from '../../serve/api/login';
const title = ref('Hello lallala')

const login = () => {
  loginService.signin().then((res) => {
    console.log(res)
  })
}

// const login = () => {
//   console.log('登录')
//   uni.login({
//     provider: 'weixin',
//     success: function (loginRes) {
//       console.log(loginRes.code);
//       uni.request({
//         url: `http://localhost:5191/auth/wxsignin/${loginRes.code}`,
//         success: (res) => {
//           console.log(res.data);
//         }
//       })
//     }
//   });
// }
// https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
// wx67c5836bd9748907
// cf939ea964b8ae316b21d3905911d991

const get = (code: string) => {
  uni.request({
    url: 'https://api.weixin.qq.com/sns/jscode2session',
    data: {
      appid: 'wx67c5836bd9748907',
      secret: 'cf939ea964b8ae316b21d3905911d991',
      js_code: code,
      grant_type: 'authorization_code'
    },
    success: (res) => {
      console.log(res.data);
    }
  });
}
</script>

<style  scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ff6d6d;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
