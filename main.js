import Vue from 'vue'
import App from './App'
import '@/common/css/font.js'
import store from './store/index'
Vue.filter( 
	'dateFormat',function(value) {
		let date=new Date(value.replace(/-/g,'/'))
		let hour=date.getHours()
		if(hour<10){
			hour='0'+hour
			}
		let min=date.getMinutes()
		if(min<10){min='0'+min}
		let time=hour+':'+min
		return time;
	}
)
Vue.filter( 
	'longFormat',function(value,arg1,arg2) {
		let date0=new Date(value.replace(/-/g,'/'))
		let date1=new Date(arg1.replace(/-/g,'/'))
		let date3=date1.getTime()-date0.getTime()
		let hour=Math.floor(date3/(3600*1000))//计算出小时数
		let leave=date3%(3600*1000)
		let min=Math.floor(leave/(60*1000))//计算相差分钟数
		if(arg2){
			if(hour<30){
				return hour
			}else{
				return hour+1
			}
		}
		// 国内时间必1位数
		hour='0'+hour
		if(min<10){min='0'+min}
		let time=hour+':'+min
		return time;
	}
)

Vue.config.productionTip = false

App.mpType = 'app'


const app = new Vue({
    ...App,
	store
})
app.$mount()
