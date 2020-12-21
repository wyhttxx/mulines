import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store=new Vuex.Store({
	// 数据源
	state:{
		historyList:[]
	},
	mutations:{
		SET_HISTOTY_LIST(state,history){
			state.historyList=history
		},
	},
	actions:{
		set_history({commit,state},history){
			let list=state.historyList
			for(let i=0;i<list.length;i++){
				if(list[i].arrCode===history.arrCode&list[i].deptCode===history.deptCode){
					return
				}
			}
			list.unshift(history)
			commit('SET_HISTOTY_LIST',list)
		},
		clear_history({commit,state}){
			commit('SET_HISTOTY_LIST',[])
		}
	}
})
export default store