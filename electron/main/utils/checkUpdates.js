import { is } from "@electron-toolkit/utils";

// 导出一个空函数，或者根本不导出
export const configureAutoUpdater = () => {
  if (is.dev) return false;

  // 自动更新代码已被移除
  console.log("自动更新已被禁用");

  // 这里可以包含应用程序启动时需要执行的其他初始化代码
  // ...

  return true;
};
