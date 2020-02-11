<template>
  <section class="container">
    <h2 class="air-title">
      <span class="iconfont iconfeiji"></span>国内机票
    </h2>
    <!-- 搜索广告栏 -->
    <el-row type="flex" justify="space-between">
      <!-- 搜索表单 -->
      <SearchForm></SearchForm>
      <div class="sale-banner">
        <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" />
      </div>
    </el-row>
  </section>
</template>

<script>
import SearchForm from "@/components/air/searchForm"
export default {
  components:{
    SearchForm
  }
};
</script>

<style>
</style>