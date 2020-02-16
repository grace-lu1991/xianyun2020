//将机票出发时间地址存储
export const state = ()=>{
return{
    historyData:[],
    orderInfo:{
        insurances: [], 
        seat_infos: {}
    }
}
}
//对state里面的数据进行修改
export const mutations = {
    historyAirData(state,data){
        //  state.historyData.push(data)
        state.historyData.unshift(data)
        state.historyData.length = 5
    },
    getOrderInfo(state,data){
        state.orderInfo = data
    }
}