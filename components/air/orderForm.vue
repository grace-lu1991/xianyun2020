<template>
  <div class="main">
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info" v-for="(item,index) in form.user" :key="index">
        <div class="member-info-item">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>
    <!-- 循环渲染保险信息 -->
    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item, index) in airData.insurances" :key="index">
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`"
            border
            @change="handleInsurance(item.id)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input  v-model="form.contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="form.contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="form.captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    <span>{{allPrice}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user: [{ username: "", id: "" }],
        insurances: [],
        contactName: "",
        contactPhone: "",
        captcha: "",
        invoice: false,
        seat_xid: this.$route.query.seat_xid,
        id: this.$route.query.id
      },
      airData: {
         
      }
    };
  },
  //计算总价
  //computed可以监听组件下的所有实例属性
  computed: {
    allPrice(){

    }
  },
  //需要获取机票详细信息，结算订单
  mounted() {
    const { id, seat_xid } = this.$route.query;
    this.$axios({
      url: "/airs/" + id,
      params: { seat_xid }
    }).then(res => {
      console.log(res);
      this.airData = res.data;
      this.$store.commit('air/getOrderInfo', this.airData)
    });
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.form.user.push({ username: "", id: "" });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.form.user.splice(index, 1);
    },
    //处理保险数据
    handleInsurance(id) {
      let index = this.form.insurances.indexOf(id)
      if(index>-1){
        //说明保险已勾选，再点击就是删除
        this.form.insurances.splice(index,1)
      }else{
         this.form.insurances.push(id)
      }
    },

    // 发送手机验证码
    handleSendCaptcha() {
      if (!this.form.contactPhone) {
        this.$message.error("手机号码不能为空");
        return;
      }
      this.$store
        .dispatch("user/sendCaptcha", this.form.contactPhone)
        .then(res => {
          this.$message.success("验证码发送成功：000000");
        });
    },

    // 提交订单
    handleSubmit() {
      const rules = {
        //验证乘机人
        user: 
          {
            errMessage: "乘机人信息不能为空",
            validator: () => {
              let valid = true;
              this.form.user.forEach(v => {
                if (!v.username || !v.id) {
                  valid = false;
                }
              });
              return valid;
            }
          },
        contactName: 
          {
            errMessage: "联系人不能为空",
            validator: () => {
              return !!this.form.contactName;
            }
          },
         contactPhone: 
          {
            errMessage: "手机号码不能为空",
            validator: () => {
              return !!this.form.contactPhone;
            }
          },
         captcha: 
          {
            errMessage: "验证码不能为空",
            validator: () => {
              return !!this.form.captcha;
            }
          },
      };
      //先假设所有验证都通过
      let valid = true;
     Object.keys(rules).forEach(v=>{
       //有一个验证不通过就会阻断下面代码的执行
       if(!valid) return;
       const item = rules[v]
      valid = item.validator()
      if(!valid){
        this.$message.error(item.errMessage);
      }
      this.$axios({
        url:'/airorders',
        method:'post',
        data:this.form,
        headers:{Authorization:`Bearer ` +this.$store.state.user.userInfo.token}
      }).then(res=>{
        console.log(res)
      })
       
     })
    },
  }
  
}
  
</script >

<style lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>