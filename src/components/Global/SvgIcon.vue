<!-- 全局图标 -->
<template>
  <template v-if="showSlot">
    <slot />
  </template>
  <template v-else>
    <svg
      v-if="!isSpecial"
      class="svg-icon"
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      :style="size ? `font-size:${size}px` : null"
      viewBox="0 0 24 24"
    >
      <path fill="currentColor" :d="iconData[icon]" />
    </svg>
    <!-- 特殊图标处理 -->
    <template v-else>
      <svg
        v-if="icon === 'paste'"
        class="svg-icon"
        :width="width"
        :height="height"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.7778 5H14.6667C15.5047 5 15.9237 5 16.1841 5.2636C16.4444 5.52721 16.4444 5.95147 16.4444 6.8V10M13.7778 5V5.8C13.7778 6.22426 13.7778 6.4364 13.6476 6.5682C13.5174 6.7 13.3079 6.7 12.8889 6.7H7.55556C7.13653 6.7 6.92702 6.7 6.79684 6.5682C6.66667 6.4364 6.66667 6.22426 6.66667 5.8V5M13.7778 5C13.7778 4.57574 13.7778 4.2636 13.6476 4.1318C13.5174 4 13.3079 4 12.8889 4H7.55556C7.13653 4 6.92702 4 6.79684 4.1318C6.66667 4.2636 6.66667 4.57574 6.66667 5M6.66667 5H5.77778C4.93973 5 4.5207 5 4.26035 5.2636C4 5.52721 4 5.95147 4 6.8V17.1959C4 18.0445 4 18.4687 4.26035 18.7323C4.5207 18.9959 4.93973 18.9959 5.77778 18.9959H9.77778M14 20H18C18.9428 20 19.4142 20 19.7071 19.7071C20 19.4142 20 18.9428 20 18V14C20 13.0572 20 12.5858 19.7071 12.2929C19.4142 12 18.9428 12 18 12H14C13.0572 12 12.5858 12 12.2929 12.2929C12 12.5858 12 13.0572 12 14V18C12 18.9428 12 19.4142 12.2929 19.7071C12.5858 20 13.0572 20 14 20Z"
          stroke="#464455"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <!-- 随机播放 -->
      <svg
        v-if="icon === 'shuffle'"
        class="svg-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 17h2.735a4 4 0 0 0 3.43-1.942l3.67-6.116A4 4 0 0 1 16.265 7H21m0 0l-2-2m2 2l-2 2M3 7h2.735a4 4 0 0 1 2.871 1.215M21 17h-4.735a4 4 0 0 1-2.871-1.215M21 17l-2 2m2-2l-2-2"
        />
      </svg>
      <!-- 列表循环 -->
      <svg
        v-if="icon === 'repeat-list'"
        class="svg-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
          <path stroke-linejoin="round" d="m19 5l2 2m0 0l-2 2m2-2H7M5 19l-2-2m0 0l2-2m-2 2h14" />
          <path d="M3 11a4 4 0 0 1 4-4m14 6a4 4 0 0 1-4 4" />
        </g>
      </svg>
      <!-- 单曲循环 -->
      <svg
        v-if="icon === 'repeat-song'"
        class="svg-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
          <path stroke-linejoin="round" d="M21 9V4l-2 1m-4 2H7M5 19l-2-2m0 0l2-2m-2 2h14" />
          <path d="M3 11a4 4 0 0 1 4-4m14 6a4 4 0 0 1-4 4" />
        </g>
      </svg>
      <!-- 心动模式 -->
      <svg
        v-if="icon === 'heartbit'"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 48 48"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="4"
        >
          <path stroke-miterlimit="2" d="m11 32l7-9l6 9l6-9l5 8h9" />
          <path
            d="M44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326c1.194-.397 2.562-1.016 4.01-1.826"
          />
        </g>
      </svg>
    </template>
  </template>
</template>

<script setup>
import iconData from "@/assets/icon.json";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    default: "32",
  },
  height: {
    type: String,
    default: "32",
  },
  size: {
    type: String,
  },
  showSlot: {
    type: Boolean,
    default: false,
  },
  // 是否为特殊图标
  isSpecial: {
    type: Boolean,
    default: false,
  },
});
</script>
