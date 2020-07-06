<template>
	<view>
		<view class="content" @touchstart="hideDrawer">
			<!-- <scroll-view class="msg-list" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop"
			 :scroll-into-view="scrollToView" @scrolltoupper="loadHistory" upper-threshold="50"> -->
			 <view class="msg-list">
				<view class="msg-list1">
				<!-- 加载历史数据waitingUI -->
				<view class="loading" v-if="isHistoryLoading">
					<view class="spinner">
						<view class="rect1"></view>
						<view class="rect2"></view>
						<view class="rect3"></view>
						<view class="rect4"></view>
						<view class="rect5"></view>
					</view>
				</view>
				<view class="row" v-for="(item,index) in msgList" :key="index" :id="item.ID">
					<!-- 用户消息 -->
					<block>
						<!-- 自己发出的消息 -->
						<view class="my" v-if="item.flow=='out'">
							<!-- 左-消息 -->
							<view class="left">
								<!-- 文字消息 -->
								<view v-if="item.type==TIM.TYPES.MSG_TEXT" class="bubble">
									<rich-text :nodes="nodesFliter(item.payload.text)"></rich-text>
								</view>
								<!-- 图片消息 -->
								<view v-if="item.type==TIM.TYPES.MSG_IMAGE" class="bubble">
									<image @tap="previmg" :data-url="item.payload.imageInfoArray[0].imageUrl"
									 :src="item.payload.imageInfoArray[0].imageUrl" mode="aspectFill"
										style="width: 64px;height: 64px;"></image>
								</view>
								<!-- 自定义消息 -->
								<view v-if="item.type==TIM.TYPES.MSG_CUSTOM" class="bubble">
									<view v-if="item.payload.data=='custom'">{{item.payload.data}}</view>
									<view v-if="item.payload.data=='custom'">{{item.payload.description}}</view>
									<view v-if="item.payload.data=='custom'">{{item.payload.extension}}</view>
									<view v-if="item.payload.data=='custom1'">
										<!-- {{JSON.parse(item.payload.extension)}} -->
										{{'自定义参数1:'+getarg(item.payload.extension,'a',item.payload.data)}}
										{{'自定义参数2:'+getarg(item.payload.extension,'a1',item.payload.data)}}
										{{'自定义参数3:'+getarg(item.payload.extension,'a2',item.payload.data)}}
										{{'自定义参数4:'+getarg(item.payload.extension,'a3',item.payload.data)}}
									</view>
									<view v-if="item.payload.data=='custom_good'"  class="chat_box" @tap="jump" :data-url="getarg(item.payload.extension,'a2',item.payload.data)">
										<image class="chat_img" :src="getarg(item.payload.extension,'a3',item.payload.data)"
										 mode="aspectFill" style="width: 64px;height: 64px;"></image>
										<view class="chat_msg">
											<view class="gb_name oh1">{{item.payload.description}}</view>
											<view class="gb_msg  oh1">{{'自定义参数1:'+getarg(item.payload.extension,'a',item.payload.data)}}</view>
											<view class="gb_msg oh1">{{'自定义参数2:'+getarg(item.payload.extension,'a1',item.payload.data)}}</view>
											<view class="gb_msg oh1">{{'自定义参数3:'+getarg(item.payload.extension,'a2',item.payload.data)}}</view>
										</view>
									</view>
								</view>
							</view>
							<!-- 右-头像 -->
							<view class="right">
								<image :src="userInfo.img"></image>
							</view>
						</view>
						<!-- 别人发出的消息 -->
						<view class="other" v-else>
							<!-- 左-头像 -->
							<view class="left">
								<image :src="toUserInfo.img"></image>
							</view>
							<!-- 右-用户名称-时间-消息 -->
							<view class="right">
								<view class="username">
									<view class="name">{{toUserInfo.user}}</view>
									<view class="time" v-if="index==0">{{timeFliter(item.time)}}</view>
									<!-- <view v-else-if="timeFliter(item.time)!=timeFliter(msgList[index-1].time)"></view> -->
									<!-- <view v-else-if="index>0">{{timeFliter(msgList[index-1].time)}}</view> -->
									<view v-else-if="index>0">{{gettime1(index-1)}}</view>
									<view style="color: rgba(0,0,0,0);">{{toUserInfo.user}}</view>
								</view>
								<!-- 文字消息 -->
								<view v-if="item.type==TIM.TYPES.MSG_TEXT" class="bubble">
									<rich-text :nodes="nodesFliter(item.payload.text)"></rich-text>
								</view>
								<!-- 图片消息 -->
								<view v-if="item.type==TIM.TYPES.MSG_IMAGE" class="bubble">
									<image @tap="previmg" :data-url="item.payload.imageInfoArray[0].imageUrl"
									 :src="item.payload.imageInfoArray[0].imageUrl" mode="aspectFill"
										style="width: 64px;height: 64px;"></image>
								</view>
								<view v-if="item.type==TIM.TYPES.MSG_CUSTOM" class="bubble">
									<view v-if="item.payload.data=='custom'">{{item.payload.data}}</view>
									<view v-if="item.payload.data=='custom'">{{item.payload.description}}</view>
									<view v-if="item.payload.data=='custom'">{{item.payload.extension}}</view>
									<view v-if="item.payload.data=='custom1'">
										<!-- {{JSON.parse(item.payload.extension)}} -->
										{{'自定义参数1:'+getarg(item.payload.extension,'a',item.payload.data)}}
										{{'自定义参数2:'+getarg(item.payload.extension,'a1',item.payload.data)}}
										{{'自定义参数3:'+getarg(item.payload.extension,'a2',item.payload.data)}}
										{{'自定义参数4:'+getarg(item.payload.extension,'a3',item.payload.data)}}
									</view>
									<view v-if="item.payload.data=='custom_good'"  class="chat_box" @tap="jump" :data-url="getarg(item.payload.extension,'a2',item.payload.data)">
										<image class="chat_img" :src="getarg(item.payload.extension,'a3',item.payload.data)"
										 mode="aspectFill" style="width: 64px;height: 64px;"></image>
										<view class="chat_msg">
											<view class="gb_name oh1">{{item.payload.description}}</view>
											<view class="gb_msg oh1">{{'自定义参数1:'+getarg(item.payload.extension,'a',item.payload.data)}}</view>
											<view class="gb_msg oh1">{{'自定义参数2:'+getarg(item.payload.extension,'a1',item.payload.data)}}</view>
											<view class="gb_msg oh1">{{'自定义参数3:'+getarg(item.payload.extension,'a2',item.payload.data)}}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</block>
				</view>
			<!-- </scroll-view> -->
			</view>
			</view>
		</view>
		<!-- 抽屉栏 -->
		<view class="popup-layer" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- 表情 -->
			<swiper class="emoji-swiper" :class="{hidden:hideEmoji}" indicator-dots="true" duration="150">
				<swiper-item v-for="(page,pid) in emojiList" :key="pid">
					<view v-for="(em,eid) in page" :key="eid" @tap="addEmoji(em)">
						<image mode="widthFix" :src="'/static/img/emoji/'+em.url"></image>
					</view>
				</swiper-item>
			</swiper>
			<!-- 更多功能 相册-拍照-红包 -->
			<view class="more-layer" :class="{hidden:hideMore}">
				<view class="list">
					<view class="box" @tap="chooseImage">
						<view class="icon tupian2"></view>
					</view>
					<view class="box" @tap="camera">
						<view class="icon paizhao"></view>
					</view>
					<view class="box" @tap="handRedEnvelopes">
						<view class="icon hongbao"></view>
					</view>
					<view class="box" @tap="customModal">
						<view class="iconfont icon-zidingyi"></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部输入栏 -->
		<view class="input-box" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- H5下不能录音，输入栏布局改动一下 -->
			<!-- #ifndef H5 -->
			<!-- <view class="voice">
				<view class="icon" :class="isVoice?'jianpan':'yuyin'" @tap="switchVoice"></view>
			</view> -->
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<!-- #endif -->
			<view class="textbox">
				<view class="voice-mode" :class="[isVoice?'':'hidden',recording?'recording':'']" @touchstart="voiceBegin"
				 @touchmove.stop.prevent="voiceIng" @touchend="voiceEnd" @touchcancel="voiceCancel">{{voiceTis}}</view>
				<view class="text-mode" :class="isVoice?'hidden':''">
					<view class="box" style="flex: 1;">
						<!-- <textarea auto-height="true" v-model="textMsg" @focus="textareaFocus" cursor-spacing="18" /> -->
						<input type="text"
						       class="input"
						       v-model.lazy:value="textMsg"
						       confirm-type="send"
						       :focus="isFocus"
						       @focus="isFocus = true"
						       @blur="isFocus = false"
						       @confirm='sendText'
									 cursor-spacing="18"/>
						</view>
					<view class="em" @tap="chooseEmoji">
						<view class="icon biaoqing"></view>
					</view>
				</view>
			</view>
			<!-- #ifndef H5 -->
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<!-- #endif -->
			<view class="send" :class="isVoice?'hidden':''" @tap="sendText">
				<view class="btn">发送</view>
			</view>
		</view>
		<!-- 录音UI效果 -->
		<view class="record" :class="recording?'':'hidden'">
			<view class="ing" :class="willStop?'hidden':''"><view class="icon luyin2" ></view></view>
			<view class="cancel" :class="willStop?'':'hidden'"><view class="icon chehui" ></view></view>
			<view class="tis" :class="willStop?'change':''">{{recordTis}}</view>
		</view>
		<!-- 红包弹窗 -->
		<view class="windows" :class="windowsState">
			<!-- 遮罩层 -->
			<view class="mask" @touchmove.stop.prevent="discard" @tap="closeRedEnvelope"></view>
			<view class="layer" @touchmove.stop.prevent="discard">
				<view class="open-redenvelope">
					<view class="top">
						<view class="close-btn">
							<view class="icon close" @tap="closeRedEnvelope"></view>
						</view>
						<image src="/static/img/im/face/face_1.jpg"></image>
					</view>
					<view class="from">来自{{redenvelopeData.from}}</view>
					<view class="blessing">{{redenvelopeData.blessing}}</view>
					<view class="money">{{redenvelopeData.money}}</view>
					<view class="showDetails" @tap="toDetails(redenvelopeData.rid)">
						查看领取详情 <view class="icon to"></view>
					</view>
				</view>
			</view>
			
		</view>
		
		
		
	</view>
</template>
<script>
	import userList from '../../commen/tim/user.js'
	import {mapState} from "vuex";
	
	export default {
		data() {
			return {
				//TIM变量
				conversationActive:null,
				toUserId:'',
				toUserInfo:null,
				userInfo:null,
				nextReqMessageID:'',
				count:15,
				isCompleted:'',
				msgList:[],
			    TIM:null, 
				
				
				//文字消息
				textMsg:'',
				//消息列表
				isHistoryLoading:false,
				scrollAnimation:false,
				scrollTop:0,
				scrollToView:'',
			
				msgImgList:[],
				myuid:0,
				
				//录音相关参数
				// #ifndef H5
				//H5不能录音
				RECORDER:uni.getRecorderManager(),
				// #endif
				isVoice:false,
				voiceTis:'按住 说话',
				recordTis:"手指上滑 取消发送",
				recording:false,
				willStop:false,
				initPoint:{identifier:0,Y:0},
				recordTimer:null,
				recordLength:0,
				
				//播放语音相关参数
				AUDIO:uni.createInnerAudioContext(),
				playMsgid:null,
				VoiceTimer:null,
				// 抽屉参数
				popupLayerClass:'',
				// more参数
				hideMore:true,
				//表情定义
				hideEmoji:true,
				emojiList:this.$commen.emojiList,
				//表情图片图床名称 ，由于我上传的第三方图床名称会有改变，所以有此数据来做对应，您实际应用中应该不需要
				onlineEmoji:{"100.gif":"AbNQgA.gif","101.gif":"AbN3ut.gif","102.gif":"AbNM3d.gif","103.gif":"AbN8DP.gif","104.gif":"AbNljI.gif","105.gif":"AbNtUS.gif","106.gif":"AbNGHf.gif","107.gif":"AbNYE8.gif","108.gif":"AbNaCQ.gif","109.gif":"AbNN4g.gif","110.gif":"AbN0vn.gif","111.gif":"AbNd3j.gif","112.gif":"AbNsbV.gif","113.gif":"AbNwgs.gif","114.gif":"AbNrD0.gif","115.gif":"AbNDuq.gif","116.gif":"AbNg5F.gif","117.gif":"AbN6ET.gif","118.gif":"AbNcUU.gif","119.gif":"AbNRC4.gif","120.gif":"AbNhvR.gif","121.gif":"AbNf29.gif","122.gif":"AbNW8J.gif","123.gif":"AbNob6.gif","124.gif":"AbN5K1.gif","125.gif":"AbNHUO.gif","126.gif":"AbNIDx.gif","127.gif":"AbN7VK.gif","128.gif":"AbNb5D.gif","129.gif":"AbNX2d.gif","130.gif":"AbNLPe.gif","131.gif":"AbNjxA.gif","132.gif":"AbNO8H.gif","133.gif":"AbNxKI.gif","134.gif":"AbNzrt.gif","135.gif":"AbU9Vf.gif","136.gif":"AbUSqP.gif","137.gif":"AbUCa8.gif","138.gif":"AbUkGQ.gif","139.gif":"AbUFPg.gif","140.gif":"AbUPIS.gif","141.gif":"AbUZMn.gif","142.gif":"AbUExs.gif","143.gif":"AbUA2j.gif","144.gif":"AbUMIU.gif","145.gif":"AbUerq.gif","146.gif":"AbUKaT.gif","147.gif":"AbUmq0.gif","148.gif":"AbUuZV.gif","149.gif":"AbUliF.gif","150.gif":"AbU1G4.gif","151.gif":"AbU8z9.gif","152.gif":"AbU3RJ.gif","153.gif":"AbUYs1.gif","154.gif":"AbUJMR.gif","155.gif":"AbUadK.gif","156.gif":"AbUtqx.gif","157.gif":"AbUUZ6.gif","158.gif":"AbUBJe.gif","159.gif":"AbUdIO.gif","160.gif":"AbU0iD.gif","161.gif":"AbUrzd.gif","162.gif":"AbUDRH.gif","163.gif":"AbUyQA.gif","164.gif":"AbUWo8.gif","165.gif":"AbU6sI.gif","166.gif":"AbU2eP.gif","167.gif":"AbUcLt.gif","168.gif":"AbU4Jg.gif","169.gif":"AbURdf.gif","170.gif":"AbUhFS.gif","171.gif":"AbU5WQ.gif","172.gif":"AbULwV.gif","173.gif":"AbUIzj.gif","174.gif":"AbUTQs.gif","175.gif":"AbU7yn.gif","176.gif":"AbUqe0.gif","177.gif":"AbUHLq.gif","178.gif":"AbUOoT.gif","179.gif":"AbUvYF.gif","180.gif":"AbUjFU.gif","181.gif":"AbaSSJ.gif","182.gif":"AbUxW4.gif","183.gif":"AbaCO1.gif","184.gif":"Abapl9.gif","185.gif":"Aba9yR.gif","186.gif":"AbaFw6.gif","187.gif":"Abaiex.gif","188.gif":"AbakTK.gif","189.gif":"AbaZfe.png","190.gif":"AbaEFO.gif","191.gif":"AbaVYD.gif","192.gif":"AbamSH.gif","193.gif":"AbaKOI.gif","194.gif":"Abanld.gif","195.gif":"Abau6A.gif","196.gif":"AbaQmt.gif","197.gif":"Abal0P.gif","198.gif":"AbatpQ.gif","199.gif":"Aba1Tf.gif","200.png":"Aba8k8.png","201.png":"AbaGtS.png","202.png":"AbaJfg.png","203.png":"AbaNlj.png","204.png":"Abawmq.png","205.png":"AbaU6s.png","206.png":"AbaaXn.png","207.png":"Aba000.png","208.png":"AbarkT.png","209.png":"AbastU.png","210.png":"AbaB7V.png","211.png":"Abafn1.png","212.png":"Abacp4.png","213.png":"AbayhF.png","214.png":"Abag1J.png","215.png":"Aba2c9.png","216.png":"AbaRXR.png","217.png":"Aba476.png","218.png":"Abah0x.png","219.png":"Abdg58.png"},
				//红包相关参数
				windowsState:'',
				redenvelopeData:{
					rid:null,	//红包ID
					from:null,
					face:null,
					blessing:null,
					money:null
				},
				
				
				customModalVisible: false,
				customData: '',
				customDescription: '',
				customExtension: '',
				focusedInput: '',
				
				
				isShow: false,
			};
		},
		computed:{
			...mapState({
				currentMessageList:state=>state.currentMessageList,
			})
		},
		watch:{
			currentMessageList(newVal,oldVal){
				this.msgList = newVal
				this.screenMsg(newVal,oldVal)
			},
		},
		onLoad(option) {
		
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			this.toUserId = this.$store.state.toUserId
			this.conversationActive = this.$store.state.conversationActive
			this.TIM = this.$TIM
			//获取聊天对象的用户信息---有后端的情况这里 使用后端api请求、
			//防止初次聊天的时候 没有对方的基础信息
			userList.forEach(item=>{
				if(this.toUserId == item.userId){
					this.toUserInfo = item
				}
			})
			this.getMsgList();
			//语音自然播放结束
			this.AUDIO.onEnded((res)=>{
				this.playMsgid=null;
			});
			// #ifndef H5
			//录音开始事件
			this.RECORDER.onStart((e)=>{
				this.recordBegin(e);
			})
			//录音结束事件
			this.RECORDER.onStop((e)=>{
				this.recordEnd(e);
			})
			// #endif
		},
		onShow(){
			var that =this
			that.isShow = true
			setTimeout(function (){
				that.scrollToBottom()
				that.scrollTop = 99999999999999;
				that.isHistoryLoading = false;
			},500)
		},
		onUnload(){
			//退出页面 将所有的会话内的消息设置为已读
			let promise = this.tim.setMessageRead({conversationID: this.conversationActive.conversationID});
			promise.then(function(imResponse) {
				console.log('全部已读')
			  // 已读上报成功
			}).catch(function(imError) {
			  // 已读上报失败
			  console.warn('setMessageRead error:', imError);
			});
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
		},
		methods:{
			gettime1(idx){
				if(idx<0){
					return
				}
				console.log(idx,idx+1)
				var time=this.msgList[idx].time
				var time1=this.msgList[idx+1].time
				console.log(this.getchattime(time),this.getchattime(time1))
				if(this.getchattime(time)!=this.getchattime(time1)){
					return this.getchattime(time1)
				}
			},
			jump(e){
				console.log(e)
				uni.navigateTo({
					url:e.currentTarget.dataset.url
				})
			},
			onPullDownRefresh: function () {
			  uni.stopPullDownRefresh();
			},
			// 滚动到列表bottom
			scrollToBottom () {
			  if (this.isShow) {
			    wx.pageScrollTo({
			      scrollTop: 9999999
			    })
			  }
			},
			getarg(str,arg,type){
				if(type=='custom'){
					return
				}
				if(!str){
					return
				}
				// console.log(str)
				var reg = /\\$/gi
				str = str.replace(reg, '')
				// console.log(str)
				var jsonstr=JSON.parse(str)
				// console.log(jsonstr)
				if(jsonstr.hasOwnProperty(arg)){
				
					// console.log(jsonstr[arg]);
					return jsonstr[arg]
				}
			},
			//聊天的节点加上外层的div
			nodesFliter(str){
				let nodeStr = '<div class="ltbox_div" style="word-wrap:break-word;line-height:40upx;">'+str+'</div>' 
				return nodeStr
			},
			//时间过滤
			timeFliter(timer){
				let timeData = new Date(timer*1000)
				let str = this.$commen.dateTimeFliter(timeData)		 
				return str
			},
			getchattime(time) {
			  if (!time) {
			    return
			  }
			  var newYear = new Date().getFullYear();//目前系统时间是哪一年
			  var nowMonth = new Date().getMonth() + 1;//目前系统时间是哪一月
			  var nowDay = new Date().getDate();//目前系统时间是几号
			  time = Number(time*1000)
			  var sendtime = new Date(time)
			  var sendYear = sendtime.getFullYear()
			  var sendMonth = sendtime.getMonth() + 1
			  var sendDate = sendtime.getDate()
			  var sendHours = sendtime.getHours()
			  var sendMinutes = sendtime.getMinutes()
			  if (sendMinutes < 10) {
			    sendMinutes = '0' + sendMinutes
			  }
			  // console.log(time)
			  console.log(sendtime)
			  // console.log(sendtime.getDate())
			  if (sendYear == newYear) {
			
			    // console.log(sendDate, nowDay)
			    if (sendMonth==nowMonth&&sendDate == nowDay) {
			
			      return sendHours + ':' + sendMinutes
			    }
			
			
			    return sendMonth + '-' + sendDate + ' ' + sendHours + ':' + sendMinutes
			  } else {
			    return sendYear + '-' + sendMonth + '-' + sendDate + ' ' + sendHours + ':' + sendMinutes
			  }
			},
			// 接受消息(定位消息)
			screenMsg(newVal,oldVal){
				if(newVal[0] && oldVal[0]){
					if(newVal[0].ID != oldVal[0].ID && newVal.length>=this.count ){	
						
						let _index = newVal.length-oldVal.length-1
						this.$nextTick(()=> {this.scrollToView =newVal[_index].ID});
						// console.log(this.scrollToView)
						//拉取历史记录不用改变定位消息
					}else{
						//新的消息来了 自动向下滑动到最新消息
						this.$nextTick(()=> {this.scrollToView =newVal[newVal.length-1].ID});
					}
				}else{
					console.log('*****')
					//第一次拉取历史记录 定位到最后一条消息
					this.$nextTick(()=> {this.scrollToView =newVal[newVal.length-1].ID;this.scrollTop = 9999999;});
				}
			},
			//触发滑动到顶部(加载历史信息记录)
			loadHistory(e){
					this.isHistoryLoading = true;
					// 更多消息列表
						let conversationID = this.conversationActive.conversationID
						let promise = this.tim.getMessageList({conversationID: conversationID,nextReqMessageID:this.nextReqMessageID,count: this.count});
						promise.then((res)=> {
						  this.$store.commit('unshiftCurrentMessageList',  res.data.messageList)
						  this.nextReqMessageID =  res.data.nextReqMessageID // 用于续拉，分页续拉时需传入该字段。
						  this.isCompleted =  res.data.isCompleted
						  this.isHistoryLoading = false;
						});
					
					// //这段代码很重要，不然每次加载历史数据都会跳到顶部
					// this.$nextTick(function() {
					// 	this.scrollToView = this.nextReqMessageID;//跳转上次的第一行信息位置
					// 	this.$nextTick(function() {
					// 		this.scrollAnimation = true;//恢复滚动动画
					// 	});	
					// });
					
			},
			// 加载初始页面消息
			getMsgList(){
				// 历史消息列表
					let conversationID = this.conversationActive.conversationID
					let promise = this.tim.getMessageList({conversationID: conversationID, count: this.count});
					promise.then((res)=> {
						console.log(res.data)
						if(!res.data.nextReqMessageID){
							return
						}
						this.$store.commit('pushCurrentMessageList',  res.data.messageList)
					  this.nextReqMessageID =  res.data.nextReqMessageID // 用于续拉，分页续拉时需传入该字段。
					  this.isCompleted =  res.data.isCompleted
					  this.scrollToView = res.data.messageList[res.data.messageList.length-1].ID
					});
				// 滚动到底部
				this.$nextTick(function() {
					//进入页面滚动到底部
					this.scrollTop = 9999;
					this.$nextTick(function() {
						this.scrollAnimation = true;
					});
				});
			},
			//处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
			setPicSize(content){
				// 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
				let maxW = uni.upx2px(350);//350是定义消息图片最大宽度
				let maxH = uni.upx2px(350);//350是定义消息图片最大高度
				if(content.w>maxW||content.h>maxH){
					let scale = content.w/content.h;
					content.w = scale>1?maxW:maxH*scale;
					content.h = scale>1?maxW/scale:maxH;
				}
				return content;
			},
			//更多功能(点击+弹出) 
			showMore(){
				this.isVoice = false;
				this.hideEmoji = true;
				if(this.hideMore){
					this.hideMore = false;
					this.openDrawer();
				}else{
					this.hideDrawer();
				}
			},
			// 打开抽屉
			openDrawer(){
				this.popupLayerClass = 'showLayer';
			},
			// 隐藏抽屉
			hideDrawer(){
				this.popupLayerClass = '';
				setTimeout(()=>{
					this.hideMore = true;
					this.hideEmoji = true;
				},150);
			},
			// 选择图片发送
			chooseImage(){
				this.getImage('album');
			},
			//拍照发送
			camera(){
				this.getImage('camera');
			},
			//发红包
			handRedEnvelopes(){
				uni.navigateTo({
					url:'HM-hand/HM-hand'
				});
				this.hideDrawer();
			},
			//选照片 or 拍照
			getImage(type){
				var that =this
				that.hideDrawer();
				uni.chooseImage({
					sourceType:[type],
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					count: 1,
					success: (res)=>{
						that.sendMsg(res,'img');
						return
						/*for(let i=0;i<res.tempFilePaths.length;i++){
							uni.getImageInfo({
								src: res.tempFilePaths[i],
								success: (image)=>{
									console.log(image)
									console.log(image.width);
									console.log(image.height);
									let msg = {url:res.tempFilePaths[i],w:image.width,h:image.height};
									that.sendMsg(msg,'img');
								}
							});
						}*/
					}
				});
			},
			// 选择表情
			chooseEmoji(){
				this.hideMore = true;
				if(this.hideEmoji){
					this.hideEmoji = false;
					this.openDrawer();
				}else{
					this.hideDrawer();
				}
			},
			//添加表情
			addEmoji(em){
				this.textMsg+=em.alt;
			},
			
			//获取焦点，如果不是选表情ing,则关闭抽屉
			textareaFocus(){
				if(this.popupLayerClass=='showLayer' && this.hideMore == false){
					this.hideDrawer();
				}
			},
			// 发送文字消息
			sendText(){
				this.hideDrawer();//隐藏抽屉
				if(!this.textMsg){
					return;
				}
				let content = this.replaceEmoji(this.textMsg);
				let msg = {text:content}
				this.sendMsg(msg,'text');
				this.textMsg = '';//清空输入框
			},
			//替换表情符号为图片
			replaceEmoji(str){
				let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g,(item, index)=>{
					console.log("item: " + item);
					for(let i=0;i<this.emojiList.length;i++){
						let row = this.emojiList[i];
						for(let j=0;j<row.length;j++){
							let EM = row[j];
							if(EM.alt==item){
								//在线表情路径，图文混排必须使用网络路径，请上传一份表情到你的服务器后再替换此路径 
								//比如你上传服务器后，你的100.gif路径为https://www.xxx.com/emoji/100.gif 则替换onlinePath填写为https://www.xxx.com/emoji/
								let onlinePath = 'https://s2.ax1x.com/2019/04/12/'
								let imgstr = '<img class="emoji_i" src="'+onlinePath+this.onlineEmoji[EM.url]+'">';
								console.log("imgstr: " + imgstr);
								return imgstr;
							}
						}
					}
				});
				return replacedStr;
			},
			
			// 发送消息
			sendMsg(content,type){
				console.log('????')
				let message
				console.log(type)
				if(type=='custom'){
					message = this.tim.createCustomMessage({
					  to: this.toUserId,
					  conversationType: 'C2C',
					  payload: {
					   data: content.data,//自定义消息的数据字段
					   description: content.description,//自定义消息的说明字段
					   extension: content.extension,//自定义消息的扩展字段
					  }
					});	
				}else	if(type=='img'){
					message = this.tim.createImageMessage({
					  to: this.toUserId,
					  conversationType: 'C2C',
					  payload: {
					    file: content
					  }
					});	
				}else{
					message = this.tim.createTextMessage({
					  to: this.toUserId,
					  conversationType: 'C2C',
					  payload: {
					    text: content.text
					  }
					});	
				}
				
				console.log('????1')
				this.$store.commit('pushCurrentMessageList', message)
				let pomise = this.tim.sendMessage(message)
				pomise.then(
					(res)=>{
						this.$nextTick(()=> {
							// 滚动到底
							this.scrollToView = res.data.message.ID
							this.scrollToBottom()
						});
					},
					(err)=>{
						console.log(err)
					}
				)	
			},
			
			// 添加文字消息到列表
			addTextMsg(msg){
				this.msgList.push(msg);
			},
			// 添加语音消息到列表
			addVoiceMsg(msg){
				this.msgList.push(msg);
			},
			// 添加图片消息到列表
			addImgMsg(msg){
				msg.msg.content = this.setPicSize(msg.msg.content);
				this.msgImgList.push(msg.msg.content.url);
				this.msgList.push(msg);
			},
			addRedEnvelopeMsg(msg){
				this.msgList.push(msg);
			},
			// 添加系统文字消息到列表
			addSystemTextMsg(msg){
				this.msgList.push(msg);
			},
			// 添加系统红包消息到列表
			addSystemRedEnvelopeMsg(msg){
				this.msgList.push(msg);
			},
			// 打开红包
			openRedEnvelope(msg,index){
				let rid = msg.content.rid;
				uni.showLoading({
					title:'加载中...'
				});
				console.log("index: " + index);
				//模拟请求服务器效果
				setTimeout(()=>{
					//加载数据
					if(rid==0){
						this.redenvelopeData={
							rid:0,	//红包ID
							from:"大黑哥",
							face:"/static/img/im/face/face.jpg",
							blessing:"恭喜发财，大吉大利",
							money:"已领完"
						}
					}else{
						this.redenvelopeData={
							rid:1,	//红包ID
							from:"售后客服008",
							face:"/static/img/im/face/face_2.jpg",
							blessing:"恭喜发财",
							money:"0.01"
						}
						if(!msg.content.isReceived){
							// {type:"system",msg:{id:8,type:"redEnvelope",content:{text:"你领取了售后客服008的红包"}}},
							this.sendSystemMsg({text:"你领取了"+(msg.userinfo.uid==this.myuid?"自己":msg.userinfo.username)+"的红包"},'redEnvelope');
							console.log("this.msgList[index]: " + JSON.stringify(this.msgList[index]));
							this.msgList[index].msg.content.isReceived = true;
						}
					}
					uni.hideLoading();
					this.windowsState = 'show';
					
				},200)	
			},
			
			// 关闭红包弹窗
			closeRedEnvelope(){
				this.windowsState = 'hide';
				setTimeout(()=>{
					this.windowsState = '';
				},200)
			},
			sendSystemMsg(content,type){
				let lastid = this.msgList[this.msgList.length-1].msg.id;
				lastid++;
				let row = {type:"system",msg:{id:lastid,type:type,content:content}};
				this.screenMsg(row)
			},
			//领取详情
			toDetails(rid){
				uni.navigateTo({
					url:'HM-details/HM-details?rid='+rid
				})
			},
			// 预览图片
			showPic(msg){
				uni.previewImage({
					indicator:"none",
					current:msg.content.url,
					urls: this.msgImgList
				});
			},
			// 播放语音
			playVoice(msg){
				this.playMsgid=msg.id;
				this.AUDIO.src = msg.content.url;
				this.$nextTick(function() {
					this.AUDIO.play();
				});
			},
			// 录音开始
			voiceBegin(e){
				if(e.touches.length>1){
					return ;
				}
				this.initPoint.Y = e.touches[0].clientY;
				this.initPoint.identifier = e.touches[0].identifier;
				this.RECORDER.start({format:"mp3"});//录音开始,
			},
			//录音开始UI效果
			recordBegin(e){
				this.recording = true;
				this.voiceTis='松开 结束';
				this.recordLength = 0;
				this.recordTimer = setInterval(()=>{
					this.recordLength++;
				},1000)
			},
			// 录音被打断
			voiceCancel(){
				this.recording = false;
				this.voiceTis='按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.willStop = true;//不发送录音
				this.RECORDER.stop();//录音结束
			},
			// 录音中(判断是否触发上滑取消发送)
			voiceIng(e){
				if(!this.recording){
					return;
				}
				let touche = e.touches[0];
				//上滑一个导航栏的高度触发上滑取消发送
				if(this.initPoint.Y - touche.clientY>=uni.upx2px(100)){
					this.willStop = true;
					this.recordTis = '松开手指 取消发送'
				}else{
					this.willStop = false;
					this.recordTis = '手指上滑 取消发送'
				}
			},
			// 结束录音
			voiceEnd(e){
				if(!this.recording){
					return;
				}
				this.recording = false;
				this.voiceTis='按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.RECORDER.stop();//录音结束
			},
			//录音结束(回调文件)
			recordEnd(e){
				clearInterval(this.recordTimer);
				if(!this.willStop){
					console.log("e: " + JSON.stringify(e));
					let msg = {
						length:0,
						url:e.tempFilePath
					}
					let min = parseInt(this.recordLength/60);
					let sec = this.recordLength%60;
					min = min<10?'0'+min:min;
					sec = sec<10?'0'+sec:sec;
					msg.length = min+':'+sec;
					this.sendMsg(msg,'voice');
				}else{
					console.log('取消发送录音');
				}
				this.willStop = false;
			},
			// 切换语音/文字输入
			switchVoice(){
				this.hideDrawer();
				this.isVoice = this.isVoice?false:true;
			},
			discard(){
				return;
			},
			customModal () {
				var that=this
			  uni.showModal({
			      title: '提示',
			      content: '是否发送自定义消息',
			      success: function (res) {
			          if (res.confirm) {
			              console.log('用户点击确定');
										var ext={
											a:'a',
											a1:'a1',
											a2:'/pages/index/index',
											a3:'http://119.90.34.147:8080/finance/img/system/touxiang.jpg',
										}
										ext=JSON.stringify(ext)
										var msg={
											data:'custom_good',
											description:'自定义消息的说明字段',
											extension:ext
										}
										that.sendMsg(msg,'custom')
			          } else if (res.cancel) {
			              console.log('用户点击取消');
			          }
			      }
			  });
			},
			
			// 选项卡关闭
			handleClose () {
			  this.rateModal = false
			  this.isFocus = false
			  this.isMoreOpen = false
			  this.isEmojiOpen = false
			},
			previmg(e){
				console.log(e)
				var urls=[]
				urls.push(e.currentTarget.dataset.url)
				// return
				uni.previewImage({
						urls: urls,
						longPressActions: {
								itemList: ['发送给朋友', '保存图片', '收藏'],
								success: function(data) {
										console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
								},
								fail: function(err) {
										console.log(err.errMsg);
								}
						}
				});
			}
		}
	}
</script>
<style lang="scss">
	@import "@/static/HM-chat/css/style.scss"; 
	.msg-list{
		// padding-bottom: 140px;
		
	}
	.msg-list1{
		width: 100%;
		padding-bottom: 100upx;
	}
	.chat_box{
		width: 400upx;
		display: flex;
	}
	.chat_img{
		width: 120upx;
		height: 120upx;
		margin-right: 20upx;
	}
	.chat_msg{
		display: flex;
		flex-direction: column;
	}
	.gb_name{
		font-size: 28upx;
	}
	.gb_msg{
		font-size: 22upx;
	}
	.ltbox_div{
		line-height: 45upx;
	}
	.emoji_i{
		height: 40upx;
		width: 40upx;
		padding: 2upx;
		box-sizing: border-box;
		vertical-align: text-bottom;
	}
</style>
