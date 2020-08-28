<template>
	<view>
		<!-- 聊天记录 会话列表 -->
		<view class="conversition-box" v-if="isActive ==0">
			<view class="list-box" v-if="conversationList && conversationList.length>0">
				<view v-for="(item,index) in conversationList" :key="index" @click="toRoom(item)">
					<view class="item-box">
						<view class="item-img">
							<img v-if="item.userProfile.avatar" :src="imgIP(item.userProfile.avatar)" alt="">
							<img v-else :src="imgIP('/static_s/51daiyan/images/mr_tx.jpg')" alt="">
						</view>
						<view class="item-text">
							<view class="item-user">
								{{item.userProfile.nick}}
							</view>
							<view class="item-text-info">
								<rich-text :nodes="nodesFliter(item.lastMessage.messageForShow)"></rich-text>
							</view>
						</view>
						<view class="item-msg">
							<view class="item-msg-icon" v-if="item.unreadCount">{{item.unreadCount}}</view>
						</view>

					</view>


				</view>
			</view>


			<view class="list-box" v-else>
				<span class="msg-box">暂无聊天记录</span>
			</view>
		</view>




	</view>
</template>

<script>
	import userList from '../../commen/tim/user.js'
	import {
		mapState
	} from "vuex";
	export default {
		name: 'record',
		data() {
			return {
				userList: userList,
				friendList: [],
				isActive: 0, //默认聊天记录
			}
		},
		onLoad(option) {
			console.log(option.id)
			console.log(option.im)
			let promise = this.tim.login({
				// userID: 'dy100002',
				userID: option.id,
				// userSig: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwimVhgZAYASVK07JTiwoyExRsjI0MTAwtjAyMDeByKRWFGQWpQLFTU1NjYA6IKIlmblgMUsLE0tDCxOoaHFmOtDoGP2gEFdf84ykTM*0rLwo9yr3NEsnz4oUM1*ToDTt4kqn8HK35KDStHTLkGRbpVoAdtkx5g__'
				userSig: option.im
			});
			promise.then((res) => {
				console.log(res)
				//登录成功后 更新登录状态
				this.$store.commit("toggleIsLogin", true);
				//自己平台的用户基础信息
				var userInfo = {
					"id": 2,
					"userToken": "321ae3e5779b98239cc7b9e083b3432f",
					"phone": "",
					"nickname": option.nickname,
					"money": "500.15",
					"advocacy_bean": "3777.00",
					"stay_entry_money": "2.65",
					"yet_entry_money": "1.65",
					"yet_withdraw_money": "0.00",
					"identification_id": "dy100002",
					"IMSign": "eJwtjMEOgjAQBf9lz0a3pbSUxINevJhAqNGLF5OtuFERgShi-HcJ8G5vJpkv7LZu-vIVxCDnCLPhM-mi4TMPmD4C*8nJ1XQ9lSUTxEIhBpFEo0bj25IrD7FGFSGOrOF7T0RojTXCCDs1OO-DRRgcsuMio8RV8qJzR3Vnw01a*7Wmpg2Sm*v2Sj*e6Xu1hN8fIjcxZQ__",
					"advocacy_grade_value": "0",
					"introduction": option.introduction,
					"sex": "1735660800",
					"birthday": "1994-08-10",
					"province": "北京市",
					"city": "北京市",
					"county": "东城区",
					"auth_status": 3,
					"auth_cause": "",
					"school_data": {
						"school": "北京大学",
						"department": "超级院系",
						"entrance_time": "2020-08-10"
					},
					"identity_id": 2,
					"identity_name": "达人",
					"real_name": "李长寿",
					"id_number": "142625199406223999",
					"id_number_front": "/resource/api/img/20200804/3baeb324ac053003f97012a0797643d3.jpg",
					"id_number_contrary": "/resource/api/img/20200804/60c7c73798d5845e1352553284188a08.jpg",
					"start_validity": "2000-01-01",
					"end_validity": "2029-01-01",
					"weibo_account": "111",
					"douyin_account": "2222",
					"kuaishou_account": "3333",
					"avatarurl":option.avatarurl,
					"advocacy_goods_number": 8,
					"follow_buy_goods_number": 1,
					"exceed_number": 0,
					"public_benefit_number": 3
				}

				uni.setStorageSync('userInfo', JSON.stringify(userInfo))
				//tim 返回的用户信息
				uni.setStorageSync('userTIMInfo', JSON.stringify(res.data))
				console.log('userTIMInfo========>' + JSON.stringify(res.data))

			}).catch((err) => {
				console.warn('login error:', err); // 登录失败的相关信息
			});
		},
		onShow() {
			console.log('onShow=======================================>')
			// uni.hideHomeButton()
			if (this.isSDKReady) {
				console.log('isSDKReady=======================================>onShow')
				this.getConversationList()
			} else {
				console.log('!isSDKReady=======================================>onShow')
				uni.stopPullDownRefresh();
			}
		},
		
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			if (this.isSDKReady) {
				console.log('isSDKReady=======================================>onPullDownRefresh')
				this.getConversationList()
			} else {
				console.log('!isSDKReady=======================================>onPullDownRefresh')
				uni.stopPullDownRefresh();
			}
		},
		computed: {
			...mapState({
				isLogin: state => state.isLogin,
				isSDKReady: state => state.isSDKReady,
				conversationList: state => state.conversationList,
			})
		},
		watch: {
			isSDKReady(val) {
				//isSDKReady == true 
				console.log('updateUserInfo==========================================================>isSDKReady')
				console.log(val)
				if (val) {
					//更新用户自己的基础资料（头像+昵称+个性签名）
					this.updateUserInfo()
					//请求会话列表
					this.getConversationList()
				}
			},


		},
		methods: {
			imgIP(img){
				if(!img){
					return
				}
				if(img.indexOf('://')== -1){
				  img = service.imgurl+img
				}
				// var newimg =imgip+img
				// console.log(newimg)
				return img
			},
			createGroup() {
				let promise = this.tim.createGroup({
					type: this.$TIM.TYPES.GRP_PUBLIC,
					name: '阿萨德',
					memberList: [{
						userId: '3'
					}, {
						userId: '4'
					}] // 如果填写了 memberList，则必须填写 userID
				});
				promise.then(function(imResponse) { // 创建成功
					console.log(imResponse.data.group); // 创建的群的资料
					console.log('sss')
				}).catch(function(imError) {
					console.warn('createGroup error:', imError); // 创建群组失败的相关信息
				});
			},
			getGroup() {
				let promise = this.tim.getGroupList();
				promise.then(function(imResponse) {
					console.log('群组')
					console.log(imResponse.data.groupList); // 群组列表
				}).catch(function(imError) {
					console.warn('getGroupList error:', imError); // 获取群组列表失败的相关信息
				});
			},
			//注销登录
			outLoginBtn() {
				let promise = this.tim.logout();
				promise.then(res => {
					this.$store.commit('reset')
					uni.reLaunch({
						url: '../index/index'
					})
				}).catch(err => {
					console.log('退出失败')
				});
			},
			//提交用户的基础信息到Im
			updateUserInfo() {
				//将已经登陆的用户信息 提交到IM中
				console.log('updateUserInfo======================================================>')
				console.log(uni.getStorageSync('userInfo'))
				if(uni.getStorageSync('userInfo')){
					var  datamsg=uni.getStorageSync('userInfo')
					let userInfo = JSON.parse(datamsg)
					let promise = this.tim.updateMyProfile({
						nick: userInfo.nickname,
						avatar: userInfo.avatarurl,
						gender: this.$TIM.TYPES.GENDER_MALE,
						selfSignature: userInfo.introduction,
						allowType: this.$TIM.TYPES.ALLOW_TYPE_ALLOW_ANY
					});
					promise.then((res) => {
						console.log('提交资料成功')
					}).catch((err) => {
						console.warn('updateMyProfile error:', err); // 更新资料失败的相关信息
					});
				}
			},
			//聊天的节点加上外层的div
			nodesFliter(str) {
				let nodeStr = '<div style="align-items: center;word-wrap:break-word;">' + str + '</div>'
				return nodeStr
			},
			//切换tab
			changeTabBtn(_index) {
				this.isActive = _index
				if (this.isSDKReady) {
					this.getConversationList()
				}
			},
			//获取消息列表
			getConversationList() {
				// 拉取会话列表
				let promise = this.tim.getConversationList();
				promise.then((res) => {
					uni.stopPullDownRefresh();
					let conversationList = res.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
					if (conversationList.length) {

						//将返回的会话列表拼接上 用户的基本资料  
						//说明：如果已经将用户信息 提交到tim服务端了 就不需要再次拼接
						this.$store.commit("updateConversationList", conversationList);
					}
				}).catch((err) => {
					uni.stopPullDownRefresh();
					console.warn('getConversationList error:', err); // 获取会话列表失败的相关信息
				});
			},
			toRoom(item) {
				this.$store.commit('updateConversationActive', item)
				uni.navigateTo({
					url: './room'
				})
			},
			//选择用户聊天
			checkUserToRoom(toUserInfo) {
				this.$store.commit('createConversationActive', toUserInfo.userId)
				uni.navigateTo({
					url: './room'
				})
			}

		},
	}
</script>

<style scoped lange="scss">
	.list-box {
		width: 94%;
		margin: 20px auto;
	}

	.item-box {
		width: auto;
		height: 60px;
		padding: 10px;
		overflow: hidden;
		border-bottom: 1px solid #eee;
	}

	.item-img {
		float: left;
		/* margin-top: 10px; */
		width: 60px;
		height: 60px;
	}

	.item-img img {
		width: 100%;
		height: 100%;
	}

	.item-text {
		float: left;
		margin-left: 15px;
		width: 500rpx;
		height: 60px;
		color: #666;
		font-size: 28rpx;
	}

	.item-user {
		width: auto;
		height: 30px;
		line-height: 30px;
		color: #333;
		font-size: 18px;

	}

	.item-text-info {
		width: auto;
		height: 30px;
		line-height: 30px;
		color: #666;
		font-size: 14px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.user-box {
		width: auto;
		height: 40px;
		padding: 0 20rpx;
	}

	.nav-tab {
		padding-top: 20rpx;
		background: #fff;
		height: 80rpx;

	}

	.tab-item {
		float: left;
		height: 70rpx;
		padding: 0 20rpx;
		line-height: 70rpx;
		color: #666;
		font-size: 28rpx;
		border: 1px solid #F56C6C;
		border-top-left-radius: 25rpx;
		border-bottom-left-radius: 25rpx;
	}

	.tab-item1 {
		float: left;
		height: 70rpx;
		padding: 0 20rpx;
		line-height: 70rpx;
		color: #666;
		font-size: 28rpx;
		border: 1px solid #F56C6C;
		border-top-right-radius: 25rpx;
		border-bottom-right-radius: 25rpx;
	}

	.tab-item-active {
		color: #fff;
		background: #F56C6C;
	}

	.msg-box {
		width: 100%;
		line-height: 20px;
		font-size: 14px;
		color: #666;
		text-align: center;
	}

	.user-item-box {
		padding: 20rpx 0;
		width: auto;
		height: 70rpx;
		line-height: 70rpx;
		cursor: pointer;
		border-bottom: 1px solid #eee;
	}

	.user-img {
		float: left;
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
		overflow: hidden;
	}

	.user-img image {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
	}

	.user-name {
		float: left;
		margin-left: 20rpx;
		width: 250rpx;
		height: 70rpx;
		line-height: 70rpx;
		color: #666;
		font-weight: 500;
	}

	.item-msg {
		float: left;
		width: 40rpx;
		height: 100rpx;
	}

	.item-msg-icon {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: #f06c7a;
		color: #fff;
		line-height: 20px;
		margin-top: 15px;
		text-align: center;
		font-size: 12px;
	}

	.clear-box {
		clear: both;
	}

	.out-login {
		float: right;
		margin-right: 20rpx;
		height: 70rpx;
		line-height: 70rpx;
		padding: 0 40rpx;
		border-radius: 25rpx;
		color: #fff;
		background: #F56C6C;
		font-size: 26rpx;
	}
</style>
