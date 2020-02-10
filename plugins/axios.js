import {Message} from 'element-ui'
//网页启动时执行该文件
export default (data)=>{
    // console.log(data)
    data.$axios.onError(err=>{
        const {statusCode,message} = err.response.data;
        //判断状态如果是400展示错误信息
        if(statusCode === 400){
            Message.error(message)
        }
    })
}