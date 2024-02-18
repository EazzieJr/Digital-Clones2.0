<script>
import { GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { mapState } from 'pinia'
import { useStore } from '~/store'
import { getAnalytics } from "firebase/analytics";
import '@unocss/reset/tailwind.css'

export default {
  data() {
    return {
      email: '',
      password: '',
      tempUserData: null,
      auth: 'Sign in',
      store: useStore(),
    }
  },

  watch: {
    tempUserData(newVal, oldVal) {
      const { email, photoURL } = newVal

      this.setUserData({
        email, photoURL
      })
    }
  },

  computed: {
    ...mapState(useStore, ['showSignInModal'])
  },
  
  methods: {
    initFirebase() {
      // Import the functions you need from the SDKs you need

      // TODO: Add SDKs for Firebase products that you want to use
      // https://firebase.google.com/docs/web/setup#available-libraries

      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      const firebaseConfig = {
        apiKey: "AIzaSyCjYc7mXO5H9ubVrRBzFZ1aODeu2dfbOgQ",
        authDomain: "digital-clones.firebaseapp.com",
        projectId: "digital-clones",
        storageBucket: "digital-clones.appspot.com",
        messagingSenderId: "116349228769",
        appId: "1:116349228769:web:e9c0820b696c63e67149a0",
        measurementId: "G-0DSD8YVMF5"
      };

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
    },

    checkUserAuth() {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        // Parse the stored user information
        const parsedUser = JSON.parse(storedUser);

        this.user = {
          signedIn: true,
          data: parsedUser
        }
        // Use the user information as needed
        console.log(parsedUser);
      }
    },

    async signInWithGoogle() {
      try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        const result = await signInWithPopup(auth, provider);
        const userData = result.user;

        console.log(userData)

        const { email, photoURL } = userData


        // this.$toast.success("User successfully signed in!")
        // this.tempUserData = userData;
        this.store.$patch({
          user: {
            signedIn: true,
            data: {
              email, photoURL
            }
          },

          showSignInModal: false,
        })

        localStorage.setItem("user", JSON.stringify(this.store.user));
        // this.toggleSignInModal(false);
      } catch (error) {
        // Handle the error
        // this.$toast.error(error.message)
        console.error("Authentication error:", error.code, error.message);

        // You may want to update your UI or show an error message to the user
        // For example, you can set this.user.signedIn to false and display an error message
        // this.user.signedIn = false;
        this.errorMessage = error.message; // Assuming you have a variable to store the error message
      }
    },

    async signInWithFacebook() {
      try {
        const auth = getAuth();
        const provider = new FacebookAuthProvider();

        // Open a popup to initiate the Facebook sign-in
        const result = await signInWithPopup(auth, provider);

        // The signed-in user information
        const user = result.user;

        // Perform actions after successful sign-up
        // For example, update UI, store user data, etc.

        console.log("Signed in with Facebook:", user.displayName);
      } catch (error) {
        // Handle errors during Facebook sign-in
        console.error("Facebook Authentication Error:", error.code, error.message);

        // You may want to update your UI or show an error message to the user
        // For example, you can set some state or display an error message
        // this.errorMessage = error.message;
      }
    },

    async signInWithTwitter() {
      try {
        const auth = getAuth();
        const provider = new TwitterAuthProvider();

        // Open a popup to initiate the Facebook sign-in
        const result = await signInWithPopup(auth, provider);

        // The signed-in user information
        const user = result.user;

        console.log(user)
        // Perform actions after successful sign-up
        // For example, update UI, store user data, etc.

        console.log("Signed in with Twitter:", user.displayName);
      } catch (error) {
        // Handle errors during Facebook sign-in
        console.error("Facebook Authentication Error:", error.code, error.message);

        // You may want to update your UI or show an error message to the user
        // For example, you can set some state or display an error message
        // this.errorMessage = error.message;
      }
    },

    async signUpWithEmail() {
      try {
        const auth = getAuth();
        const result = await createUserWithEmailAndPassword(auth, this.email, this.password);

        // The signed-in user information
        const user = result.user;

        // this.$toast.success("User successfully signed up!")
        this.auth = 'Sign in'

        console.log(user)

        // Perform actions after successful sign-up
        // For example, update UI, store user data, etc.

      } catch (error) {
        // Handle errors during Facebook sign-in
        this.$toast.error(error.message)
        console.error(error.code, error.message);

        // You may want to update your UI or show an error message to the user
        // For example, you can set some state or display an error message
        // this.errorMessage = error.message;
      }
    },

    async signInWithEmail() {
      try {
        const auth = getAuth();
        // const provider = new createUserWithEmailAndPassword();

        // Open a popup to initiate the Facebook sign-in
        const result = await signInWithEmailAndPassword(auth, this.email, this.password);

        // The signed-in user information
        const user = result.user;

        this.store.$patch({
          user: {
            signedIn: true,
            data: {
              email: this.email,
              initial: this.email.split('')[0],
            }
          },

          showSignInModal: false,
        })

        this.$toast.success("User successfully signed in!")
        // this.store.$patch({
        //   showSignInModal: false,
        //   user
        // });
        // this.toggleSignInModal(false);
        localStorage.setItem("user", JSON.stringify(this.user));

        console.log(this.user)
        // Perform actions after successful sign-up
        // For example, update UI, store user data, etc.

      } catch (error) {
        // Handle errors during Facebook sign-in
        // this.$toast.error(error.code && "User not found, Sign up?")
        console.error(error.code, error.message);

        // You may want to update your UI or show an error message to the user
        // For example, you can set some state or display an error message
        // this.errorMessage = error.message;
      }
    },

    async signOut() {
      const auth = getAuth();
      this.popup = false

      signOut(auth).then(() => {
        // Sign-out successful.
        this.setUser({
          signedIn: false,
          data: {}
        })
        localStorage.removeItem("user");
      }).catch((error) => {
        // An error happened.
        console.error("Sign-out error:", error.code, error.message);
      });
    },
  },

  mounted() {
    this.initFirebase()
    this.checkUserAuth()
  }
}
// useHead({
//   htmlAttrs: {
//     lang: 'en',
//   },
//   charset: 'utf-8',
//   title: 'Nuxt Movies',
//   titleTemplate: title => title !== 'Nuxt Movies' ? `${title} · Nuxt Movies` : title,
//   meta: [
//     { name: 'description', content: 'A TMDB client built with Nuxt Image to show the potential of it ✨' },
//     { property: 'og:image', content: 'https://movies.nuxt.space/social-card.png' },
//     { name: 'twitter:card', content: 'summary_large_image' },
//     { name: 'twitter:site', content: '@nuxt_js' },
//     { name: 'twitter:creator', content: '@nuxt_js' },
//   ],
//   link: [
//     {
//       rel: 'icon',
//       type: 'image/webp',
//       href: '/movies.webp',
//     },
//   ],
// })
</script>

<template>
  <NuxtLoadingIndicator />

  <Navigation />
  
  <div h-full w-full font-sans of-hidden view-transition-app transition duration-0>
    <div id="app-scroller" of-x-hidden of-y-auto relative>
      <NuxtPage />
    </div>
  </div>
</template>

<style lang="postcss">
html,
body,
#__nuxt {
  margin: 0;
  padding: 0;
  background: #111;
  color: white;
  color-scheme: dark;
}

.Modal {
  @apply fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-10 px-5 md:px-0;
  backdrop-filter: blur(20px);

  .Popup {
    @apply bg-[#111] rounded-xl p-8 pb-10 w-full md:w-[400px] mx-auto;

    h2 {
      @apply text-white font-medium text-2xl text-center block;
    }

    form {
      @apply space-y-8 mt-8 w-full;

      .Inputs {
        @apply space-y-5 w-full;

        .Input {
          @apply space-y-1.5 w-full;

          span {
            @apply text-white font-medium text-sm block;
          }

          input {
            @apply w-full rounded-lg bg-[#111] border border-[#CDD4F0] border-opacity-20 text-[#CDD4F0] text-sm font-medium px-4 py-2.5;
          }
        }
      }

      .Submit {
        @apply w-full rounded-lg bg-[#CDD4F0] text-[#19213D] text-sm font-semibold px-4 py-2.5;
      }
    }

    .OtherSignInOptions {
      @apply space-y-3 mt-8 w-full;

      > button {
        @apply w-full md:w-4/5 rounded-lg bg-[#19213D] border border-[#CDD4F0] border-opacity-20 text-[#CDD4F0] text-sm font-medium px-4 py-2.5 flex items-center space-x-2 hover:bg-[#CDD4F033] bg-opacity-20 mx-auto;

        img {
          @apply w-5 h-5;
        }
      }

      div {
        @apply text-center text-[#CDD4F0] text-sm;

        button {
          @apply text-[#9D67BA]
        }
      }
    }
  }
}
</style>
