<template>
    <view class="message-wrapper" v-if="showMessage">
        <view class="message-container">
            <view class="message_text">{{ msg }}</view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showMessage = ref(false)
const msg = ref('')
let timer: null | number = null

const handleShowMessage = (message: string, interval: number = 2000) => {
    console.log('message', message)
    msg.value = message
    showMessage.value = true
    console.log(timer, '1')
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
        showMessage.value = false
        timer = null
    }, interval)
    console.log(timer, '2')
}

defineExpose({
    handleShowMessage
})
</script>

<style scoped>
.message-wrapper {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
}

.message-container {
    background-color: rgba(0, 0, 0, 0.9);
    border-radius: 6px;
    padding: 10px 16px 10px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.message_text {
    color: rgba(255, 255, 255, 1);
}
</style>