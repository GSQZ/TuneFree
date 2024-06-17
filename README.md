
# TuneFree

<h2>教你一点礼仪，别他妈跑到别人作品下面瞎几把吹说TuneFree比你做的好，别他妈吹牛逼了，我也是二开的别人软件，没啥技术含量，别tm到处引战给我丢脸了 </h2>


> 随心所欲，音乐无界 - 音遇自由

> [!IMPORTANT]
>
> 由于 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) 项目已停止维护，由于接口状态的不可确定性，将无法保障功能的正常使用，本项目将会停止新功能的开发，进入无限期停更状态。本项目基于开源项目[SPlayer](https://github.com/imsyy/SPlayer)进行开发，故产生的一切责任都与SPlayer以及他的开发者无关！
>
> Tips：该文档大部分内容引用了SPlayer仓库中的README.md

![main](/screenshots/TuneFree.jpg)


## 👀 Demo

- [TuneFree网页端](https://pt.sayqz.com)
- [TuneFree for Windows](https://sayqz.lanpv.com/iN56k1o4ms3i)
- [TuneFree for Android](https://sayqz.lanpv.com/ipru71xs00qj)

## 🎉 功能

- 🎵 **支持播放网易云音乐所有的付费资源**
- 🆕 软件内检查更新
- 🤳 独立Android客户端
- ✨ 支持扫码登录
- 📱 支持手机号登录
- 📅 自动进行每日签到及云贝签到
- 🎨 封面主题色自适应
- 📁 本地歌曲管理及分类（建议先使用 [音乐标签](https://www.cnblogs.com/vinlxc/p/11347744.html) 进行匹配后再使用）
- ⬇️ 下载歌曲（最高支持 超清母带）
- ➕ 新建歌单及歌单编辑
- ❤️ 收藏 / 取消收藏歌单或歌手
- 🎶 每日推荐歌曲
- 📻 私人 FM
- ☁️ 云盘音乐上传
- 📂 云盘内歌曲播放
- 🔄 云盘内歌曲纠正
- 🗑️ 云盘歌曲删除
- 📝 支持逐字歌词
- 🔄 歌词滚动以及歌词翻译
- 📹 MV 与视频播放
- 🎶 音乐频谱显示
- ⏭️ 音乐渐入渐出
- 🔄 支持 PWA
- 💬 支持评论区及评论点赞
- 🌓 明暗模式自动 / 手动切换
- 📱 移动端基础适配


## 🖼️ 预览

> 开发中，仅供参考

<details>
<summary>主页面</summary>

![主页面](/screenshots/TuneFree%20-%20主页面.jpg)

</details>

<details>
<summary>播放页面</summary>

![播放页面](/screenshots/TuneFree%20-%20播放页面.jpg)

</details>

<details>
<summary>发现页面</summary>

![发现页面](/screenshots/TuneFree%20-%20发现页面.jpg)

</details>

<details>
<summary>歌单页面</summary>

![发现页面](/screenshots/TuneFree%20-%20歌单页面.jpg)

</details>

<details>
<summary>评论页面</summary>

![发现页面](/screenshots/TuneFree%20-%20评论页面.jpg)

</details>

<details>
<summary>本地音乐</summary>

![发现页面](/screenshots/TuneFree%20-%20本地音乐.jpg)

</details>

## 📦️ 获取
### TuneFree
通常情况下，可以在蓝奏云中获取到TuneFree各版本安装包
- [蓝奏云](https://sayqz.lanpv.com/s/tunefree)

## ⚙️ 本地部署

1. 本地部署需要用到 `Node.js`。可前往 [Node.js 官网](https://nodejs.org/zh-cn/) 下载安装包，请下载最新稳定版
2. 安装 pnpm

   ```bash
   npm install pnpm -g
   ```

3. 克隆仓库并拉取至本地，此处不再赘述
4. 使用 `pnpm install` 安装项目依赖（若安装过程中遇到网络错误，请使用国内镜像源替代，此处不再赘述）
5. 复制 `/.env.example` 文件并重命名为 `/.env` 并修改配置
6. 打包客户端，请依据你的系统类型来选择，打包成功后，会输出安装包或可执行文件在 `/dist` 目录中，可自行安装

   | 命令               | 系统类型 |
   | ------------------ | -------- |
   | `pnpm build:win`   | Windows  |
   | `pnpm build:linux` | Linux    |
   | `pnpm build:mac`   | MacOS    |

## 📢 免责声明

再次声明，本项目基于开源项目SPlayer进行二次开发，故产生的一切责任都与SPlayer以及他的开发者无关!，仅供个人学习研究使用，禁止用于商业及非法用途。同时，本项目开发者承诺 没有任何破解网易音乐等相关情况，只是使用了我自己会员账号的Cookie进行了请求，请求使用的链接为网易云音乐官方的API


## 📜 开源许可
- 原项目基于[GNU Affero General Public License (AGPL-3.0)](https://www.gnu.org/licenses/agpl-3.0.html)许可进行开源
- 以下是来自原项目的开源许可
  1. **修改和分发：** 任何对本项目的修改和分发都必须基于 AGPL-3.0 进行，源代码必须一并提供
  2. **派生作品：** 任何派生作品必须同样采用 AGPL-3.0，并在适当的地方注明原始项目的许可证
  3. **注明原作者：** 在任何修改、派生作品或其他分发中，必须在适当的位置明确注明原作者及其贡献
  4. **免责声明：** 根据 AGPL-3.0，本项目不提供任何明示或暗示的担保。请详细阅读 [GNU Affero General Public License (AGPL-3.0)](https://www.gnu.org/licenses/agpl-3.0.html) 以了解完整的免责声明内容
  5. **社区参与：** 欢迎社区的参与和贡献，我们鼓励开发者一同改进和维护本项目
  6. **许可证链接：** 请阅读 [GNU Affero General Public License (AGPL-3.0)](https://www.gnu.org/licenses/agpl-3.0.html) 了解更多详情
- TuneFree将遵守该开源许可，感谢SPlayer这一优秀的项目！更多详细说明请前往[SPlayer](https://github.com/imsyy/SPlayer)仓库了解！


## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=GSQZ/TuneFree&type=Date)](https://star-history.com/#GSQZ/TuneFree&Date)
