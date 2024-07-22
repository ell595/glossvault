<template>
      <nav>
        <a href="/dashboard">GlossVault</a>
        <a id="logout" @click="logout" :v-if="token && token !== undefined">Logout</a>
    </nav>
  <router-view />
</template>

<script>
  export default {
    data() {
        return {
            token: localStorage.token
        }
    },
    methods: {
      async logout() {
        try {
          // Create body object containg token
          const token = localStorage.token
          const body = {token}

          // Send POST request to API
          const response = await fetch(import.meta.env.VITE_API_URL + "/api/logout", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
          });

          // Await response
          const parseRes = await response.json();
          
          if (parseRes.status === true) {
            // Removing token from localStorgae is crucial for logging out the user
            localStorage.removeItem("token");
            // Redirect to 'home' page
            window.location.replace("/home");
          }
        } catch (err) {
          console.error(err.message);
        }
      }
    },
  }
</script>

<style>
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    background-color: #f83a66;
    color: #fef8f1;
    font-family: 'Bebas Neue', sans-serif;
}

nav a {
    font-size: 2em;
    font-weight: 700;
    letter-spacing: 2px;
    color: #fef0e6;
    text-decoration: none;
    cursor: pointer;
}

#logout {
  font-size: 1.2em;
  font-weight: 500;
  letter-spacing: 0;
}
</style>
