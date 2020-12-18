<template>
	<view class="content">
		<view class="top-banner">
			
		</view>
		<view class="home-search-wrap">
			<view class="search-flight">
				<view class="select-city">

					<view class="swap" @click.stop="exchange">
						<svg class="icon" aria-hidden="true">
						    <use xlink:href="#icon-swap"></use>
						</svg>
						<!-- <image src="../../common/QQ截图20201218121617.png" mode=""></image> -->
					</view>
					<view class="select-city-l" @click="setDeparture">
						<view class="text">{{departure}}</view>
						<view class="iconx" @click.stop="changeDeparture" v-show="departure">
							<uni-icons type="close"></uni-icons>
						</view>
						
					</view>
					<view class="select-city-r" @click="setArr">
						<text>{{arr}}</text>
						<view class="iconx" @click.stop="changeArr" v-show="arr">
							<uni-icons type="close"></uni-icons>
						</view>
					</view>
				</view>
			</view>
			<view class="submit">
				<button type="default" @click="search" plain="true">查询</button>
			</view>
		</view>

	</view>
</template>

<script>
	
	export default {
		// components:{cityBar},
		data() {
			return {
				title: 'Hello',
				departure:'',
				arr:'',
				deptCode:'',
				arrCode:'',
				}
		},
		methods:{
			setDeparture(){
				let that=this
				uni.navigateTo({
					url:"../cityBar/components/t-city?id=0",
					events: {
					// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
						setDeparture: function(data) {
						  that.departure=data.data.cityName
						  that.deptCode=data.data.cityCode
						}
					},
				})
			},
			setArr(){
				let that=this
				uni.navigateTo({
					url:"../cityBar/components/t-city?id=1",
					events: {
					// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
						setArr: function(data) {
						  that.arr=data.data.cityName
						  that.arrCode=data.data.cityCode
						}
					},
				  })
				},
				search(){
					console.log(this.deptCode,this.arrCode)
					// 出发到达都没有
					if(this.deptCode===''&this.arrCode===''){
						uni.showToast({
							title:'输入不能为空',
							icon:'none'
						})
						return
					}
					uni.showLoading({
						
					})
					// 只有到达
					if(this.deptCode===''&this.arrCode!==''){
						uniCloud.callFunction({
							name:'hasArr',
							"data":{
								"deptCode":this.deptCode,
								"arrCode":this.arrCode,
							}
						}).then(res=>{
							
							console.log(res.result.res.data)
							let data=res.result.res.data
							let data1=[]
							if(data.length===0){
								uni.showToast({
									title:'没有找到数据',
									icon:'none'
								})
								return
							}
							for(let i=0;i<data.length;i++){
								data1.push(data[i].lines[0])
							}
							uni.hideLoading()
							uni.navigateTo({
								url:'../lines/lines',
								success:function(res){
									res.eventChannel.emit('getLines', data1)
								}
							})
						})
					}
					// 只有出发
					if(this.deptCode!==''&this.arrCode===''){
						uniCloud.callFunction({
							name:'hasDepature',
							"data":{
							"deptCode":this.deptCode,
							"arrCode":this.arrCode,
							}
						}).then(res=>{
							uni.hideLoading()
							console.log(res.result.res)
							console.log(res.result.res.data[0])
							if(res.result.res.data[0].lines.length===0){
								uni.showToast({
									title:'没有找到数据',
									icon:'none'
								})
								return
							}
							
							let {lines}=res.result.res.data[0]
							this.linesdata=lines
							
							uni.navigateTo({
								url:'../lines/lines',
								success:function(res){
									res.eventChannel.emit('getLines', lines)
								}
							})
						})

					}
					// 出发和到达
					if(this.deptCode!==''&this.arrCode!==''){
						uniCloud.callFunction({
							name:'hasTwo',
							"data":{
							"deptCode":this.deptCode,
							"arrCode":this.arrCode,
							}
						}).then(res=>{
							uni.hideLoading()
							console.log(res.result.res)
							// console.log(res.result.res.data[0])
							if(res.result.res.data.length===0){
								uni.showToast({
									title:'没有找到数据',
									icon:'none'
								})
								return
							}
							
							let {lines}=res.result.res.data[0]
							this.linesdata=lines
							
							uni.navigateTo({
								url:'../lines/lines',
								success:function(res){
									res.eventChannel.emit('getLines', lines)
								}
							})
						})
					
					}
					
					
				},
				exchange(){
					let a=''
					a=this.departure
					this.departure=this.arr
					this.arr=a
					a=this.deptCode
					this.deptCode=this.arrCode
					this.arrCode=a
				},
				changeDeparture(){
					this.departure=''
					this.deptCode=''
				},
				changeArr(){
					this.arr=''
					this.arrCode=''
				}
			},

		onLoad() {
			// uni.$on('zzj',(item)=>{
			// 	console.log(item)
			// 	let {cityCode,cityName}=item
			// 	this.departure=cityName
			// 	})

		}
	}
</script>

<style lang="scss">
	@import '@/common/css/icon.css';
	page{
			background-color: #f2f2f2;
	}
	.icon {
	       width: 1em; height: 1em;
	       vertical-align: -0.15em;
	       fill: currentColor;
	       overflow: hidden;
	    }
.content{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.top-banner{
		height: 228px;
		width: 100%;
		background:url(//imgs.qunarzz.com/ftejia/1806/14/9d003a85e4695f.png) no-repeat;
		background-size: 100% 100%;
	}
	.home-search-wrap{
		margin-top: -60px;
		background: rgba(255, 255, 255, .96);
		display: flex;
		flex-direction: column;
		width: 90%;
		justify-content: space-between;
		box-shadow: 0 2px 8px 0 rgba(0,0,0,0.06);
		border-radius: 10px;
		height: 200px;
		.search-flight{
			margin-top: 60px;
			.select-city{
				// display: flex;
				position: relative;
				overflow: hidden;
				.select-city-l{
					box-sizing: border-box;
					// border: 1px solid red;
					float: left;
					width: 50%;
					height: 50px;
					// flex: 2;
					font-size: 24px;
					font-weight: bolder;
					background-color: #f2f2f2;
					border-radius: 4px;
					position: relative;
					
					.text{
						display: flex;
						justify-content: center;
						align-items: center;
						// border: 1px solid red;
						height: 100%;
					}
					.iconx{
						position: absolute;
						right: 20px;
						top:5px;
						// border: 1px solid red;
					}
				}
				.swap{
					// border: 1px solid red;
					// flex: 1;
					height: 50px;
					width: 50px;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%,-50%);
					display: flex;
					justify-content: center;
					align-items: center;
					z-index: 99;
					image{
						height: 30px;
						width: 30px;
						border: 1px solid red;
					}
				}
				.select-city-r{
					// border: 1px solid red;
					// flex: 2;
					width: 50%;
					float: right;
					height: 50px;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 24px;
					font-weight: bolder;
					background-color: #f2f2f2;
					border-radius: 4px;
					.iconx{
						position: absolute;
						right: 20px;
						top:5px;
						// border: 1px solid red;
					}
				}
			}
		}
		.submit{
			box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: 0.1);
			
		}
	}
}
	
</style>
