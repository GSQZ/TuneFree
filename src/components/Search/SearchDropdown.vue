<!-- 封面列表 - 右键菜单 -->
<template>
  <n-dropdown
    :x="dropdownX"
    :y="dropdownY"
    :show="dropdownShow"
    :options="dropdownOptions"
    placement="bottom-start"
    trigger="manual"
    size="large"
    @select="dropdownShow = false"
    @clickoutside="dropdownShow = false"
  >
  </n-dropdown>
</template>

<script setup>
import { NIcon } from "naive-ui";
import { copyData } from "@/utils/helper";
import SvgIcon from "@/components/Global/SvgIcon";
import { getClipboard } from "@/utils/helper";

// 右键菜单数据
const dropdownX = ref(0);
const dropdownY = ref(0);
const dropdownShow = ref(false);
const dropdownOptions = ref(null);
const emit = defineEmits(["input", "toSearch"]);

// 图标渲染
const renderIcon = (icon, size, translate = 0, isSpecial = false) => {
  return () =>
    h(
      NIcon,
      {
        size: size ?? "18",
        style: { transform: `translateX(2px) translateY(${translate}px)` },
        isSpecial: isSpecial,
      },
      () => h(SvgIcon, { icon, isSpecial }),
    );
};

const input = (content) => {
  emit("input", content);
};

const toSearch = (val, type = "song") => {
  emit("toSearch", val, type);
};

// 打开右键菜单
const openDropdown = (e) => {
  e.preventDefault();
  dropdownShow.value = false;
  nextTick().then(async () => {
    // 右键菜单数据
    let options = [
      {
        key: "copy",
        label: "复制搜索框内容",
        props: {
          onClick: () => {
            copyData(e.target.value);
          },
        },
        icon: renderIcon("content-copy", 20, true),
      },
    ];
    let extraOptions = [];
    const clipboard = await getClipboard();
    if (clipboard) {
      extraOptions = [
        {
          key: "paste",
          label: "粘贴",
          props: {
            onClick: () => {
              input(clipboard);
            },
          },
          icon: renderIcon("content-copy", 20),
        },
        {
          key: "paste_and_search_song",
          label: "粘贴并搜索",
          props: {
            onClick: () => {
              input(clipboard);
              toSearch(clipboard);
            },
          },
          icon: renderIcon("search-rounded", 20),
        },
      ];
    }
    // 右键菜单状态
    dropdownOptions.value = options.concat(extraOptions);
    dropdownShow.value = true;
    dropdownX.value = e.clientX;
    dropdownY.value = e.clientY;
  });
};

defineExpose({
  openDropdown,
});
</script>
