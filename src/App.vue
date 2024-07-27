<template>
  <Provider>
    <template v-if="!isLyric">
    <!-- 主框架 -->
    <n-layout :class="['all-layout', { 'full-player': showFullPlayer }]">
      <!-- 导航栏 -->
      <n-layout-header bordered>
        <MainNav />
      </n-layout-header>
      <!-- 主内容 - 有侧边栏 -->
      <n-layout
        v-if="showSider"
        :class="{
          'body-layout': true,
          'player-bar': music.getPlaySongData?.id && showPlayBar,
        }"
        position="absolute"
        has-sider
      >
        <!-- 侧边栏 -->
        <n-layout-sider
          :collapsed="asideMenuCollapsed"
          :native-scrollbar="false"
          :collapsed-width="64"
          :width="240"
          class="main-sider"
          show-trigger="bar"
          collapse-mode="width"
          bordered
          @collapse="asideMenuCollapsed = true"
          @expand="asideMenuCollapsed = false"
        >
          <div class="sider-all">
            <Menu />
          </div>
        </n-layout-sider>
        <!-- 页面区 -->
        <n-layout :native-scrollbar="false" embedded>
          <MainLayout />
        </n-layout>
      </n-layout>
      <!-- 主内容 - 无侧边栏 -->
      <n-layout-content
        v-else
        :class="{
          'body-layout': true,
          'player-bar': music.getPlaySongData?.id && showPlayBar,
        }"
        :native-scrollbar="false"
        position="absolute"
        embedded
      >
        <MainLayout />
      </n-layout-content>
    </n-layout>
    <!-- 主播放器 -->
    <MainControl />
    <!-- 全屏播放器 -->
    <FullPlayer />
    <!-- 全局播放列表 -->
    <n-config-provider v-if="showFullPlayer" :theme="darkTheme">
      <Playlist />
    </n-config-provider>
    <Playlist v-else />
    <!-- 全局水印 -->
    <!-- <n-watermark
      :font-size="16"
      :line-height="16"
      :width="384"
      :height="384"
      :x-offset="12"
      :y-offset="60"
      :rotate="-15"
      content="开发中，敬请期待"
      cross
      fullscreen
    /> -->
    
      
  </template>
  <template v-else>
    <MainLayout />
  </template>
  </Provider>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { darkTheme, NButton } from "naive-ui";
import { musicData, siteStatus, siteSettings } from "@/stores";
import { checkPlatform } from "@/utils/helper";
import { initPlayer } from "@/utils/Player";
import userSignIn from "@/utils/userSignIn";
import globalShortcut from "@/utils/globalShortcut";
import globalEvents from "@/utils/globalEvents";
import axios from 'axios';
import packageJson from "@/../package.json";
const isLyric = ref(true)
const router = useRouter();
const music = musicData();
const status = siteStatus();
const settings = siteSettings();
const { autoPlay, showSider, autoSignIn } = storeToRefs(settings);
const { showPlayBar, asideMenuCollapsed, showFullPlayer } = storeToRefs(status);

// 公告数据
const annShow =
  import.meta.env.RENDERER_VITE_ANN_TITLE && import.meta.env.RENDERER_VITE_ANN_CONTENT
    ? true
    : false;
const annType = import.meta.env.RENDERER_VITE_ANN_TYPE;
const annTitle = import.meta.env.RENDERER_VITE_ANN_TITLE;
const annContene = import.meta.env.RENDERER_VITE_ANN_CONTENT;
const annDuration = Number(import.meta.env.RENDERER_VITE_ANN_DURATION);

// PWA
if ("serviceWorker" in navigator) {
  // 更新完成提醒
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (checkPlatform.electron()) {
      $notification.create({
        title: "🎉 有更新啦",
        content: "检测到软件内资源有更新，是否重新启动软件以应用更新？",
        meta: "当前版本 v " + (packageJson.version || "1.0.0"),
        action: () =>
          h(
            NButton,
            {
              text: true,
              type: "primary",
              onClick: () => {
                electron.ipcRenderer.send("window-relaunch");
              },
            },
            {
              default: () => "更新",
            },
          ),
        onAfterLeave: () => {
          $message.info("已取消本次更新，更新将在下次启动软件后生效", {
            duration: 6000,
          });
        },
      });
    } else {
      console.info("站点资源有更新，请刷新以应用更新");
      $message.info("站点资源有更新，请刷新以应用更新", {
        closable: true,
        duration: 0,
      });
    }
  });
}

// 显示公告
const showAnnouncements = () => {
  if (annShow) {
    $notification[annType]({
      content: annTitle,
      meta: annContene,
      duration: annDuration,
    });
  }
};


//更新
const isNewVersion = (currentVersion, newVersion) => {
  // 简单版本号比较逻辑，实际逻辑可能需要更复杂的比较
  return newVersion.localeCompare(currentVersion) === 1;
};
// 是否有更新
const showUpdate = () => {
  axios.get('https://api.tunefree.fun/update/')
    .then(response => {
      const newVersion = response.newVersion;
      const downloadUrl = response.downloadUrl;
      const currentVersion = packageJson.version; // 这里应用当前的版本号，或者通过其他方式获取
      if (isNewVersion(currentVersion, newVersion)) {
        if (checkPlatform.electron()) {
          $notification.create({
          title: "TuneFree发布更新啦！🎉",
          duration: 6000,
          content: `我们的音乐之旅即将迈入新的乐章！ ${newVersion} 版本带着未曾有过的和声与节拍登场了。立即更新，让我们和新旋律一起自由起舞吧！`,
          meta: "当前版本 v " + (packageJson.version || "1.0.0"),
          action: () =>
            h(
              NButton,
              {
                text: true,
                type: "primary",
                onClick: () => {
                  window.open(downloadUrl, '_blank');
                },
              },
              {
                default: () => "更新",
              },
            ),
        });
    }
      } 
    })
};


// 网络无法连接
const canNotConnect = (error) => {
  console.error("网络连接错误：", error.message);
  $dialog.destroyAll();
  $dialog.error({
    title: "网络连接错误",
    content: "网络连接错误，请检查您当前的网络状态",
    positiveText: "重试",
    negativeText: checkPlatform.electron() ? "前往本地歌曲" : "取消",
    onPositiveClick: () => {
      location.reload();
    },
    onNegativeClick: () => {
      if (checkPlatform.electron()) router.push("/local");
    },
  });
};

// 网页端键盘事件
const handleKeyUp = (event) => {
  globalShortcut(event, router);
};

onBeforeMount(() => {
  isLyric.value = window.location.hash == '#/lyric'
})
onMounted(async () => {
  // 挂载方法
  window.$canNotConnect = canNotConnect;
  // 主播放器
  await initPlayer(autoPlay.value);
  // 全局事件
  globalEvents(router);
  // 键盘监听
  if (!checkPlatform.electron()) {
    window.addEventListener("keyup", handleKeyUp);
  }
  // 自动签到
  if (autoSignIn.value) await userSignIn();
  // 显示公告
  showAnnouncements();
  //showUpdate();
});

onUnmounted(() => {
  if (!checkPlatform.electron()) window.removeEventListener("keyup", handleKeyUp);
});
</script>

<style lang="scss" scoped>
.all-layout {
  height: 100%;
  transition:
    transform 0.3s,
    opacity 0.3s;
  .n-layout-header {
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    -webkit-app-region: drag;
  }
  .body-layout {
    top: 60px;
    transition: bottom 0.3s;
    .main-sider {
      :deep(.n-scrollbar-content) {
        height: 100%;
      }
      .sider-all {
        height: 100%;
      }
      @media (max-width: 900px) {
        display: none;
      }
    }
    &.player-bar {
      bottom: 80px;
    }
  }
  &.full-player {
    opacity: 0;
    transform: scale(0.9);
  }
}
</style>
