import { defineStore } from 'pinia'

export const useStore = defineStore({
	id: 'main',
	state: () => ({
		counter: 2,
		showSignInModal: true
	}),
	mutations: {
		toggleSignInModal() {
			this.showSignInModal = !this.showSignInModal
		}
	},
	getters: {
		// Define your store getters here
	},
	actions: {
		// Define your store actions here
	},
})
