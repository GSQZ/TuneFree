<!-- 主导航栏 -->
<template>
  <nav :class="{ 'main-nav': true, 'no-sider': !showSider }">
    <div class="left">
      <div :class="['logo', asideMenuCollapsed ? 'collapsed' : null]" @click="router.push('/')">
        <n-avatar class="logo-img" src="/images/icons/favicon.png?asset" />
        <Transition name="fade" mode="out-in">
          <n-text v-if="!asideMenuCollapsed && showSider" class="site-name">
            {{ siteName }}
          </n-text>
        </Transition>
      </div>
      <n-flex :class="['navigation', { hidden: searchInputFocus }]" :size="6">
        <n-button :focusable="false" class="nav-icon" quaternary @click="router.go(-1)">
          <template #icon>
            <n-icon>
              <SvgIcon icon="chevron-left" />
            </n-icon>
          </template>
        </n-button>
        <n-button :focusable="false" class="nav-icon" quaternary @click="router.go(1)">
          <template #icon>
            <n-icon>
              <SvgIcon icon="chevron-right" />
            </n-icon>
          </template>
        </n-button>
      </n-flex>
      <!-- 搜索框 -->
      <SearchInp />
      <!-- GitHub -->
      <Transition name="fade" mode="out-in">
        <n-button
          v-if="showGithub"
          :focusable="false"
          class="github"
          circle
          quaternary
          @click="openGithub"
        >
          <template #icon>
            <n-icon size="20">
              <!-- 直接嵌入 SVG 图标 -->
              <svg t="1707297051552" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="25935" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M512 32C246.912 32 32 246.848 32 512s214.912 480 480 480c265.152 0 480-214.848 480-480S777.152 32 512 32zM320.256 143.04c20.864-10.88 42.688-20.16 65.408-27.392-23.616 34.624-43.968 78.656-59.904 129.6-23.808-15.232-37.76-33.472-37.76-53.248 0-17.984 12.224-34.56 32.256-48.96zM227.136 209.344c7.424 37.568 36.864 71.296 82.752 96.512-11.84 53.376-19.2 112.064-21.12 174.144H97.6a414.464 414.464 0 0 1 129.536-270.656z m0 605.312A414.464 414.464 0 0 1 97.6 544h191.104c1.92 62.08 9.344 120.768 21.184 174.144-45.888 25.088-75.328 58.944-82.752 96.512z m93.12 66.304C300.224 866.56 288 849.92 288 832c0-19.776 13.952-38.08 37.76-53.312 15.936 51.008 36.288 94.976 59.904 129.664a411.392 411.392 0 0 1-65.408-27.392z m159.744 38.656c-40.192-21.184-74.816-81.856-97.92-165.568a425.536 425.536 0 0 1 97.92-16.704v182.272z m0-245.824a454.592 454.592 0 0 0-111.68 20.288A966.4 966.4 0 0 1 352.64 544H480v129.792z m0-193.792H352.64a966.4 966.4 0 0 1 15.68-150.08 460.608 460.608 0 0 0 111.68 20.352V480z m0-193.344a432.512 432.512 0 0 1-97.92-16.704c23.104-83.712 57.728-144.32 97.92-165.568v182.272z m316.864-77.312A414.08 414.08 0 0 1 926.336 480h-191.104c-1.92-62.08-9.344-120.768-21.184-174.144 45.952-25.152 75.392-58.944 82.816-96.512z m-93.12-66.304c20.032 14.4 32.256 30.976 32.256 48.96 0 19.776-13.952 38.016-37.76 53.248-15.936-50.944-36.288-94.976-59.968-129.6a409.6 409.6 0 0 1 65.472 27.392zM544 104.384c40.256 21.248 74.88 81.856 97.92 165.568a432.512 432.512 0 0 1-97.92 16.704V104.384z m0 245.888a460.096 460.096 0 0 0 111.68-20.288c8.64 45.888 14.144 96.448 15.68 150.016H544V350.272z m0 193.728h127.36c-1.536 53.568-7.04 104.128-15.68 150.144a454.016 454.016 0 0 0-111.68-20.288V544z m0 375.616v-182.272a425.536 425.536 0 0 1 97.92 16.704c-23.04 83.712-57.664 144.384-97.92 165.568z m159.744-38.656c-20.864 10.88-42.688 20.16-65.408 27.456 23.616-34.688 44.032-78.656 59.968-129.664 23.808 15.232 37.76 33.536 37.76 53.312-0.064 17.856-12.288 34.496-32.32 48.896z m93.12-66.304c-7.424-37.568-36.928-71.36-82.816-96.512a936.96 936.96 0 0 0 21.184-174.144h191.104a414.08 414.08 0 0 1-129.472 270.656z" fill="" p-id="25936"></path></svg>
            </n-icon>
          </template>
        </n-button>
      </Transition>
    </div>
    <div class="right">
      <!-- 全局菜单 -->
      <n-dropdown
        :show="mainMenuShow"
        :show-arrow="true"
        :options="mainMenuOptions"
        placement="bottom-end"
        @clickoutside="mainMenuShow = false"
      >
        <n-button
          :style="{ pointerEvents: mainMenuShow ? 'none' : 'auto' }"
          :class="['main-menu', { show: !showSider }]"
          secondary
          strong
          round
          @click="mainMenuShow = !mainMenuShow"
        >
          <template #icon>
            <n-icon>
              <SvgIcon icon="menu" />
            </n-icon>
          </template>
        </n-button>
      </n-dropdown>
      <!-- 用户信息 -->
      <userData />
      <!-- TitleBar -->
      <TitleBar v-if="checkPlatform.electron()" />
    </div>
  </nav>
</template>

<script setup>
import { NScrollbar } from "naive-ui";
import { storeToRefs } from "pinia";
import { siteStatus, siteSettings } from "@/stores";
import { checkPlatform } from "@/utils/helper";
import { useRouter } from "vue-router";
import Menu from "@/components/Global/Menu";
import packageJson from "@/../package.json";

const router = useRouter();
const status = siteStatus();
const settings = siteSettings();
const { asideMenuCollapsed, searchInputFocus } = storeToRefs(status);
const { showGithub, showSider, themeAutoCover } = storeToRefs(settings);

// 站点信息
const siteName = "TuneFree";

// 打开 GitHub
const openGithub = () => {
  window.open('https://tunefree.fun');
};

// 主菜单渲染
const mainMenuShow = ref(false);
const mainMenuOptions = computed(() => [
  {
    key: "menu",
    type: "render",
    props: {
      onClick: () => (mainMenuShow.value = false),
    },
    render: () => {
      return h(NScrollbar, { style: { maxHeight: "calc(100vh - 200px)", minWidth: "280px" } }, () =>
        h(Menu),
      );
    },
  },
]);
</script>

<style lang="scss" scoped>
.main-nav {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  .left,
  .right {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .logo {
    width: 224px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding-left: 6px;
    box-sizing: border-box;
    transition:
      width 0.3s,
      padding-left 0.3s;
    -webkit-app-region: no-drag;
    cursor: pointer;
    .logo-img {
      width: 30px;
      height: 30px;
      min-width: 30px;
      background-color: transparent;
      transition: transform 0.3s;
      &:hover {
        transform: scale(1.15);
      }
      &:active {
        transform: scale(1);
      }
    }
    .site-name {
      margin-left: 12px;
      font-size: 20px;
      font-weight: bold;
    }
    &.collapsed {
      width: 48px;
      padding-left: 0;
    }
  }
  .navigation {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 34px;
    width: 86px;
    min-width: 86px;
    transition:
      width 0.3s,
      min-width 0.3s,
      opacity 0.3s;
    overflow: hidden;
    -webkit-app-region: no-drag;
    .nav-icon {
      border-radius: 8px;
      padding: 0 8px;
      .n-icon {
        font-size: 24px;
      }
    }
    @media (max-width: 700px) {
      &.hidden {
        opacity: 0;
        width: 0px;
        min-width: 0px;
      }
    }
  }
  .github {
    margin-left: 12px;
    -webkit-app-region: no-drag;
  }
  .main-menu {
    -webkit-app-region: no-drag;
    margin-right: 12px;
    display: none;
    &.show {
      display: flex;
    }
    @media (max-width: 900px) {
      display: flex;
    }
  }

  &.no-sider {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 10vw;
    @media (max-width: 1200px) {
      padding: 0 5vw;
    }
    .logo {
      width: auto;
      padding-left: 0;
      margin-right: 12px;
    }
  }
  @media (max-width: 900px) {
    .left {
      .logo {
        width: auto;
        padding-left: 0;
        margin-right: 12px;
        .site-name {
          display: none;
        }
      }
    }
  }
  @media (max-width: 700px) {
    .left {
      width: 100%;
    }
    .github {
      display: none;
    }
  }
}
</style>