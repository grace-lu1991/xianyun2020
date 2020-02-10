export const state = {
     userInfo :{
    user:{}
    }
}
//固定属性修改，同步修改state里面的值
export const mutations= {
    //data调用的时候传入的参数
    setUserInfo(state,data){
state.userInfo = data
    }
}
//固定属性修改，异步修改state里面的值
export const actions={
    //自定义一个函数，调用
  login(store,data){
        //发送异步请求，store有挂载axios
        return  this.$axios({
            url: '/accounts/login',
            method:'post',
            data
        }).then(res=>{
            // console.log(res)
            const {data} = res
            // console.log(res)
            store.commit('setUserInfo',data)
        })
    },
    sendCaptcha(store,data){
        return this.$axios({
        url:'/captchas',
        method:'POST',
        data :{
            tel:data
        }
        })
    },
    register(store,data){
        return this.$axios({
            url:'accounts/register',
            method:'POST',
            data
        }).then(res=>{
            // console.log(res)
            const {data} = res
            store.commit('setUserInfo',data)
        })
    }
}