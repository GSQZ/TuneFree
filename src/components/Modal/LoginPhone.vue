<!-- 授权码登录 -->
<template>
  <div class="login-auth">
    <n-form
      ref="authFormRef"
      :model="authFormData"
      :rules="authFormRules"
      :show-label="false"
    >
      <n-form-item path="authCode">
        <n-input
          v-model:value="authFormData.authCode"
          placeholder="请输入授权码"
          :maxlength="32"
          clearable
          @keyup.enter="handleLogin"
        />
      </n-form-item>
      <n-form-item>
        <n-button 
          type="primary" 
          block 
          :loading="loading"
          @click="handleLogin"
        >
          {{ loading ? '登录中...' : '登录' }}
        </n-button>
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup>
import { toLogin } from "@/api/login";

const emit = defineEmits(["setLoginData"]);
const loading = ref(false);

// 授权码表单
const authFormRef = ref(null);
const authFormData = ref({
  authCode: null
});

// 验证规则
const authFormRules = {
  authCode: {
    required: true,
    message: "请输入授权码",
    trigger: ["blur", "input"]
  }
};

// 登录处理
const handleLogin = async (e) => {
  if (e?.preventDefault) e.preventDefault();
  if (loading.value) return;

  try {
    const valid = await authFormRef.value?.validate();
    if (valid) {
      loading.value = true;
      const result = await toLogin(authFormData.value.authCode);
      if (result.code === 200) {
        emit("setLoginData", result);
      } else {
        $message.error(result.message || "授权码无效");
      }
    }
  } catch (error) {
    console.error("登录失败：", error);
    $message.error("登录失败，请重试");
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.login-auth {
  .n-form {
    :deep(.n-form-item) {
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
      }

      .n-input .n-input__border,
      .n-input .n-input__state-border {
        border-radius: 2px;
      }

      .n-button {
        border-radius: 2px;
        height: 36px;
      }
    }
  }
}

// 暗色主题适配
:root[theme-mode="dark"] {
  .login-auth {
    .auth-input {
      :deep(.n-input) {
        .n-input-wrapper {
          background: var(--n-color-input-dark, rgba(255, 255, 255, 0.05));
        }
      }
    }
  }
}
</style>


