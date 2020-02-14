<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col
        :span="8"
      >单程：{{data.info.departCity}}-{{data.info.destCity}} / {{data.info.departDate}}</el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场">
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="flightTime" size="mini" placeholder="起飞时间">
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00-${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司">
          <el-option
            v-for="(item, index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型">
          <el-option
            v-for="(item, index) in sizeOptions"
            :key="index"
            :label="item.name"
            :value="item.size"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <!-- 渲染空的字符串，只需要监听功能 -->
    <span>{{filter}}</span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      airport: "",
      flightTime: "",
      company: "",
      airSize: "",
      sizeOptions: [
        { name: "大", size: "L" },
        { name: "中", size: "M" },
        { name: "小", size: "S" }
      ]
    };
  },
  computed: {
    //过滤出不符合条件，用空字符渲染，监听数据得变化
    filter() {
      const newData = this.data.flights.filter(v => {
        //假设所有得调价是满足得
        let vaild = true;
        if (this.airport && v.org_airport_name !== this.airport) {
          vaild = false;
        }
        if (this.flightTime) {
          const startTime = Number(this.flightTime.split(",")[0]);
          const endTime = Number(this.flightTime.split(",")[1]);
          const hours = Number(v.dep_time.split(":")[0]);
          if (startTime > hours || hours >= endTime) {
            vaild = false;
          }
          if (this.company && v.airline_name !== this.company) {
            vaild = false;
          }
          if (this.airSize && v.plane_size !== this.airSize) {
            vaild = false;
          }
        }
        return vaild;
      });
      this.$emit("getData", newData);
      return "";
    }
  },
  methods: {
    //过滤起飞机场
    // handleAirport(value) {
    //   //过滤返回所有value所对应得数据
    //   const newData = this.data.flights.filter(v => {
    //     return (v.org_airport_name = value);
    //   });
    //   //将返回的数据传给父组件
    //   this.$emit("getData", newData);
    // },
    //起飞时间
    // handleFlightTime(value) {
    //   const startTime = Number(value.split(",")[0]);
    //   const endTime = Number(value.split(",")[1]);
    //   const newData = this.data.flights.filter(v => {
    //     const hours = Number(v.dep_time.split(":")[0]);
    //     return startTime <= hours && hours < endTime;
    //   });
    //将返回的数据传给父组件
    //   this.$emit("getData", newData);
    //   //   console.log(newData)
    // },
    // //航空公司
    // handleCompany(value) {
    //   const newData = this.data.flights.filter(v => {
    //     return (v.airline_name = value);
    //   });
    //   //将返回的数据传给父组件
    //   this.$emit("getData", newData);
    // },
    //飞机机型
    // handleAirSize(value) {
    //   const newData = this.data.flights.filter(v => {
    //     return (v.plane_size = value);
    //   });
    //   //将返回的数据传给父组件
    //   this.$emit("getData", newData);
    // }
  }
};
</script>

<style>
</style>