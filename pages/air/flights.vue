<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <FlightsListHeader></FlightsListHeader>
        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in flightsData.flights" :key="index" :data="item"></FlightsItem>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHeader from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";
export default {
  components: {
    FlightsListHeader,
    FlightsItem
  },
  data() {
    return {
      flightsData: {},
      pageIndex: 1,
      pageSize: 5,
      total: 0
    };
  },
  mounted() {
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      console.log(res);
      this.flightsData = res.data;
      this.total = this.flightsData.total;
    });
  },
  computed: {
    getPageChangeData() {
      if (!this.flightsData.flights) {
        return [];
      }
      let arr = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      return arr;
    }
  },
  methods: {
    //当前页展示条数变化
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
    },
    //当前页发生变化
    handleCurrentChange(val) {
      this.pageIndex = val;
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>