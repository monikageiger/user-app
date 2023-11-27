

<template>
    <div>
        <div @click="this.fetchUsers()">refetch</div>
        <div
            style="border: 1px solid white"
            v-for="(user, idx) in users"
            :key="idx"
            @click="deleteUser(user)"
        >
            <p>{{ user.name.first }}</p>
            <p>{{ user.name.last }}</p>
            <p>{{ user.picture.medium }}</p>
        </div>
        <button @click="addUser()" data-test="submit-button">add user</button>
    </div>
</template>

<script>
import store from '../../store'

export default {
    data() {
        return {
            users: null,
        }
    },
    methods: {
        async addUser() {
            await store.dispatch('addUser')
            this.users = store.getters.getUsers
        },
        async fetchUsers() {
            await store.dispatch('getUsers')
            this.users = store.getters.getUsers
        },
        async deleteUser(user) {
            store.commit('DELETE_USER', { id: user.id.value })
            this.users = store.getters.getUsers
        },
    },
    async mounted() {
        await this.fetchUsers()
    },
}
</script>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
