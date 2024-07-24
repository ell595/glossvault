<template>
    <div v-if="isLoading" class="loading">Loading</div>
    <div id="grid">
        <div id="header">
            <h1>Dashboard</h1>
            <h3>Welcome, {{ username }}</h3>
        </div>

        <div id="addCollection">
            <p v-if="collections.length === 0">Add a collection to get started!</p>
            <div id="addCollectionForm">
                <input id="collectionName" type="text" placeholder="Name" />
                <button @click="addCollection">Add</button>
            </div>
        </div>

        <div v-if="isLoading">
            <div class="loader-container">
                <div class="bouncing-dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        </div>
        <div v-if="!isLoading" id="collections">
            <CollectionCard v-for="(collection, id) in collections" :key="id" :collection="collection" @delete="getCollections"/>
        </div>
    </div>
</template>

<script>
import CollectionCard from './CollectionCard.vue';

export default {
    name: 'dashBoard',
    beforeRouteEnter (to, from, next) {
        // Redirect user is no token present
        const token = localStorage.token
        if (!token) {
            next('/home');
        } else {
            next();
        }
    },
    data() {
        return {
            // Default Loading state is true to avoid reading null
            isLoading: true,
            username: null,
            collections: [],
        }
    },
    methods: {
        async addCollection() {
            // Set Loading state
            this.isLoading = true;

            try {
                // Store name & token in body object
                const name = document.getElementById('collectionName').value;
                const token = localStorage.token;
                const body = {name, token};
                
                // Send POST request to API attaching body
                const response = await fetch(import.meta.env.VITE_API_URL + "/api/newcollection", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });

                if (response.status === 201) {
                    // Call getCollections to update ui
                    this.getCollections();
                    // Reset input
                    document.getElementById('collectionName').value = "";
                    // Reset Loading state
                    this.isLoading = false;
                }
            } catch (err) {
                console.error(err.message)
            }
        },
        async getCollections() {
            // Set Loading State
            this.isLoading = true;
            try {
                // Store token in body object
                const token = localStorage.token;
                const body = {token};

                // Send POST request to API attaching body
                const response = await fetch(import.meta.env.VITE_API_URL + "/api/getcollections", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });

                // Await Response
                const parseRes = await response.json();

                if (response.status === 200) {
                    // Store collections & username from response
                    this.collections = parseRes[0];
                    this.username = parseRes[1][0].username;
                    // Reset Loading state
                    this.isLoading = false;
                }
            } catch (err) {
                console.err(err.message);
            }
        }
    },
    components: {
        CollectionCard
    },
    mounted() {
        this.getCollections();
    }
}
</script>

<style scoped>
.loader {
    position: absolute;
    top: 70px;
    z-index: 99;
  width: 100%;
  height: 20px;
  background: 
    linear-gradient(90deg,#0001 33%,#0005 50%,#0001 66%)
    #f2f2f2;
  background-size:300% 100%;
  animation: l1 1s infinite linear;
}
@keyframes l1 {
  0% {background-position: right}
}

/*
.loading {
    font-size: 20px;
    padding: 10px;
    position: fixed;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    color: #891071;
}

.loading:after {
  overflow: hidden;
  display: inline-block;
  vertical-align: bottom;
  -webkit-animation: ellipsis steps(4,end) 900ms infinite;      
  animation: ellipsis steps(4,end) 900ms infinite;
  content: "\2026";
  width: 0px;
}*/

@keyframes ellipsis {
  to {
    width: 1.25em;    
  }
}

@-webkit-keyframes ellipsis {
  to {
    width: 1.25em;    
  }
}

#grid {
    display: grid;
    grid-template-columns: 15% 70% 15%;
    grid-template-rows: auto;
    grid-template-areas:
        ". header ."
        ". form ."
        ". content ."
        "footer footer footer"
    ;
    margin-bottom: 20px;
}

#header {
    grid-area: header;
    justify-self: center;
    text-align: center;
    font-family: 'Bebas Neue', sans-serif;
}

#header h1 {
    font-size: 4em;
    font-weight: 300;
    letter-spacing: 10px;
    color: #891071;
}

#header h3 {
    color: #a60c6e;
    margin: 0;
}

#addCollection {
    grid-area: form;
    font-family: 'Nunito', sans-serif;
    background-color: #fef8f1;
    border-radius: 0.5em;
    padding: 15px 15px 15px 15px;
    width: 70%;
    margin: 5% auto 5% auto;
    box-shadow: 6px 6px 12px #bfbab5;
}

#addCollection input {
    color: #891071;
    padding: 5px;
    border: 2px solid #f83a66;
    border-radius: 0.3em;
    resize: horizontal;
}

#addCollection p {
    margin-bottom: 15px;
    text-align: center;
    display: block;
}

#addCollectionForm button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f83a66;
    box-shadow: 6px 6px 12px #bfbab5;
    color: #fef8f1;
    padding: 10px;
    width: 10rem;
    border-radius: 0.5em;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.2em;
    text-align: right;
}

#addCollectionForm button:hover {
    background-color: #e92063;
}

#addCollectionForm {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

#collections {
    grid-area: content;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-left: 1%;
    gap: 30px 25%;
}

#collectionCard {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 0.5em;
    padding: 8px;
    box-shadow: 6px 6px 12px #bfbab5;
}

@media only screen and (max-width: 600px) {
#grid {
    display: grid;
    grid-template-columns: 5% 90% 5%;
    grid-template-rows: auto;
    grid-template-areas:
        ". header ."
        ". form ."
        ". content ."
        "footer footer footer"
    ;
}

#addCollection {
    width: 100%;
    margin-bottom: 10%;
}
#glossCard {
    width: 90%;
}

#glossCard p {
    font-size: 2rem;
    justify-content: space-around;
}
}

@media only screen and (min-width: 1200px) {
#addCollection {
    width: 40%;
}

#header h3 {
    display: none;
}
}
</style>