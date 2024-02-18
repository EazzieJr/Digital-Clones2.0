<template>
	<div class="Clone">
		<section class=""
			:class="mode == 'text' ? 'h-[calc(100dvh_-_86px_-_75px)]' : recording ? 'h-[calc(100dvh_-_86px_-_20px_-_94px)]' : 'h-[calc(100dvh_-_86px_-_20px_-_56px)]'">
			<div class="Avatar">
				<video src="/videos/placeholder.mp4" poster="/placeholder.webp" autoplay muted loop playsinline />
			</div>

			<div class="ChatBox" data-lenis-prevent>
				<div class="Container">
					<div class="Message left-msg">
						Hello, what can i do for you today?
					</div>

					<div v-for="(message, index) in messages" :key="index" :class="`Message ${message.side}-msg`">
						{{ message.text }}
					</div>

					<div class="Message !py-[18px] left-msg Typing start" v-if="typing">
						<div class="Circle"></div>
						<div class="Circle"></div>
						<div class="Circle"></div>
					</div>
					<!-- <div class="Message left-msg italic" v-if="typing">
						<span class="animate-pulse">
							Typing ...
						</span>
					</div> -->
				</div>
			</div>
		</section>

		<div class="ChatInput constraint">
			<form @submit.prevent="sendMessage" action="submit" v-if="mode == 'text'">
				<div class="Input">
					<input type="text" name="message" id="message" placeholder="Type a message..." v-model="message">

					<button>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M10.4995 13.5001L20.9995 3.00005M10.6271 13.8281L13.2552 20.5861C13.4867 21.1815 13.6025 21.4791 13.7693 21.566C13.9139 21.6414 14.0862 21.6415 14.2308 21.5663C14.3977 21.4796 14.5139 21.1821 14.7461 20.587L21.3364 3.69925C21.5461 3.16207 21.6509 2.89348 21.5935 2.72185C21.5437 2.5728 21.4268 2.45583 21.2777 2.40604C21.1061 2.34871 20.8375 2.45352 20.3003 2.66315L3.41258 9.25349C2.8175 9.48572 2.51997 9.60183 2.43326 9.76873C2.35809 9.91342 2.35819 10.0857 2.43353 10.2303C2.52043 10.3971 2.81811 10.5128 3.41345 10.7444L10.1715 13.3725C10.2923 13.4195 10.3527 13.443 10.4036 13.4793C10.4487 13.5114 10.4881 13.5509 10.5203 13.596C10.5566 13.6468 10.5801 13.7073 10.6271 13.8281Z"
								stroke="#CDD4F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</button>
				</div>
			</form>

			<div class="Record col-center" v-else>
				<div class="recording font-medium text-[#CDD4F0] mb-5 w-[72px]" v-if=recording>
					Listening<span class="dots"></span>
				</div>

				<button submit class="center" :class="{ 'active': recording }" @click="listen">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M19 10V12C19 15.866 15.866 19 12 19M5 10V12C5 15.866 8.13401 19 12 19M12 19V22M8 22H16M12 15C10.3431 15 9 13.6569 9 12V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V12C15 13.6569 13.6569 15 12 15Z"
							stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'pinia'
import { useStore } from '~/store'

export default {
	data() {
		return {
			recording: false,
			typing: false,
			messages: [],
			message: "",
			previousSrc: "",
			recognition: null
		}
	},

	computed: {
		...mapState(useStore, ['mode', 'innerPage'])
	},

	watch: {
		mode() {
			if (this.mode == 'text') {
				this.recording = false
			}
		}
	},

	methods: {
		listen() {
			this.recording = !this.recording

			if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
				this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
				this.recognition.lang = 'en-US';

				this.recognition.onstart = function () {
					console.log('Speech this.recognition service has started');
					// startButton.textContent = 'Listening...';
				};

				this.recognition.onresult = (event) => {
					const transcript = event.results[0][0].transcript;
					this.message = transcript
					this.sendMessage()
					console.log(transcript);
					// transcriptionOutput.textContent = transcript;
				};

				this.recognition.onend = () => {
					this.recording = !this.recording

					// startButton.textContent = 'Start Listening';
				};

				this.recognition.onerror = function (event) {
					console.error('Speech this.recognition error:', event.error);
					// startButton.textContent = 'Start Listening';
				};

				if (this.recognition && this.recognition.recognizing) {
					this.recognition.stop();
				} else {
					this.recognition.start();
				}

			} else {
				// Browser does not support SpeechRecognition
				console.error('Speech recognition not supported');
				startButton.disabled = true;
			}

			if (this.recording) {
				// const { $gsap: gsap, $Draggable: Draggable } = useNuxtApp();
				// setTimeout(() => {
				// 	const span = document.querySelector('.dots')

				// 	gsap.to(span, {
				// 		repeat: -1,
				// 		yoyo: true,
				// 		text: {
				// 			delimiter: '',
				// 			value: '....'
				// 		},
				// 		duration: 1
				// 	})
				// }, 1000)


			}
		},

		appendMessage(side, text) {
			const chatBox = document.querySelector('.ChatBox .Container')
			const rawHtml = `
				<div class="Message ${side}-msg">
					${text}
				</div>
			`

			// chatBox.insertAdjacentHTML("beforeend", rawHtml);
		},

		async sendMessage() {
			const video = document.querySelector('video')
			this.messages.push({ text: this.message, side: "right" })
			this.typing = true
			const temp = this.message
			this.message = ""

			try {
				console.log(this.message)
				const chatApi = `https://api.clonecraft.co/chat?msg=${temp}&cloneid=Emily`;
				// const coinsImage = await axios.get(imageApi).then((res) => { return res.data});
				const { data } = await this.$fetch(chatApi);
				this.typing = false
				this.messages.push({ text: data.answer, side: "left" })

				// scroll to bototm 
				const chatBox = document.querySelector('.ChatBox .Container')
				chatBox.scrollTop = chatBox.scrollHeight

				this.previousSrc = video.src
				video.src = data.id
				video.muted = false
				video.loop = false
				video.play()

				video.onended = () => {
					video.src = this.previousSrc
				}
				// console.log(data);
			} catch (error) {
				this.typing = false
				console.error('Error fetching data:', error);
			}
		}
	},

	mounted() {
		// this.toggleInnerPage()
	}
}
</script>

<style lang="css" scoped>
.Clone {
	/* height: 100svh; */
	overflow: hidden
}

/* Section */
section {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	/* height: calc(100dvh - 70px - 75px - 56px); */
	max-width: 700px;
	margin: auto;
	padding: 0px 20px;
}

section .Avatar video {
	margin-top: 10px;
	width: 240px;
	height: 240px;
	border-radius: 50%;

	@media (min-width: 1280px) {
		width: 360px;
		height: 360px;
	}

	@media (min-width: 1280px) {
		width: 400px;
		height: 400px;
	}
}

section .ChatBox {
	flex-grow: 1;
	width: 100%;
	margin-top: 20px;
	overflow-y: auto;
	height: 100%;
}

section .ChatBox .Container::-webkit-scrollbar {
	width: 4px;
}

section .ChatBox .Container::-webkit-scrollbar-thumb {
	background-color: #888;
	border-radius: 10px;
	opacity: 0.5
}

section .ChatBox .Container::-webkit-scrollbar-track {
	background-color: transparent;
	border-radius: 10px;
}

section .ChatBox .Container {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	height: 100%;
	overflow-y: auto;
	overscroll-behavior: contain;
	padding-bottom: 55px;
}

section .ChatBox .Container .Message {
	/* display: flex;
	justify-content: flex-start;
	align-items: center; */
	margin-bottom: 20px;
	padding: 10px;
	border-radius: 16px;
	max-width: 280px;
	font-size: 14px;
	font-weight: 500;
	line-height: 150% !important;
	word-wrap: break-word;
	color: #111;

	@media (min-width: 768px) {
		font-size: 14px;
		max-width: 360px;
	}

	@media (min-width: 1024px) {
		font-size: 16px;
	}
}

section .ChatBox .Container .Message.left-msg {
	align-self: flex-flex-start;
	width: fit-content;
	background-color: #CDD4F0;

	@media (min-width: 1024px) {
		margin-top: 24px;
	}
}

section .ChatBox .Container .Message.right-msg {
	align-self: flex-end;
	width: fit-content;
	background-color: rgba(205, 212, 240, 0.20);

	@media (min-width: 1024px) {
		margin-top: 24px;
	}
}

.Typing .Circle {
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: black;
	margin-right: 10px;
	flex-shrink: 0;
	animation-duration: 1s;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
	/* animation-direction: alternate; */
}

.Typing .Circle:last-child {
	margin-right: 0px;
}

@keyframes translateYAnimation {
	0% {
		transform: translateY(0);
		-webkit-transform: translateY(0);
		-moz-transform: translateY(0);
		-ms-transform: translateY(0);
		-o-transform: translateY(0);
	}

	25% {
		transform: translateY(-4px);
		-webkit-transform: translateY(-5px);
		-moz-transform: translateY(-5px);
		-ms-transform: translateY(-5px);
		-o-transform: translateY(-5px);
	}

	50% {
		transform: translateY(0px);
		-webkit-transform: translateY(0px);
		-moz-transform: translateY(0px);
		-ms-transform: translateY(0px);
		-o-transform: translateY(0px);
	}

	75% {
		transform: translateY(2px);
	}

	100% {
		transform: translateY(0px);
		-webkit-transform: translateY(0px);
		-moz-transform: translateY(0px);
		-ms-transform: translateY(0px);
		-o-transform: translateY(0px);
	}
}

/* Apply different delays to each element */
.Typing .Circle:nth-child(1) {
	animation-name: translateYAnimation;
	animation-delay: 0s;
}

.Typing .Circle:nth-child(2) {
	animation-name: translateYAnimation;
	animation-delay: 0.3s;
}

.Typing .Circle:nth-child(3) {
	animation-name: translateYAnimation;
	animation-delay: 0.6s;
}

/* Chat Input */
.ChatInput {
	position: fixed;
	bottom: 20px;
	left: 0px;
	right: 0px;
	max-width: 700px;
}

.ChatInput .Record {
	margin: auto;
	width: fit-content;
	position: relative;
}

.ChatInput .Record button {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: #CFCFCF;
	position: relative
}

/* .ChatInput .Record button.active::after {
	content: 'Listening';
	position: absolute;
	color: black;
	text-align: center;
	font-weight: 500;
	top: -50%;
	left: -10%;
	right: 0;
	animation: blink 2s ease infinite;
} */

/* @keyframes blink {
	0% {
		opacity: 1;
	}

	50% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
} */

.ChatInput .Record button.active::before {
	content: '';
	position: absolute;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: #CFCFCF;
	z-index: -1;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
	0% {
		opacity: 1;
		transform: scale(1);
		-webkit-transform: scale(1);
		-moz-transform: scale(1);
		-ms-transform: scale(1);
		-o-transform: scale(1);
	}

	100% {
		opacity: 0;
		transform: scale(2.0);
	}
}

.ChatInput form {
	overflow: hidden;
	backdrop-filter: blur(10px);
}

.ChatInput form .Input {
	border: 1px solid #CDD4F033;
	background-color: rgba(205, 212, 240, 0.20);
	border-radius: 16px;
	flex-grow: 1;
	overflow: hidden;
	padding-right: 16px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.ChatInput form .Input button {
	height: fit-content;
}

.ChatInput form .Input input {
	width: 100%;
	padding: 16px 10px 16px;
	font-size: 14px;
	color: #CDD4F0;
	background-color: transparent;
	font-weight: 500;
}

.ChatInput form .Input input::placeholder {
	font-weight: 500;
}
</style>