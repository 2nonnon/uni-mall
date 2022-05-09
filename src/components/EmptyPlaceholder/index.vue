<template>
    <view class="empty-placeholder">
        <image :src="url" mode="aspectFit" />
        <view class="empty-placeholder_text">{{ text }}</view>
    </view>
</template>

<script setup lang="ts">
defineProps<{ url: string, text: string }>()
</script>

<style scoped>
.empty-placeholder {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.empty-placeholder image {
    margin-top: 15vh;
    width: 50vw;
    height: 55vw;
}

.empty-placeholder_text {
    color: #9696a1;
}
</style>