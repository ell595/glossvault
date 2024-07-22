<template>
    <div id="glossCard">
        <img :src="'https://glossvault.s3.eu-north-1.amazonaws.com/' + gloss.image_path"></img>
        <p>Name: <span>{{ gloss.name }}</span></p>
        <p>Colour: <span>{{ gloss.colour }}</span></p>
        <p>Brand: <span>{{ gloss.brand }}</span></p>
        <a :href="'https://www.amazon.co.uk/s?k=' + gloss.name + ' ' + gloss.brand + ' lip+gloss&i=beauty&camp=1634&creative=6738&linkId=8cac87ef773c8da26d49e3d2582e0d16'" target=”_blank”>Search on Amazon</a>
        <button @click="deleteGloss">Delete</button>
    </div>
</template>

<script>
export default {
    methods: {
        async deleteGloss() {
            try {
                // id from Gloss prop & token from localStorage, create body object
                const gloss_id = this.gloss.id;
                const token = localStorage.token;
                const body = {gloss_id, token};

                // Send DELETE request to API attaching body
                const response = await fetch(import.meta.env.VITE_API_URL + "/api/deletegloss", {
                    method: "DELETE",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });

                if (response.status === 200) {
                    // Emit 'delete' to refresh ui
                    this.$emit('delete');
                }
            } catch ( err) {
                console.error(err.message)
            }
        }
    },
    props: {
        gloss: Object,
    },
    mounted() {
        const awsURL = "https://glossvault.s3.eu-north-1.amazonaws.com/";
        const path = this.gloss.image_path
        const url = awsURL + path
    }
}
</script>

<style>
#glossCard {
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 23%;
    background-color: white;
    border-radius: 0.5em;
    padding: 12px;
    box-shadow: 6px 6px 12px #bfbab5;
}

p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    width: 100%;
}

p span {
    font-family: 'Bebas Neue', sans-serif;
    text-align: right;
    color: #891071;
    font-size: 2.5rem;
    font-weight: 500;
    margin: 5px;
}

#glossCard img {
    height: 50%;
    width: 50%;
    margin-bottom: 10px;
}

#glossCard a {
    text-decoration: none;
    color: #550250;
    margin: 10px;
    text-align: center;
}

button {
    background: #ff4376;
    color: #fef8f1;
    padding: 10px;
    width: 70%;
    border-radius: 0.5em;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.2em;
    text-align: center;
}

button:hover {
    background-color: #e92063;
}

@media only screen and (max-width: 600px) {
#glossCard {
    width: 90%;
}

#glossCard p {
    font-size: 2rem;
    justify-content: space-around;
}
}
</style>