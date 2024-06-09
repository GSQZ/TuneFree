<template>
    <div class="sponsor-container">
      <n-space vertical align="stretch">
        <div class="header">
          <h1 class="title">🌟 赞助者荣誉榜 🌟</h1>
          <p class="subtitle">🚀 我们衷心感谢每一位赞助者的慷慨支持！正是因为你们，我们得以不断创新并前进！ 🥰</p>
        </div>
        <n-card v-for="item in sponsorList" :key="item.user.user_id" :title="item.user.name" class="sponsor-card">
          <div class="card-content">
            <div class="avatar-section">
              <n-avatar :src="item.user.avatar" size="large" class="large-avatar" />
            </div>
            <div class="info-section">
              <div><strong>用户ID：</strong>{{ item.user.user_id }}</div>
              <div><strong>总支持金额：</strong>{{ item.all_sum_amount }}</div>
              <div><strong>最后赞赏时间：</strong>{{ formatDate(item.last_pay_time) }}</div>
            </div>
          </div>
        </n-card>
        <n-pagination :page-count="totalPage" v-model:page="currentPage" @update:page="fetchData" />
      </n-space>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { NCard, NAvatar, NSpace, NPagination } from 'naive-ui'
  
  export default {
    components: {
      NCard,
      NAvatar,
      NSpace,
      NPagination
    },
    setup() {
      const sponsorList = ref([])
      const totalCount = ref(0)// 总项目数，需要从API获取
      const pageSize = ref(3) // 你可能需要根据实际情况调整每页展示的数据量
      const totalPage = ref(0)
      const currentPage = ref(1)

  
      const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString("zh-CN") + " " + date.toLocaleTimeString("zh-CN");
      }
  
      const fetchData = async (page = 1) => {
        try {
          const response = await axios.get(`https://csm.sayqz.com/api/afdian/data/?page=${page}`)
          if (response.data && response.ec === 200) {
            sponsorList.value = response.data.list
            totalCount.value = response.data.total_count //总项目数，需要从API获取
            totalPage.value = response.data.total_page
          } else {
            console.error('Unexpected API response structure:', response.data);
          }
        } 
        catch (error) {
          console.error('Error fetching sponsor data:', error);
          handleError(error)
        }
      }
  
      const handleError = (error) => {
        if (error.response) {
          console.error('Error response:', error.response.data, error.response.status);
        } else if (error.request) {
          console.error('Error request:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
      }
  
      onMounted(() => {
        fetchData(currentPage.value)
      })
  
      return {
        sponsorList,
        totalCount,
        totalPage,
        currentPage,
        pageSize,
        formatDate,
        fetchData
      }
    }
  }
  </script>
  
  <style scoped>
.sponsor-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 16px;
}

.header .title {
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 28px;
}

.header .subtitle {
  text-align: center;
  font-size: 16px;
  margin-bottom: 20px;
}

.sponsor-card {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  margin-bottom: 10px; /* 卡片之间的间隔 */
  height: auto;
}

.sponsor-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.card-content {
  display: flex;
  align-items: center;
  padding: 10px; /* 从15px减少到10px */
  gap: 15px;
}

.avatar-section {
  margin-right: 20px;
  flex-shrink: 0;
}

.n-avatar, .large-avatar {
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 50%;
  width: 60px; /* 可以考虑减小头像大小 */
  height: 60px; /* 可以考虑减小头像大小 */
}

.info-section {
  flex: 1;
  padding: 5px 0; /* 从10px减少到5px */
}

.info-section div {
  margin-bottom: 2px; /* 从3px减少到2px */
  font-size: 12px; /* 可以考虑减小字体大小以节省空间 */
}
</style>

