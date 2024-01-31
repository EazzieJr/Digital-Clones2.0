// plugins/clickaway.js

import Vue from 'vue';

Vue.directive('clickaway', {
	bind(el, binding) {
		const onClick = (e) => {
			// Check if the clicked element is outside the bound element
			if (!(el.contains(e.target) || el === e.target)) {
				// Call the provided method when a click outside occurs
				binding.value();
			}
		};

		// Attach the click event listener
		document.addEventListener('click', onClick);

		// Store the event listener on the element to remove it later
		el._clickaway = onClick;
	},

	unbind(el) {
		// Remove the event listener when the element is unbound
		document.removeEventListener('click', el._clickaway);
		delete el._clickaway;
	},
});
