<template>
  <view class="input_number">
    <view class="input_button" :class="{ disable: modelValue <= range.min }" @click="handleDown">-</view>
    <input step="1" type="number" autocomplete="off" v-model="quantity" @blur="handleBlur" />
    <view class="input_button" :class="{ disable: modelValue >= range.max }" @click="handleUp">+</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Range {
  max: number
  min: number
}
const range: Range = { max: 50, min: 1 }

const props = defineProps<{ modelValue: number }>()
const emit = defineEmits(['update:modelValue'])

const quantity = ref(props.modelValue)

const modify = () => emit('update:modelValue', quantity.value)

const handleDown = () => {
  if (quantity.value <= range.min) return
  else {
    quantity.value -= 1
    modify()
  }
}
const handleUp = () => {
  if (quantity.value >= range.max) return
  else {
    quantity.value += 1
    modify()
  }
}
const handleBlur = () => {
  if (quantity.value <= range.min) {
    quantity.value = range.min
    modify()
  } else if (quantity.value >= range.max) {
    quantity.value = range.max
    modify()
  } else {
    modify()
  }
}
</script>

<style scoped>
.input_number {
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  background-color: #fff;
}

.input_number input {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50rpx;
  padding: 6rpx 7rpx;
  font-size: 14px;
  color: #16162e;
  line-height: 20px;
  border: none;
  border-radius: none;
  box-shadow: none;
  outline: none;
  appearance: none;
  text-align: center;
}

.input_button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50rpx;
  height: 50rpx;
  border-radius: 10rpx;
  color: #fff;
  background-color: #ff6d6d;
  font-weight: bold;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  vertical-align: initial;
  outline: none;
  padding: 0;
  font-size: 16px;
  line-height: 30rpx;
}

.input_number .disable {
  color: #f3f3f4;
  cursor: not-allowed;
  background-color: #fff;
  border: 1px solid #f3f3f4;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
