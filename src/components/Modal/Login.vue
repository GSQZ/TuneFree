<!-- 弹窗 - 登录 -->
<template>
  <n-modal
    v-model:show="loginModalShow"
    :auto-focus="false"
    :mask-closable="false"
    :bordered="false"
    :close-on-esc="false"
    :closable="false"
    style="width: 340px"
    preset="card"
    transform-origin="center"
    class="login-modal"
  >
    <div class="login-content">
      <div class="header">
        <img class="logo" src="/images/icons/favicon.png?asset" alt="logo" />
        <div class="text">
          <h2>TuneFree</h2>
          <p>授权码登录</p>
        </div>
      </div>
      
      <div class="login-form">
        <loginPhone @setLoginData="setLoginData" />
      </div>

      <n-button
        class="close-btn"
        quaternary
        circle
        @click="(loginModalShow = false), toLogout(false)"
      >
        <template #icon>
          <n-icon><SvgIcon icon="window-close" /></n-icon>
        </template>
      </n-button>
    </div>
  </n-modal>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { siteData, siteSettings } from "@/stores";
import { getLoginState, refreshLogin } from "@/api/login";
import { setCookies, toLogout, isLogin } from "@/utils/auth";
import userSignIn from "@/utils/userSignIn";

const data = siteData();
const settings = siteSettings();
const { userData } = storeToRefs(data);
const { autoSignIn } = storeToRefs(settings);

// 登录数据
const loginModalShow = ref(false);

// 开启登录弹窗
const openLoginModal = () => {
  if (isLogin()) {
    $dialog.warning({
      title: "退出登录",
      content: "确认退出当前用户登录？",
      positiveText: "登出",
      negativeText: "取消",
      onPositiveClick: () => {
        toLogout();
      },
    });
  } else {
    loginModalShow.value = true;
  }
};

// 储存登录信息
const setLoginData = async (loginData) => {
  console.log(loginData);
  if (!loginData) return false;
  if (loginData.code === 200) {
    // 关闭登录弹窗
    loginModalShow.value = false;
    // 保存 cookie
    setCookies(loginData.cookie);
    // 获取用户信息
    await data.setUserProfile();
    await data.setDailySongsData();
    // 签到
    if (autoSignIn.value) await userSignIn();
    // 更改状态
    data.userLoginStatus = true;
    $message.success("登录成功");
  } else {
    $message.error(loginData.msg ?? loginData.message ?? "账号或密码错误，请重试");
  }
};

// 刷新登录
const toRefreshLogin = async () => {
  const today = Date.now();
  const threeDays = 3 * 24 * 60 * 60 * 1000;
  const lastRefreshDate = new Date(localStorage.getItem("lastRefreshDate")).getTime();
  
  if (today - lastRefreshDate >= threeDays || !lastRefreshDate) {
    try {
      const res = await refreshLogin();
      if (res.code === 200) {
        localStorage.setItem("lastRefreshDate", new Date(today).toLocaleDateString());
        // 如果返回了新的cookie，则更新
        if (res.cookie) {
          setCookies(res.cookie);
        }
        console.log("刷新登录成功");
      } else {
        console.warn("刷新登录返回异常:", res);
      }
    } catch (error) {
      console.warn("刷新登录失败，将在下次启动时重试");
      // 清除上次刷新时间，确保下次启动时重试
      localStorage.removeItem("lastRefreshDate");
    }
  }
};

// 检查登录状态
const checkLoginStatus = async () => {
  try {
    // 获取登录状态
    const loginState = await getLoginState();
    // 登录正常
    if (loginState.data?.profile) {
      handleLoginSuccess(loginState.data?.profile);
    }
    // 若还有用户数据，则登录过期
    else if (Object.keys(userData.value.detail)?.length) {
      handleLoginExpired();
    }
  } catch (error) {
    console.error("检查登录状态失败：", error);
  }
};

// 登录正常
const handleLoginSuccess = async (profile) => {
  console.log("登录正常", profile);
  toRefreshLogin();
  data.userLoginStatus = true;
  // 获取用户信息
  await data.setUserProfile();
};

// 登录过期
const handleLoginExpired = () => {
  toLogout();
  data.userLoginStatus = false;
  loginModalShow.value = true;
  $message.warning("登录已过期，请重新登录", { duration: 2000 });
};

defineExpose({
  openLoginModal,
});

onBeforeMount(() => {
  checkLoginStatus();
  // 挂载方法
  window.$changeLogin = openLoginModal;
});
</script>

<style lang="scss">
.login-modal {
  .n-card {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
  }
}

.login-content {
  position: relative;
  padding: 0;

  .header {
    display: flex;
    align-items: center;
    padding: 20px;
    background: var(--primary-color);
    margin: -16px -16px 16px -16px;

    .logo {
      width: 36px;
      height: 36px;
      margin-right: 12px;
    }

    .text {
      color: #fff;

      h2 {
        font-size: 18px;
        font-weight: 500;
        margin: 0;
        line-height: 1.2;
      }

      p {
        font-size: 13px;
        margin: 2px 0 0;
        opacity: 0.9;
      }
    }
  }

  .login-form {
    padding: 0 20px 20px;
  }

  .close-btn {
    position: absolute;
    right: 8px;
    top: 8px;
    width: 32px;
    height: 32px;
    color: rgba(255, 255, 255, 0.9);
    transition: all 0.2s ease;

    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.1);
    }

    .n-icon {
      font-size: 16px;
    }
  }
}

:root[theme-mode="dark"] {
  .login-modal .n-card {
    background: var(--n-color-modal);
  }
}
</style>
