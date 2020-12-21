<template>
	<view class="card-content" >
		<!-- 展开 -->
		<view class="" v-if="isLong" >
			<view class="card card-more" @click="isShow=!isShow">
				<view class="content-info">
					<view class="airport-info">
						<view class="from-info">
							<view class="from-place">
								{{longItem.deptAirportDisp}}
							</view>
						</view>
						<view class="time-info">
							<view class="howlong">
								约{{longItem.planDeptTime|longFormat(longItem.planArrTime,1)}}小时
							</view>
							<view class="jiantou">
								<view class="arrowRight">
									
								</view>
							</view>
						</view>
						<view class="to-info">
							<view class="to-place">
								{{longItem.arrAirportDisp}}
							</view>
						</view>
					</view>
				</view>
				<view class="info-content">
					<text class="text">共有{{item.detail.length}}条航线</text>
					<uni-icons type="more-filled" size="30"></uni-icons>
				</view>
			</view>
			
		</view>
		
		<cardZhangkai v-show="isShow" :itemDetails="longItemdetail" v-if="hasLong" class="animate__animated animate__fadeIn animate__delay-0.5s"></cardZhangkai>
		
			

		<!-- 无展开 -->
		<view class="" v-if="!isLong">
			<view class="card" @click="toDetail(item.detail[0])">
				<view class="company-info">
					<svg class="icon" aria-hidden="true" style="font-size: 30px;" v-if="item.detail[0].carrier==='MU'">
					    <use xlink:href="#icon-dongfanghangkong_MU"></use>
					</svg>
					<svg class="icon" aria-hidden="true" style="font-size: 30px;" v-else-if="item.detail[0].carrier==='FM'">
					    <use xlink:href="#icon-shanghaihangkong_FM"></use>
					</svg>
					<svg class="icon" aria-hidden="true" style="font-size: 30px;" v-else="item.detail[0].carrier==='KN'">
					    <use xlink:href="#icon-zhongguolianhehangkonggongsi"></use>
					</svg>
				</view>
				<view class="content-info">
					<view class="airport-info">
						<view class="from-info">
							<view class="from-time">{{item.detail[0].planDeptTime|dateFormat}}</view>
							<view class="from-place">
								{{item.detail[0].deptAirportDisp}}
							</view>
						</view>
						<view class="time-info">
							<view class="howlong">
								{{item.detail[0].planDeptTime|longFormat(item.detail[0].planArrTime)}}
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
								{{item.detail[0].planArrTime|dateFormat}}
								
							</view>
							<view class="to-place">
								{{item.detail[0].arrAirportDisp}}
							</view>
						</view>
					</view>
					<view class="plane-info">
						{{item.detail[0].carrier==="FM"?"上海航空":item.detail[0].carrier==="MU"?"东方航空":"联合航空"}}
						{{item.detail[0].carrier+item.detail[0].flightNo}}
						{{item.detail[0].acType}}
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>
<script>

	import cardZhangkai from './card-zhangkai/card-zhangkai'
	export default {
		components:{cardZhangkai},
		props:{
			item:{
				type:Object,
				default(){
					return {}
				}
			},
			singleLine:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			// this错误调半天
			"item":{
				handler(newVal,oldVal){
					if(this.item.detail.length>1){
						this.isLong=true
						this.longItem=this.item.detail[0]
						this.longItemdetail=this.item.detail
						this.hasLong=true
						// console.log(this.longItemdetail)
						
					}
				},
				immediate:true,
				// deep:true
			},
			singleLine:{
				handler(newVal){
					// console.log(newVal)
					// 经典错误了
					if(newVal===true){
						this.isShow="true"
					}
					
				},
				immediate:true
			}
			// "longItemdetail":{
			// 	handler(newVal){
			// 	console.log(newVal,"1")
			// },
			// immediate:true
				
			// }
		},
		data() {
			return {
				isLong:false,
				isShow:false,
				longItem:{},
				longItemdetail:[],
				hasLong:false
			};
		},
		onLoad(){
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
	}
</script>

<style lang="scss">
	@import  '@/common/css/animate.min.css';
.card-content{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		--animate-duration: 1s;
		--animate-delay: 0.5s;
		// border: 1px solid red;
		box-sizing: border-box;
		// padding-right: 10px;
		.card{
			width: 90%;
			height: 75px;
			// border: 1px solid red;
			display: flex;
			// margin-left: 10px;
			// margin-right: 10px;
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
					height: 100%;
					.from-info{
						flex: 1;
						margin-left: 5px;
						font-size: 20px;
						color: #333;
						// border: 1px solid red;
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
							margin-top: 3px;
							font-size: 14px;
							text-align: center;
						}
						.jiantou{
							border-bottom: 1px solid #999;
							height: 7px;
							width: 90%;
							.arrowRight:after{
								content: "";
								width: 6px;
								height: 7px;
								display: inline-block;
								transform-origin: bottom right;
								border-right: 1px solid #999;
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
					// border: 1px solid green;
					border-top: 1px solid #d5d5d5;
					color: #999;
					font-size: 14px;
					// height: 100%;
					display: flex;
					align-items: center;
					
				}
			}
		}
		& .card-more{
			flex-direction: column;
			display: flex;
			.content-info{
				flex:2;
				.airport-info{
					height: 100%;
					.from-info{
						// border: 1px solid red;
						display: flex;
						justify-content: center;
						align-items: center;
						.from-place{
							font-size: 20px;
							color: #333333;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden; 
						}
					}
					.time-info{
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						.howlong{
							
						}
					}
					.to-info{
						display: flex;
						justify-content: center;
						align-items: center;
						
						.to-place{
							font-size: 20px;
							color: #333333;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden; 
						}
					}
				}
			}
			.info-content{
				flex: 1;
				display: flex;
				justify-content: space-between;
				border-top: 1px solid #e5e5e5;
				.text{
					display: flex;
					align-items: center;
					padding-left: 30px;
					color:#333333;
					font-size: 16px;
				}
			}
		}
	}
</style>
