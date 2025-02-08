import axios from "@/utils/request";

/**
 * 歌曲部分
 */

// 音质等级映射
const LEVEL_MAP = {
  128000: "standard",   // 标准
  320000: "higher",     // 较高
  400000: "exhigh",     // 极高
  900000: "lossless",   // 无损
  1200000: "hires",     // Hi-Res
  1500000: "jymaster",  // 超清母带
  2000000: "sky"        // 沉浸环绕声
};

// 转换音质等级
const convertLevel = (br) => {
  if (typeof br === 'string' && Object.values(LEVEL_MAP).includes(br)) {
    return br;
  }
  const brNumber = Number(br);
  // 找到最接近的等级
  const levels = Object.keys(LEVEL_MAP).map(Number);
  const closest = levels.reduce((prev, curr) => {
    return Math.abs(curr - brNumber) < Math.abs(prev - brNumber) ? curr : prev;
  });
  return LEVEL_MAP[closest] || "standard";
};

/**
 * 获取指定音乐的详情
 * @param {string} ids - 要获取详情的音乐ID，多个ID用逗号分隔
 */
export const getSongDetail = (ids) => {
  const timestamp = new Date().getTime();
  return axios({
    method: "POST",
    url: `/song/detail?timestamp=${timestamp}`,
    data: {
      ids,
    },
  });
};

/**
 * 获取音乐 URL
 * @param {number} id - 要获取音乐的 ID。
 * @param {number|string} br - 音质等级，可以是数字码率或字符串等级名称
 */
export const getSongUrl = (id, br = "hires") => {
  return axios({
    method: "GET",
    url: "https://auth.sayqz.com/?path=song/url",
    params: {
      id,
      level: convertLevel(br)
    },
  });
};

/**
 * 获取指定音乐的歌词
 * @param {number} id - 要获取歌词的音乐ID
 */
export const getSongLyric = (id) => {
  return axios({
    method: "GET",
    url: "/lyric/new",
    params: {
      id,
    },
  });
};

/**
 * 获取客户端歌曲下载
 * @param {number} id - 要下载的音乐ID
 * @param {number|string} br - 音质等级，可以是数字码率或字符串等级名称
 */
export const getSongDownload = async (id, br = "hires") => {
  try {
    const res = await axios({
      method: "GET",
      url: "https://auth.sayqz.com/?path=song/url",
      params: {
        id,
        level: convertLevel(br)
      },
    });
    
    if (res.code === 200 && res.data?.[0]) {
      const songData = res.data[0];
      // 只有当歌曲URL存在且状态码为200时才返回成功
      if (songData.url && songData.code === 200) {
        return {
          code: 200,
          data: {
            url: songData.url,
            size: songData.size,
            md5: songData.md5,
            type: songData.type,
            level: songData.level,
            br: songData.br
          }
        };
      }
      // 如果歌曲URL不存在或状态码不为200，返回错误信息
      return {
        code: songData.code || 404,
        message: songData.message || "歌曲暂时无法下载"
      };
    }
    return {
      code: res.code,
      message: res.message || "获取下载链接失败"
    };
  } catch (error) {
    console.error("获取下载链接失败:", error);
    return {
      code: 500,
      message: "获取下载链接失败，请重试"
    };
  }
};

/**
 * 听歌打卡
 * @param {number} id - 音乐ID
 * @param {number} sourceid - 来源ID
 */
export const songScrobble = (id, sourceid = 0, time = 0) => {
  return axios({
    method: "GET",
    url: "/scrobble",
    params: {
      id,
      sourceid,
      time,
      timestamp: new Date().getTime(),
    },
  });
};
