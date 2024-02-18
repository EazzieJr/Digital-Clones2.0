<template>
	<nav class="bg-[#19213D] bg-opacity-0">
		<div class="NavContainer items-center" :class="innerPage ? 'grid grid-cols-12' : 'between'">
			<div class="Logo h-fit" :class="innerPage ? 'col-span-3' : ''">
				<nuxt-link to="/">LOGO</nuxt-link>
			</div>

			<div v-if="innerPage" class="TabSwitch mx-auto col-span-6 border border-[#CDD4F033] border-opacity-20">
				<button class="Tab" :class="{ 'active': mode == 'text' }" @click="setMode('text')">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M7 8.5H12M7 12H15M7 18V20.3355C7 20.8684 7 21.1348 7.10923 21.2716C7.20422 21.3906 7.34827 21.4599 7.50054 21.4597C7.67563 21.4595 7.88367 21.2931 8.29976 20.9602L10.6852 19.0518C11.1725 18.662 11.4162 18.4671 11.6875 18.3285C11.9282 18.2055 12.1844 18.1156 12.4492 18.0613C12.7477 18 13.0597 18 13.6837 18H16.2C17.8802 18 18.7202 18 19.362 17.673C19.9265 17.3854 20.3854 16.9265 20.673 16.362C21 15.7202 21 14.8802 21 13.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V14C3 14.93 3 15.395 3.10222 15.7765C3.37962 16.8117 4.18827 17.6204 5.22354 17.8978C5.60504 18 6.07003 18 7 18Z"
							stroke="#CDD4F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>

					<span>
						Text
					</span>
				</button>

				<button class="Tab" :class="{ 'active': mode == 'talk' }" @click="setMode('talk')">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M19 10V12C19 15.866 15.866 19 12 19M5 10V12C5 15.866 8.13401 19 12 19M12 19V22M8 22H16M12 15C10.3431 15 9 13.6569 9 12V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V12C15 13.6569 13.6569 15 12 15Z"
							stroke="#CDD4F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>

					<span>
						Talk
					</span>
				</button>
			</div>

			<div class="end relative" :class="innerPage ? 'col-span-3' : ''">
				<button
					class="Signin rounded-xl py-2.5 px-4 w-fit text-sm font-medium border border-[#CDD4F033] border-opacity-20 text-[#CDD4F0] duration-500 hover:bg-[#CDD4F033] bg-opacity-20"
					@click="toggleSignInModal" v-if="!user.signedIn">
					Sign in
				</button>

				<button class="center w-10 h-10 overflow-hidden rounded-full"
					:class="{ 'bg-[#9D67BA]': user.data.initial || !user.data.photoURL }" @click="popup = !popup"
					v-if="user.data.initial || user.data.photoURL">
					<img :src="user.data.photoURL" v-if="user.signedIn && user.data.photoURL" />

					<span class="text-center font-semibold block text-[#CDD4F0] capitalize"
						v-if="user.data.initial && !user.data.photoURL">
						{{ user.data.initial }}
					</span>
					<!-- <span class="rounded-full text-center font-semibold w-10 h-10 block bg-[#9D67BA] text-[#CDD4F0]" >
						G
					</span> -->
				</button>

				<div class="Popup absolute right-0 top-12 bg-[#19213D] rounded-lg p-3 space-y-2" v-if="popup">
					<span class="text-xs text-[#CDD4F0] font-medium px-2 block w-full leading-[150%]">
						Signed in as {{ user.data.email }}
					</span>

					<button
						class="Logout text-xs font-medium text-[#CDD4F0] p-2 rounded-md hover:bg-red-200 hover:text-red-600 w-full text-left"
						@click="signOut">
						Log out
					</button>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
import { mapState } from 'pinia'
import { getAuth, signOut } from "firebase/auth";
import { useStore } from '~/store'
import { initializeApp } from "firebase/app";
// import { useToast } from 'vue-toastification'
// import { useToast } from "vue-toastification/composition/nuxt"
// import { getAnalytics } from ""

export default {
	data() {
		return {
			popup: false,
			store: useStore(),
			// toast: useToast()
		}
	},

	computed: {
		...mapState(useStore, ['mode', 'innerPage', 'user'])
	},

	watch: {
		$route: "toggleInnerPage",
		user(newVal, oldVal) {
			console.log("val:", newVal, oldVal)
		}
	},

	methods: {
		// ...mapMutations(['setMode', 'toggleInnerPage', 'toggleSignInModal', 'userSignedIn', 'setUserData']),
		toggleInnerPage() {
			console.log(this.store.$state)
			
			this.store.$patch({
				innerPage: true
			})
		},

		toggleSignInModal() {
			this.store.$patch({
				showSignInModal: !this.store.$state.showSignInModal
			})
		},

		setMode(mode) {
			this.store.$patch({
				mode
			})
		},

		checkUserAuth() {
			const storedUser = localStorage.getItem("user");

			if (storedUser !== null && storedUser !== undefined) {
				console.log("Previously logged:", storedUser)
				// Parse the stored user information
				const parsedUser = JSON.parse(storedUser);


				this.store.$patch({
					user: parsedUser
				})

				console.log(this.store.$state.user.data)
				
				// this.user = {
				// 	signedIn: true,
				// 	data: parsedUser
				// }
				// Use the user information as needed
				console.log(parsedUser);
			}
		},

		async signOut() {
			const auth = getAuth();
			this.popup = false

			signOut(auth).then(() => {
				// Sign-out successful.
				this.store.$reset()
				// this.toast.success("Signed out successfully")

				localStorage.removeItem("user");
			}).catch((error) => {
				// An error happened.
				console.error("Sign-out error:", error.code, error.message);
			});
		},

		togglePopup() {
			this.popup = false
			console.log('togglePopup')
		}
	},

	mounted() {
		this.checkUserAuth()
		// console.log(useToast)
		// this.initFirebase()
	}
}
</script>

<style lang="css">
nav {
	position: sticky;
	top: 0px;
	padding: 20px 0px;
	backdrop-filter: blur(4px);
	z-index: 100;
}

nav .NavContainer {
	padding: 0px 20px;
}

nav .NavContainer .Logo a {
	color: #CDD4F0;
	font-size: 24px;
	font-weight: 600;
}

nav .NavContainer .TabSwitch {
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 16px;
	/* background-color: #ececec; */
	padding: 4px;
	width: fit-content;
}

nav .NavContainer .TabSwitch .Tab {
	padding: 6px;
	font-size: 14px;
	font-weight: 500;
	color: #CDD4F0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 60px;

	@media (min-width: 768px) {
		width: 120px;
	}
}

nav .NavContainer .TabSwitch .Tab svg {
	width: 20px;

	@media (min-width: 768px) {
		width: auto;
	}
}

nav .NavContainer .TabSwitch .Tab span {
	display: none;

	@media (min-width: 768px) {
		display: block;
		margin-left: 8px;
	}
}

nav .NavContainer .TabSwitch .Tab.active {
	color: #CDD4F0;
	font-weight: 600;
	background-color: rgba(205, 212, 240, 0.20);
	border-radius: 12px;
	-webkit-border-radius: 12px;
	-moz-border-radius: 12px;
	-ms-border-radius: 12px;
	-o-border-radius: 12px;
}
</style>