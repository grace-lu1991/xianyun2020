<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cacheFlightsData" @getData='getData'></FlightsFilters>

        <!-- 航班头部布局 -->
        <FlightsListHeader></FlightsListHeader>
        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in getPageChangeData" :key="index" :data="item"></FlightsItem>
        <el-row type="flex" justify="center" style="margin-top:10px;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </el-row>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside></FlightsAside>
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHeader from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";
import FlightsFilters from "@/components/air/flightsFilters";
import FlightsAside from '@/components/air/flightsAside'
export default {
  components: {
    FlightsListHeader,
    FlightsItem,
    FlightsFilters,
    FlightsAside,
  },
  data() {
    return {
      flightsData: {
        info: {},
        flights: [],
        options: {}
      },
      cacheFlightsData: {
          info: {},
        flights: [],
        options: {}
      },
      pageIndex: 1,
      pageSize: 5,
      total: 0
    };
  },
  //watch可以监听任何实例下单个属性变化
  watch:{
    $route(){
      this.pageIndex = 1
     this.getFlightsData()
    }
  },
  //拦截器监听
  //  beforeRouteUpdate (to, from, next){
  //    this.pageIndex = 1
  //    this.getFlightsData()
  //    next()
  //  },
  computed: {
    getPageChangeData() {
      if (!this.flightsData.flights) {
        return [];
      }
      let arr = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      // console.log(arr);
      return arr;
    }
  },
  mounted() {
    this.getFlightsData()
  },
  methods: {
    //封装请求城市列表数据
    getFlightsData(){
      this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      console.log(res);
      this.flightsData = res.data;
      this.cacheFlightsData = {...res.data}
      this.total = this.flightsData.total;
    })
    },
    //当前页展示条数变化
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
    },
    //当前页发生变化
    handleCurrentChange(val) {
      console.log(val);
      this.pageIndex = val;
    },
    getData(newData){
      this.flightsData.flights = newData
      this.total = newData.length
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