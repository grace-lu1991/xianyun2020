import {Message} from 'element-ui'
//网页启动时执行该文件
export default (data)=>{
    console.log(data)
    data.$axios.onError(err=>{
        const {statusCode,message} = err.response.data;
        //判断状态如果是400展示错误信息
        if(statusCode === 400){
            Message.error(message)
        }
        // 如果请求的tokenyouwenti ,401yi般是因为token是错误或者过期，403是因为接口没有传token
        if(statusCode === 401 || statusCode === 403){
            //需要跳转到登录页面
            data.redirect(200,'/user/login',{returnUrl:data.route.fullPath})
        }
    })
}