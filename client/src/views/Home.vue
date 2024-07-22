<template>
  <div class="background">
    <div class="header">
      <h3>Welcome to</h3>
      <h1>GlossVault</h1>
    </div>
    <div class="welcome">
      <p>GlossVault is your ultimate destination for organizing and managing your lip gloss collection with ease and style. 
        Say goodbye to the chaos of scattered glosses and hello to a beautifully curated inventory right at your fingertips.
      <br><br>
      </p>
      <p id="ready">Ready to take your lip gloss game to the next level? Register or log in now to embark on your GlossVault journey.</p>
      <div class="welcome-buttons">
        <button @click="$router.push('/register')">Register</button>
        <button @click="$router.push('/login')">Log In</button>
      </div>
    </div>
  </div>
</template>

<script>
import Register from './Register.vue';
import Login from './Login.vue';

export default {
  name: 'homePage',
  data() {
    return {
      tab: 'register',
      user: null
    }
  },
  components: {
    Register,
    Login
  },
  inheritAttrs: false,
}
</script>