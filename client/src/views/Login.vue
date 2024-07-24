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
        }
    },
    methods: {
        async loginUser() {
            // Reset errors
            document.getElementById('error').innerHTML = "";
            try {
                // Get Email & Password from form & create body object
                const email = this.inputtedEmail;
                const password = this.inputtedPassword;
                const body = {email, password};
                console.log(body);

                // Send POST request to API attaching body
                const response = await fetch(import.meta.env.VITE_API_URL + "/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(body)
                });
                console.log(response);

                // Await response
                const parseRes = await response.json();
                console.log(parseRes);

                if (response.ok) {
                    // Store API token in localStorage & redirect to Dashboard
                    localStorage.setItem("token", parseRes.token);
                    this.$router.push({ path: 'dashboard' });
                } else {
                    if (parseRes.message) {
                        // Set error
                        document.getElementById('error').innerHTML = parseRes.message;
                    } else {
                        document.getElementById('error').innerHTML = 'An unexpected error occurred.';
                    }
                }
            } catch (err) {
                console.error('Network error:', err);
                this.errors.push('A network error occured. Please try again.');
            }
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
            <p id="error"></p>
        </form>
    </div>
  </div>
</template>