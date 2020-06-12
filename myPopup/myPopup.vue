<template>
	<view class="picker">
		<view class="mypicker">
			<view class="mask" :class="{active : showPopup}" @tap="hide"></view>
			<view class="pickerContent" :class="{active : showPopup}">
				<view class="header">
					<view class="action" @tap="cancel">取消</view>
					<view class="action" @tap="action">确定</view>
				</view>
				<view class="content">
					<slot></slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
			}
		},
		props:{
			showPopup:{
				type:Boolean,
				default:false
			}
		},
		model:{
			prop:'showPopup',
			// event:'popupAction'
		},
		methods:{
			hide(){
				this.$emit('input',false)
			},
			action(){
				this.hide();
				this.$emit('popupAction')
			},
			cancel(){
				console.log(111)
				this.hide();
			}
		}
	}
</script>

<style scoped lang="less">
	.mypicker {
		.mask {
			position: fixed;
			left: 0;
			top: 0;
			width: 100vw;
			height: 100vh;
			background-color: rgba(0,0,0,0.4);
			z-index: 999;
			visibility: hidden;
			transition: all 0.3s;
			&.active {
				visibility: visible;
			}
		}
		.pickerContent {
			position: fixed;
			left: 0;
			bottom: 0;
			background-color: #FFFFFF;
			width: 100%;
			// min-height: ;
			z-index: 999;
			transform: translateY(100%);
			transition: all 0.3s;
			&.active {
				transform: translateY(0);
			}
			.header {
				height: 45px;
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid #eee;
				.action {
					max-width: 50%;
					top: 0;
					height: 100%;
					box-sizing: border-box;
					padding: 0 14px;
					font-size: 17px;
					line-height: 45px;
					overflow: hidden;
					&:nth-child(2){
						color: #007aff;
					}
				}
			}
			.content {
				min-height: 240px;
			}
		}
	}
</style>
