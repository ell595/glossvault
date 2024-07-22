<template>
    <div id="collectionCard">
        <h4>{{ collection.name }}</h4>
        <p>No. of glosses: {{ collection.glosses.length }}</p>
        <button><a :href="`/collections/${collection.id}`">View</a></button>
        <button @click="deleteCollection">Delete</button>
    </div>
</template>

<script>
export default {
    methods: {
        async deleteCollection() {
            try {
                // Get id from prop & token from localStorage then create body object
                const collection_id = this.collection.id;
                const token = localStorage.token;
                const body = {collection_id, token};

                // Send DELETE request to API attching body
                const response = await fetch(import.meta.env.VITE_API_URL + "/api/deletecollection", {
                    method: "DELETE",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });

                if (response.status === 200) {
                    // Emit 'delete' to refresh UI
                    this.$emit('delete');
                }
            } catch ( err) {
                console.error(err.message)
            }
        }
    },
    props: {
        collection: Object,
    }
}
</script>

<style>
#collectionCard {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 0.5em;
    padding: 8px;
    box-shadow: 6px 6px 12px #bfbab5;
}

#collectionCard a {
    text-decoration: none;
    color: #fef8f1
}

#collectionCard h4 {
    font-family: 'Bebas Neue', sans-serif;
    text-align: center;
    color: #891071;
    font-size: 3rem;
    font-weight: 500;
    letter-spacing: 1px;
    margin: 5px;
}

#collectionCard button {
    width: 90%;
    height: 50px;
    cursor: pointer;
    background-color: #f83a66;
    border: none;
    border-radius: 5px;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
    background: #f83a66;
    margin: 5px;
}

#collectionCard p {
    margin-bottom: 5px;
}

@media only screen and (max-width: 600px) {
#collectionCard {
    width: 100%;
}

#collectionCard p {
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-size: 1.4em;
}

#collectionCard h4 {
    font-size: 4rem;
}
}
</style>