<script>
import { ref, computed } from 'vue';

export default {
    name: "registerForm",
    emits: ['update'],
    data() {
        return {
            startValidation: ref(false),
            inputtedUsername: ref(''),
            inputtedEmail: ref(''),
            inputtedPassword: ref(''),
            confirmPassword: ref(''),

            // Custom validation checks
            isValidEmail: computed(() => {
                return this.startValidation ? /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.inputtedEmail) : false;
            }),
            isStrongPassword: computed(() => {
                return this.startValidation ? /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(this.inputtedPassword) : false;
            }),
            isPasswordConfirmed: computed(() => {
                return this.startValidation ? this.inputtedPassword === this.confirmPassword : false;
            }),
            userID: null
        };
    },
    methods: {
        clearValidation(event) {
            event.target.setCustomValidity('');
            event.target.reportValidity();
        },
        async registerUser() {
            this.startValidation = true;

            // Validate inputs
            var emailInput = document.getElementById('email');
            if (!this.isValidEmail) {
                emailInput.setCustomValidity('Please enter a valid email address');
                emailInput.reportValidity();
            } else {
                emailInput.setCustomValidity('');
                emailInput.reportValidity();
            }

            var passwordInput = document.getElementById('password');
            if (!this.isStrongPassword) {
                passwordInput.setCustomValidity('Password must contain at least 8 characters, a capital letter and a special character');
                passwordInput.reportValidity();
            } else {
                passwordInput.setCustomValidity('');
                passwordInput.reportValidity();
            }

            var confirmPasswordInput = document.getElementById('confirmPassword');
            if (!this.isPasswordConfirmed) {
                confirmPasswordInput.setCustomValidity('Please ensure passwords match');
                confirmPasswordInput.reportValidity();
            } else {
                confirmPasswordInput.setCustomValidity('');
                confirmPasswordInput.reportValidity();
            }

            if (this.isPasswordConfirmed && this.isStrongPassword && this.isValidEmail) {
                try {
                    // Get inputs from form & create body object
                    const username = this.inputtedUsername;
                    const email = this.inputtedEmail;
                    const password = this.inputtedPassword;
                    const body = {username, email, password};

                    // Send POST request to API attaching body
                    const response = await fetch(import.meta.env.VITE_API_URL + "/api/register", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(body)
                    });

                    // Await response
                    const parseRes = await response.json();

                    if (response.status === 201) {
                        // Store API token in localStorage & redirect to dashboard
                        localStorage.setItem("token", parseRes.token);
                        this.$router.push({ path: 'dashboard' })
                    }
                } catch ( err) {
                    console.error(err.message)
                }
            }
        },
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
      <form @submit.prevent="registerUser()">
          <label for="username">Username</label>
          <input name="username" required v-model="inputtedUsername">
          <label for="email">Email</label>
          <input id="email" name="email" type="email" required v-model="inputtedEmail" v-on:input="clearValidation($event)">
          <label for="password">Password</label>
          <input id="password" name="password" type="password" required v-model="inputtedPassword" v-on:input="clearValidation($event)">
          <label for="confirmPassword">Confirm Password</label>
          <input id="confirmPassword" name="confirmPassword" type="password" required v-model="confirmPassword" v-on:input="clearValidation($event)">
          <div>
            <a href="/login">Or log in to your account</a>
            <Button @click="registerUser()">Register</Button>
          </div>
      </form>
    </div>
  </div>
</template>