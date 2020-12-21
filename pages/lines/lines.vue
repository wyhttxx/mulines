<template>
	<view class="">
		<view class="card-control" v-for="(item,index) in linesdata" :key="index">
			<card :item="item" :singleLine="singleLine"></card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				linesdata:[],
				isShow:0,
				singleLine:false
			};
		},
		onLoad(){
			const eventChannel = this.getOpenerEventChannel()
			// 经典错误，this
/* 			eventChannel.on('getLines', function(data) {
			    // this.linesdata=data
				// this.$set(this.linesdata,0,data)
				console.log(this)
			  }) */
			  // console.log(this) 淦
			let that=this
			eventChannel.on('getLines', function(data) {
				that.linesdata=data
			})
			if(this.linesdata.length===1){
				this.singleLine=true
			}
		},
/* 		watch:{
			"linesdata":{
				handler(newVal,oldVal){
					// this.linesdata=newVal
					console.log(newVal,oldVal)
				},
			immediate:true,
			deep:true
			}
		}, */
		methods:{
		}
	}
</script>

<style lang="scss">
page{
	margin-top: 10px;
}
</style>
