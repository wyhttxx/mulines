<template>
	<view>
		<view class="home-content">
			<view class="card" v-for="(item,index) in itemDetails" :key="index" @click="toDetail(item)">
				<view class="company-info">
					<svg class="icon" aria-hidden="true" style="font-size: 30px;" v-if="item.carrier==='MU'">
					    <use xlink:href="#icon-dongfanghangkong_MU"></use>
					</svg>
					<svg class="icon" aria-hidden="true" style="font-size: 30px;" v-else-if="item.carrier==='FM'">
					    <use xlink:href="#icon-shanghaihangkong_FM"></use>
					</svg>
					<svg class="icon" aria-hidden="true" style="font-size: 30px;" v-else="item.carrier==='KN'">
					    <use xlink:href="#icon-zhongguolianhehangkonggongsi"></use>
					</svg>
				</view>
				<view class="content-info">
					<view class="airport-info">
						<view class="from-info">
							<view class="from-time">{{item.planDeptTime|dateFormat}}</view>
							<view class="from-place">
								{{item.deptAirportDisp}}
							</view>
						</view>
						<view class="time-info">
							<view class="howlong">
								{{item.planDeptTime|longFormat(item.planArrTime)}}
							</view>
							<view class="jiantou">
								<view class="arrowRight">
									
								</view>
							</view>
						</view>
						<view class="to-info">
							<view class="addday">
								
							</view>
							<view class="to-time">
								{{item.planArrTime|dateFormat}}
							</view>
							<view class="to-place">
								{{item.arrAirportDisp}}
							</view>
						</view>
					</view>
					<view class="plane-info">
						{{item.carrier==="FM"?"上海航空":item.carrier==="MU"?"东方航空":"联合航空"}}
						{{item.carrier+item.flightNo}}
						{{item.acType}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			itemDetails:{
				type:Array,
				default(){
					return []
				}
			}
		},
		methods:{
			toDetail(item){
				uni.navigateTo({
					url:"../../pages/lineDetail/lineDetail",
					success: function(res) {
					  // 通过eventChannel向被打开页面传送数据
					  res.eventChannel.emit('sendItem', item)
					}
				})
			}
		}
		// watch:{
		// 	"itemDetails":{
		// 		handler(newVal,oldVal){
		// 			console.log(newVal,oldVal)
		// 		},
		// 		immediate:true
		// 	}
		// }
	}
</script>

<style lang="scss">
		@import '@/common/css/icon.css';
		.icon {
		       width: 1em; height: 1em;
		       vertical-align: -0.15em;
		       fill: currentColor;
		       overflow: hidden;
		    }
			.home-content{
				// border: 1px solid red;
				// background-color: #f2f2f2;
			}
		.card{
			background-color: #f2f2f2;
			width: 90%;
			height: 75px;
			// border: 1px solid red;
			display: flex;
			margin: 0 auto;
			margin-bottom: 10px;
			border-radius: 5px;
			box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: 0.1);
			.company-info{
				width: 50px;
				height: 100%;
				// border: 1px solid green;
				display: flex;
				justify-content:center;
				align-items: center;
			}
			.content-info{
				display: flex;
				flex-direction: column;
				width: 100%;
				.airport-info{
					display: flex;
					// border: 1px solid green;
					width: 100%;
					.from-info{
						flex: 1;
						margin-left: 20px;
						font-size: 20px;
						color: #333;
						.from-place{
							color: #999;
							font-size: 16px;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;      
						}
					}
					.time-info{
						flex: 1;
						margin-left: 20px;
						.howlong{
							font-size: 14px;
							text-align: center;
						}
						.jiantou{
							border-bottom: 1px solid black;
							height: 7px;
							width: 90%;
							.arrowRight:after{
								content: "";
								width: 6px;
								height: 7px;
								display: inline-block;
								transform-origin: bottom right;
								border-right: 1px solid black;
								transform: rotate(-60deg);
								float: right;
							}
						}
					}
					.to-info{
						flex: 1;
						margin-left: 20px;
						font-size: 20px;
						color: #333;
						.to-place{
							color: #999;
							font-size: 16px;
							display: -webkit-box;             /*将对象转为弹性盒模型展示*/
							-webkit-box-orient: vertical;     /*设置弹性盒模型子元素的排列方式*/
							-webkit-line-clamp: 1;            /*限制文本行数*/
							overflow: hidden;                 /*超出隐藏*/
						}
					}
				}
				.plane-info{
					border-top: 1px solid #9e9e9e;
					color: #999;
					font-size: 14px;
					// height: 100%;
					display: flex;
					align-items: center;
					
				}
			}
		}
</style>
