<template>
    <div v-if="isLoading" class="loading">Loading</div>
    <div id="grid">
        <div id="header">
            <h4>Collection Name:</h4>
            <h2>{{ collection.name }}</h2>
        </div>
            <div id="addGloss">
                <div id="inputs">
                    <input id="glossName" type="text" placeholder="Gloss Name" />
                    <input id="glossColour" type="text" placeholder="Gloss Colour" />
                    <input id="glossBrand" type="text" placeholder="Gloss Brand" />
                </div>
                <div id="buttons">
                    <label for="image" class="button">Upload an Image
                        <input type="file" accept="image/*;capture=camera" name="image" id="image" style="display:none;">
                    </label>
                    <div class="button" @click="addGloss">Add Gloss</div>
                </div>
        </div>

        <div id="glosses">
            <GlossCard v-for="(gloss, id) in collection.glosses" :key="id" :gloss="gloss" @delete="getCollection" />
        </div>
    </div>
</template>

<script>
import GlossCard from './GlossCard.vue';

export default {
    name: 'CollectionPage',
    data() {
        return {
            isLoading: true,
            collection: null
        }
    },
    methods: {
        async getCollection() {
            this.isLoading = true;
            // Get collectionId from route params
            const collectionId = this.$route.params.id;
            try {
                // Create body object with token & collectionId
                const token = localStorage.token;
                const body = {token, collectionId};

                // Send POST request to API attaching body
                const response = await fetch(import.meta.env.VITE_API_URL + "/api/getcollection", {
                method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });

                // Await response 
                const parseRes = await response.json();

                if (response.status === 200) {
                    // Set collection from parsed response
                    this.collection = parseRes[0][0];
                    // Reset Loading state
                    this.isLoading = false;
                }
            } catch (err) {
                console.error(err.message);
            }
        },
        async addGloss() {
            this.isLoading = true;
            // Create "body" formData and append inputs
            let body = new FormData();
            body.append('image', document.getElementById('image').files[0]);
            body.append('name', document.getElementById('glossName').value);
            body.append('colour', document.getElementById('glossColour').value);
            body.append('brand', document.getElementById('glossBrand').value);
            body.append('token', localStorage.token);
            body.append('collection_id', this.$route.params.id);

            try {
                // Send POST request to API attaching body
                const response = await fetch(import.meta.env.VITE_API_URL + "/api/newgloss", {
                    method: "POST",
                    body: body
                });

                if (response.status === 201) {
                    // Call getColletion function to refresh ui
                    this.getCollection();
                    // Reset form
                    document.getElementById('image').value = "";
                    document.getElementById('glossName').value = "";
                    document.getElementById('glossColour').value = "";
                    document.getElementById('glossBrand').value = "";
                    // Reset Loading state
                    this.isLoading = false;
                }
            } catch (err) {
                console.error(err.message);
            }
        }
    },
    components: {
        GlossCard
    },
    mounted() {
        this.getCollection();
    }
}
</script>

<style>
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
  content: "\2026"; /* ascii code for the ellipsis character */
  width: 0px;
}

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
}

#header {
    grid-area: header;
    justify-self: center;
    text-align: center;
}

#header h2 {
    font-size: 5em;
    margin-top: 0;
    color: #f83a66;
}

#header h4 {
    margin-bottom: 0;
    font-family: 'Nunito', sans-serif;
}

#addGloss {
    display: flex;
    justify-content: space-around;
    align-items: center;
    grid-area: form;
    background-color: #fef8f1;
    box-shadow: 6px 6px 12px #bfbab5;
    border-radius: 0.5em;
    padding: 15px 15px 15px 15px;
    margin:  20px auto 0 auto;
    width: 100%;
    max-width: 600px;
}

#addGloss input {
    margin: 5px;
    border-radius: 0.3em;
    border: 2px solid #ff4376;
    text-align: center;
    padding: 5px;
}

#addGloss #inputs {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between
}

#addGloss #buttons {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

#addGloss .button {
    background: #ff4376;
    color: #fef8f1;
    padding: 10px;
    width: 70%;
    border-radius: 0.5em;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.2em;
    text-align: center;
    cursor: pointer;
}

#addGloss .button:hover {
    background-color: #e92063;
}

#glosses {
    margin-top: 50px;
    margin-bottom: 50px;
    grid-area: content;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-left: 1%;
    gap: 30px 10%;
}

@media only screen and (max-width: 600px) {
    #addGloss {
        width: 100%;
    }

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
}

</style>