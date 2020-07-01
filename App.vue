<script>
	import userlist from './commen/tim/user'
	export default {
		mounted() {
			/**官网有很多关于关于sdk 其他的监听方法（比如：有新的消息，用户资料更新等等）
			 * 详情可对照： https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html
			 * 监听的含义：服务端发生了数据变更---前端全局可以接收到变更通知--前端就可以自动触发某个事件来更新相应数据
			 * */
			// 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
			this.tim.on(this.$TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this);
			// 收到新消息
			this.tim.on(this.$TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage);
			// 会话列表更新
			this.tim.on(this.$TIM.EVENT.CONVERSATION_LIST_UPDATED, event => {
				this.$store.commit("updateConversationList", event.data);
			});
			// 注册 COS SDK 插件
			// this.tim.registerPlugin({'cos-wx-sdk': this.COS});
		},
		methods: {
			onReadyStateUpdate({name}) {
				const isSDKReady = name === this.$TIM.EVENT.SDK_READY ? true : false;
				//自动监听并更新 sdk 的ready 状态 （未登录是 notReady  登录后是ready）
				this.$store.commit("toggleIsSDKReady", isSDKReady);
                //sdk ready 后  肯定完成了登录操作    这里可以获取用户存储在im的基础信息/离线消息/黑名单列表
			},
			
			onReceiveMessage({data: messageList}) {
				// this.handleAt(messageList);
				this.$store.commit("pushCurrentMessageList", messageList);
			},
			//根据消息列表请求聊天对象的用户信息 并完成数据拼接
		
		},
		onLaunch: function() {
			console.log('App Launch')
			console.log(userlist)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}

	}
</script>

<style>
	/*每个页面公共css */
	@font-face {font-family: "iconfont";
	  src: url('//at.alicdn.com/t/font_1915959_b8ykr7g4c2.eot?t=1593582465065'); /* IE9 */
	  src: url('//at.alicdn.com/t/font_1915959_b8ykr7g4c2.eot?t=1593582465065#iefix') format('embedded-opentype'), /* IE6-IE8 */
	  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAANQAAsAAAAABxwAAAMEAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqCJIIEATYCJAMICwYABCAFhG0HMhssBhHVk9Nkf4BMbvUD0qAjGxNrGFuHHsLed4eH/xmDV84J0BSuggQAAAAACB74/dWf+57vzIKI2wHlTeu0dRuUADczgvEj/gbmIQAudz82PzYBt7aBAm4bhhhY4GOCZnbb3UzT+CxlR2gmKU1pNE0Ka93Izc75QO9TgbSA4gTSAosC/natpf32QzwU4kLCE1k0ueyO4/ne0ESnNOIP9bfL8ne+EpkOgEQYml84nHau2B1QbvfQexcDjL8GeN6jKNECySC3hrGbCBzCfggghUslFqvBGHIaMEwAcdrrA+Q5C41m+S2CUTM3jhQTwgoHlEcM8s+Ldy8gQKFHgKSKTfMMk9sVBkUf12BSBKz5VIC1CFSQCjSIda2mTCQ9qVQy8MSisa94gW//f8rc7R8PBEQKiHUCCFWZ98TC7FvNUgBo7r29HlpHBYHeDXaC30lHbW+NODBnR98tKWvrN7dc2pilUx69NxPg4sf4JewxxanjfoFej1MLC/dVLmAyQLSJtu/pORwfdXQ1/l368nI1n642E9rFTMP5F12Ehou/ntwR+JHdhenQrs9D6V/h+yRUnKUjsrPkr9nJ590oja9dvKL3ua7VuD1Png8NE/Af5Lg1h+d5zr/PqCWCwSYALosj1eZ/f4eKy6+346v/HBoAnzRGzu6ng3VXWoG/K4wnUmjtkAM8Sgy0FAqgqJfcdZ4kgYs0g7evY6V+rxIQLH4vpDOFpaCyxCI1bCroHNLAYEkHKUX+Ygcf7SIitoFkPQoInrZB4e4aVJ6ekBr2C+j8fQeDZwCDVBfIazrEB5jJxnQQOuPxhebkuQrJJSvih6Rv9oGzHE6aEofGjuVCqehvk0s8x4TwrisiChV7DraUw8i2PfTZu9JJChcRv14sqronFU6eA1mI6SB0xuMLzclzFa0u2dL7h6Rv9oFbygb0U+LQdI7lQqkHsi10e5XdyyPhXVdEFCr2HGwpKrKhx0O/vteVTlK4jHD59aJWSfUVFtYXO1+3BoAsAFk0ArtHvM3ZuPplAAA=') format('woff2'),
	  url('//at.alicdn.com/t/font_1915959_b8ykr7g4c2.woff?t=1593582465065') format('woff'),
	  url('//at.alicdn.com/t/font_1915959_b8ykr7g4c2.ttf?t=1593582465065') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
	  url('//at.alicdn.com/t/font_1915959_b8ykr7g4c2.svg?t=1593582465065#iconfont') format('svg'); /* iOS 4.1- */
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size:56upx;
	  font-style:normal;
	  color: #333;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.icon-zidingyi:before {
	  content: "\e6d3";
	}
</style>
