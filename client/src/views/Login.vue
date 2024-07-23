<script>
import { ref } from 'vue';

export default {
    name: 'loginForm',
    emits: ['update'],
    data() {
        return {
            inputtedEmail: ref(''),
            inputtedPassword: ref(''),
            username: null,
            errors: [],
        }
    },
    methods: {
        async loginUser() {
            // Reset errors
            this.errors = [];
                // Get Email & Password from form & create body object
                const email = this.inputtedEmail;
                const password = this.inputtedPassword;
                const body = {email, password};

                // Send POST request to API attaching body
                const response = await fetch(import.meta.env.VITE_API_URL + "/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(body)
                })
                .then((res) => {
                    if (res.status === 200) {
                        // Store API token in localStorage & redirect to Dashboard
                        const parseRes = res.json();
                        console.log(parseRes);
                        localStorage.setItem("token", parseRes.token);
                        this.$router.push({ path: 'dashboard' });
                    } else {
                        this.errors.push(res.message);
                    }
                })
                .catch((err) => {
                    //this.errors.push(err.data.message);
                    console.log('Error', err.response);
                    console.log('fetch catch');
                    console.error(err.message);
                });
        }
    }
}

</script>

<template>
    <div class="background">
    <div class="header">
      <h3>Welcome to</h3>
      <h1>GlossVault</h1>
    </div>
    <div class="welcome">
        <form @submit.prevent="loginUser">
            <label for="email">Email</label>
            <input name="email" type="email" required v-model="inputtedEmail">
            <label for="password">Password</label>
            <input name="password" type="password" required v-model="inputtedPassword">
            <div>
                <a href="/register">Or create an account</a>
                <button type="submit">Login</button>
            </div>
            <p id="error" :v-for="error in errors">{{error}}</p>
        </form>
    </div>
  </div>
</template>