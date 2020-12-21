<template>
	<view>
		<view class="line-detail">
			<view class="time">
				<view class="departTime">
					{{item.planDeptTime|dateFormat}}
				</view>
				<view class="arrTime">
					{{item.planArrTime|dateFormat}}
				</view>
			</view>
			<view class="line">
				
			</view>
			<view class="airport">
				<view class="departAirport">
					{{item.arrAirportDisp}}
				</view>
				<view class="flightNo">
					
					<svg class="icon" aria-hidden="true" v-if="item.carrier==='MU'">
					    <use xlink:href="#icon-dongfanghangkong_MU"></use>
					</svg>
					<svg class="icon" aria-hidden="true" v-else-if="item.carrier==='FM'">
					    <use xlink:href="#icon-shanghaihangkong_FM"></use>
					</svg>
					<svg class="icon" aria-hidden="true" v-else="item.carrier==='KN'">
					    <use xlink:href="#icon-zhongguolianhehangkonggongsi"></use>
					</svg>
					{{item.carrier+item.flightNo}}
				</view>
				<view class="arrAirport">
					{{item.deptAirportDisp}}
				</view>
			</view>
			
		</view>
		<view class="other">
			<view class="box wifi">
				wifi:
				<uni-icons type="closeempty" v-if="!wifi"></uni-icons>
				<uni-icons type="checkmarkempty" v-else></uni-icons>
			</view>
			<view class="box disney">
				迪士尼彩绘:
				<uni-icons type="closeempty" v-if="!disney"></uni-icons>
				<uni-icons type="checkmarkempty" v-else></uni-icons>
			</view>
			<view class="box lineid">
				航线号：{{item.lineId}}
			</view>
			<view class="box actype">
				机型：{{item.acType}}
			</view>
			<view class="box linezhs">
				航线：{{item.linezhs}}
			</view>
			<view class="box crossDay">
				跨日：{{item.crossDay==='0'?'否':'是'}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item:{},
				wifi:false,
				disney:false,
			};
		},
		onLoad(){
			let that=this
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('sendItem', function(data) {
				that.item=data
				that.wifi=data.hasWifi==='N'?false:true
				that.disney=data.isDisney==='N'?false:true
				
				// console.log(data,that.wifi,that.disney)
			})
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height: 100%;
		padding: 0 10px;
		margin-top: 10px;
	}
.line-detail{
	width: 100%;
	// border: 1px solid red;
	display: flex;
	height: 150px;
	box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: 0.2);
	box-sizing: border-box;
	border-radius: 8px;
	.time{
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		// border: 1px solid red;
		justify-content: space-between;
		.departTime{
			margin-top: 10px;
			display: flex;
			justify-content: center;
		}
		.arrTime{
			margin-bottom: 10px;
			display: flex;
			justify-content: center;
		}
	}
	.line{
		border-right: 1px solid black;
		height: 80%;
		margin-top: 15px;
	}
	.airport{
		flex: 4;
		// border: 1px solid red;
		position: relative;
		margin-left: 20px;
		overflow: hidden;
		.departAirport{
			position: absolute;
			top: 10px;
			margin-left: 10px;
			font-weight: bolder;
			font-size: 20px;
		}
		.flightNo{
			position: absolute;
			top: 50%;
			translate: tansform(0,-50%);
			background-color: #f2f2f2;
			width: 80%;
			border-radius: 8px;
			margin-left: 20px;
			font-size: 14px;
		}
		.arrAirport{
			position: absolute;
			top: 115px;
			margin-left: 10px;
			font-weight: bolder;
			font-size: 20px;
		}
	}

}
	.other{
		display: flex;
		flex-direction: column;
		// border: 1px solid red;
		color: #9d9d9d;
		font-weight: lighter;
		margin-top: 10px;
		box-shadow: 0 0 5px 1px rgba($color: #22c6c8, $alpha: 0.2);
		.box{
			border-bottom: 1px solid #8c8c8c;
			border-radius: 2px;
			box-shadow: 0 0 5px 1px rgba($color: #4ac833, $alpha: 0.2);
			font-style: italic;
		}
	}
</style>
