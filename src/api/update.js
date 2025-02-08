import axios from "@/utils/request";

/**
 * 检查应用更新
 */
export const checkUpdate = async () => {
  try {
    const response = await fetch('https://auth.sayqz.com/?path=app/info&platform=pc');
    const data = await response.json();
    
    if (data.code === 200 && data.data) {
      return {
        code: 200,
        data: {
          version: data.data.version,
          updateUrl: data.data.update_url,
          announcement: data.data.announcement,
          ads: data.data.ads
        }
      };
    }
    return {
      code: data.code,
      message: data.message
    };
  } catch (error) {
    console.error('检查更新失败:', error);
    return {
      code: 500,
      message: '检查更新失败，请重试'
    };
  }
}; 