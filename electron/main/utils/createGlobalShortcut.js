import { globalShortcut } from "electron";

/**
 * 注册全局快捷键
 * @param {BrowserWindow} win - 程序窗口
 */
const createGlobalShortcut = (win) => {
  
  //全局播放控制
  globalShortcut.register("CmdOrCtrl+Alt+P", () => {
    win.webContents.send("playOrPause");
  });
  
  //全局下一首
  globalShortcut.register("CmdOrCtrl+Alt+Right", () => {
    win.webContents.send("playNextOrPrev", "next");
  });

  //全局上一首
  globalShortcut.register("CmdOrCtrl+Alt+Left", () => {
    win.webContents.send("playNextOrPrev", "prev");
  });

// 刷新程序
  globalShortcut.register("CmdOrCtrl+Shift+R", () => {
    if (win && win.isFocused()) win?.reload();
  });

  // 打开开发者工具
  globalShortcut.register("CmdOrCtrl+Shift+I", () => {
    if (win && win.isFocused()) {
      win?.webContents.openDevTools({
        mode: "right",
        activate: true,
      });
    }
  });
};

export default createGlobalShortcut;
